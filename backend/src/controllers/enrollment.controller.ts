import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import {
  enrollments,
  classes,
  subjects,
  departments,
  users
} from '../db/schema/app.js';
import { and, eq } from 'drizzle-orm';
import { aliasedTable } from 'drizzle-orm';
import { sendEnrollmentEmail } from '../utils/email.js';

const teachers = aliasedTable(users, 'teachers');
const students = aliasedTable(users, 'students');

export const enrollInClass = async (req: Request, res: Response) => {
  try {
    const { studentId, classId } = req.body;

    if (!studentId || !classId) {
      return res.status(400).json({
        success: false,
        message: 'Student ID and Class ID are required'
      });
    }

    const existing = await db
      .select({ id: enrollments.id })
      .from(enrollments)
      .where(
        and(
          eq(enrollments.studentId, studentId),
          eq(enrollments.classId, classId)
        )
      )
      .limit(1);
    if (existing.length) {
      return res.status(409).json({
        success: false,
        message: 'You are already enrolled in this class'
      });
    }

    const [newEnrollment] = await db
      .insert(enrollments)
      .values({ studentId, classId })
      .returning();

    if (!newEnrollment) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create enrollment'
      });
    }

    // Fetch full details for the response and for the email
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
          name: teachers.name,
          email: teachers.email
        },
        student: {
          name: students.name,
          email: students.email
        }
      })
      .from(enrollments)
      .leftJoin(classes, eq(enrollments.classId, classes.id))
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .leftJoin(teachers, eq(classes.teacherId, teachers.id))
      .leftJoin(students, eq(enrollments.studentId, students.id))
      .where(eq(enrollments.id, newEnrollment.id))
      .limit(1);

    const enrollmentData = enrollmentDetails[0];

    if (enrollmentData && enrollmentData.student) {
      // Trigger email sending in the background
      sendEnrollmentEmail({
        studentName: enrollmentData.student.name,
        studentEmail: enrollmentData.student.email,
        className: enrollmentData.class?.name || 'Class',
        subjectName: enrollmentData.subject?.name || 'Subject',
        departmentName: enrollmentData.department?.name || 'Department'
      }).catch(err => console.error('Background email sending failed:', err));
    }

    res.status(201).json({
      success: true,
      data: enrollmentData
    });
  } catch (error) {
    console.error('Error enrolling in class:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while enrolling in class'
    });
  }
};
