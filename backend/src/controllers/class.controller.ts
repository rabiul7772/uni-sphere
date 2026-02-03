import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { classes, subjects, users } from '../db/schema/app.js';
import { desc, eq } from 'drizzle-orm';

export const getClasses = async (req: Request, res: Response) => {
  try {
    const allClasses = await db
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
      .orderBy(desc(classes.createdAt));

    res.status(200).json({
      success: true,
      data: allClasses
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
