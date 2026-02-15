import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { NewSubject, subjects } from '../db/schema/app.js';
import { desc, eq, ilike, or, sql } from 'drizzle-orm';
import { z } from 'zod';

const updateSubjectSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .optional()
});

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '8', search = '' } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    const whereClause = search
      ? or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`)
        )
      : undefined;

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(subjects)
      .where(whereClause);

    const count = total?.count ?? 0;

    const allSubjects = await db.query.subjects.findMany({
      where: whereClause,
      with: {
        department: true
      },
      limit: limitNum,
      offset: offset,
      orderBy: desc(subjects.createdAt)
    });

    res.status(200).json({
      success: true,
      message: 'Subjects fetched successfully',
      data: {
        data: allSubjects,
        count: Number(count)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error while fetching all subjects'
    });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, code, description, departmentId } = req.body;

    if (!name || !code || !description || !departmentId) {
      return res.status(400).json({
        success: false,
        message: 'Name, code, and description are required'
      });
    }

    const newSubject: NewSubject = {
      name,
      code,
      description,
      departmentId
    };

    const data = await db.insert(subjects).values(newSubject).returning();

    if (!data) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create subject'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Subject created successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating subject'
    });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await db.query.subjects.findFirst({
      where: (subjects, { eq }) => eq(subjects.id, Number(id)),
      with: {
        department: true,
        classes: {
          with: {
            teacher: true,
            enrollments: {
              with: {
                student: true
              }
            }
          }
        }
      }
    });

    if (!data) return res.status(404).json({ message: 'Subject not found' });

    res.status(200).json({
      success: true,
      message: 'Subject fetched successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching subject'
    });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = updateSubjectSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed'
      });
    }

    const { name, description } = result.data;

    if (!name && !description) {
      return res.status(400).json({
        success: false,
        message: 'Name or description is required for update'
      });
    }

    const data = await db
      .update(subjects)
      .set({
        ...(name && { name }),
        ...(description && { description }),
        updatedAt: new Date()
      })
      .where(eq(subjects.id, Number(id)))
      .returning();

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subject updated successfully',
      data: data[0]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating subject'
    });
  }
};
