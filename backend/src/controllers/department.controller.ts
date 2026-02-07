import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { departments, subjects, type NewDepartment } from '../db/schema/app.js';
import { desc, eq, ilike, or, sql } from 'drizzle-orm';
import { z } from 'zod';

const updateDepartmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional()
});

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '10', search = '' } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const whereClause = search
      ? or(
          ilike(departments.name, `%${search}%`),
          ilike(departments.code, `%${search}%`)
        )
      : undefined;

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(departments)
      .where(whereClause);

    const count = total?.count ?? 0;

    const allDepartments = await db
      .select({
        id: departments.id,
        name: departments.name,
        code: departments.code,
        description: departments.description,
        createdAt: departments.createdAt,
        updatedAt: departments.updatedAt,
        subjects: sql<number>`CAST(COUNT(${subjects.id}) AS INTEGER)`
      })
      .from(departments)
      .leftJoin(subjects, eq(departments.id, subjects.departmentId))
      .where(whereClause)
      .groupBy(
        departments.id,
        departments.name,
        departments.code,
        departments.description,
        departments.createdAt,
        departments.updatedAt
      )
      .orderBy(desc(departments.createdAt))
      .limit(limitNum)
      .offset(offset);

    res.status(200).json({
      success: true,
      message: 'Departments fetched successfully',
      data: {
        data: allDepartments,
        count: Number(count)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error while fetching all departments'
    });
  }
};

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !code || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, code, and description are required'
      });
    }

    const newDepartment: NewDepartment = {
      name,
      code,
      description
    };

    const data = await db.insert(departments).values(newDepartment).returning();

    if (!data || data.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create department'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating department'
    });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db.query.departments.findFirst({
      where: (depts, { eq }) => eq(depts.id, Number(id)),
      with: {
        subjects: {
          with: {
            classes: {
              with: {
                teacher: true,
                subject: true,
                enrollments: {
                  with: {
                    student: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!data) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({
      success: true,
      message: 'Department fetched successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error while fetching department'
    });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = updateDepartmentSchema.safeParse(req.body);

    if (!result.success)
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });

    const { name, description } = result.data;

    if (!name && !description) {
      return res.status(400).json({
        success: false,
        message: 'Name or description is required for update'
      });
    }

    const data = await db
      .update(departments)
      .set({
        ...(name && { name }),
        ...(description && { description }),
        updatedAt: new Date()
      })
      .where(eq(departments.id, Number(id)))
      .returning();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: data[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating department'
    });
  }
};
