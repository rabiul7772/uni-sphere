import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import {
  classes,
  enrollments,
  subjects,
  users,
  departments
} from '../db/schema/app.js';
import { desc, eq, ilike, or, sql } from 'drizzle-orm';

export const getClasses = async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '8', search = '' } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;

    // Build where clause for search
    const whereClause = search
      ? or(
          ilike(classes.name, `%${search}%`),
          ilike(subjects.name, `%${search}%`),
          ilike(users.name, `%${search}%`)
        )
      : undefined;

    // Get total count with search filter
    const countQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(users, eq(classes.teacherId, users.id));

    if (whereClause) {
      countQuery.where(whereClause);
    }

    const [total] = await countQuery;
    const count = total?.count ?? 0;

    // Get paginated classes
    const query = db
      .select({
        id: classes.id,
        name: classes.name,
        bannerUrl: classes.bannerUrl,
        capacity: classes.capacity,
        status: classes.status,
        description: classes.description,
        createdAt: classes.createdAt,
        subject: {
          name: subjects.name,
          code: subjects.code
        },
        teacher: {
          name: users.name,
          avatarUrl: users.avatarUrl
        }
      })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(users, eq(classes.teacherId, users.id))
      .orderBy(desc(classes.createdAt))
      .limit(limitNum)
      .offset(offset);

    if (whereClause) {
      query.where(whereClause);
    }

    const allClasses = await query;

    res.status(200).json({
      success: true,
      data: {
        data: allClasses,
        count: Number(count)
      }
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching classes'
    });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const {
      subjectId,
      teacherId,
      name,
      bannerUrl,
      capacity,
      status,
      description
    } = req.body;

    if (!subjectId || !teacherId || !name || !capacity || !description) {
      return res.status(400).json({
        success: false,
        message:
          'subjectId, teacherId, name, capacity, and description are required'
      });
    }

    if (capacity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'capacity must be greater than 0'
      });
    }

    const [newClass] = await db
      .insert(classes)
      .values({
        subjectId,
        teacherId,
        name,
        bannerUrl,
        capacity,
        status,
        description
      })
      .returning();

    res.status(201).json({
      success: true,
      data: newClass
    });
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while creating class'
    });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Class ID is required'
      });
    }

    const classData = await db
      .select({
        id: classes.id,
        name: classes.name,
        bannerUrl: classes.bannerUrl,
        capacity: classes.capacity,
        status: classes.status,
        description: classes.description,
        createdAt: classes.createdAt,
        subject: {
          id: subjects.id,
          name: subjects.name,
          code: subjects.code,
          description: subjects.description
        },
        department: {
          id: departments.id,
          name: departments.name,
          description: departments.description
        },
        teacher: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        }
      })
      .from(classes)
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .leftJoin(users, eq(classes.teacherId, users.id))
      .where(eq(classes.id, Number(id)))
      .limit(1);

    if (classData.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Fetch enrolled students separately to avoid duplication in joins
    const enrolledStudents = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
        enrolledAt: enrollments.createdAt
      })
      .from(enrollments)
      .leftJoin(users, eq(enrollments.studentId, users.id))
      .where(eq(enrollments.classId, Number(id)));

    res.status(200).json({
      success: true,
      data: {
        ...classData[0],
        enrolledStudents
      }
    });
  } catch (error) {
    console.error('Error fetching class details:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching class details'
    });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { teacherId, name, bannerUrl, capacity, status, description } =
      req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Class ID is required'
      });
    }

    // Check if class exists
    const existingClass = await db
      .select()
      .from(classes)
      .where(eq(classes.id, Number(id)))
      .limit(1);

    if (existingClass.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Prepare update data
    const updateData: any = {};
    if (teacherId !== undefined) updateData.teacherId = teacherId;
    if (name !== undefined) updateData.name = name;
    if (bannerUrl !== undefined) updateData.bannerUrl = bannerUrl;
    if (capacity !== undefined) updateData.capacity = capacity;
    if (status !== undefined) updateData.status = status;
    if (description !== undefined) updateData.description = description;

    const [updatedClass] = await db
      .update(classes)
      .set(updateData)
      .where(eq(classes.id, Number(id)))
      .returning();

    res.status(200).json({
      success: true,
      data: updatedClass
    });
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while updating class'
    });
  }
};
