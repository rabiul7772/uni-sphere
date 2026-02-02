import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import {
  enrollments,
  classes,
  subjects,
  departments,
  users
} from '../db/schema/app.js';
import { eq } from 'drizzle-orm';

export const enrollInClass = async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and Class ID are required'
      });
    }

    const [newEnrollment] = await db
      .insert(enrollments)
      .values({ studentId, classId })
      .returning();

    // Fetch full details for the response as needed by the frontend success state
    const enrollmentDetails = await db
      .select({
        id: enrollments.id,
        class: {
          id: classes.id,
          name: classes.name,
          description: classes.description
        },
        subject: {
          name: subjects.name
        },
        department: {
          name: departments.name
        },
        teacher: {
          name: users.name,
          email: users.email
        }
      })
      .from(enrollments)
      .leftJoin(classes, eq(enrollments.classId, classes.id))
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .leftJoin(users, eq(classes.teacherId, users.id))
      .where(eq(enrollments.id, newEnrollment.id))
      .limit(1);

    res.status(201).json({
      success: true,
      data: enrollmentDetails[0]
    });
  } catch (error) {
    console.error('Error enrolling in class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while enrolling in class'
    });
  }
};
