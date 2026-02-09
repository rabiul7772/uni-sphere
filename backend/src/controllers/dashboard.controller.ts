import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import {
  departments,
  subjects,
  users,
  classes,
  enrollments
} from '../db/schema/app.js';
import { count, desc, eq, sql } from 'drizzle-orm';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      { totalDepartments },
      { totalSubjects },
      { totalTeachers },
      { totalStudents },
      { totalEnrollments },
      { totalClasses }
    ] = await Promise.all([
      db
        .select({ totalDepartments: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(departments)
        .then(r => r[0] || { totalDepartments: 0 }),
      db
        .select({ totalSubjects: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(subjects)
        .then(r => r[0] || { totalSubjects: 0 }),
      db
        .select({ totalTeachers: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(users)
        .where(eq(users.role, 'teacher'))
        .then(r => r[0] || { totalTeachers: 0 }),
      db
        .select({ totalStudents: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(users)
        .where(eq(users.role, 'student'))
        .then(r => r[0] || { totalStudents: 0 }),
      db
        .select({ totalEnrollments: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(enrollments)
        .then(r => r[0] || { totalEnrollments: 0 }),
      db
        .select({ totalClasses: sql<number>`CAST(count(*) AS INTEGER)` })
        .from(classes)
        .where(eq(classes.status, 'active'))
        .then(r => r[0] || { totalClasses: 0 })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalDepartments,
        totalSubjects,
        totalTeachers,
        totalStudents,
        totalEnrollments,
        totalClasses
      }
    });
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
};

export const getRecentClasses = async (req: Request, res: Response) => {
  try {
    const rows = await db
      .select({
        id: classes.id,
        name: classes.name,
        bannerUrl: classes.bannerUrl,
        status: classes.status,
        createdAt: classes.createdAt,
        teacherName: users.name,
        teacherAvatar: users.avatarUrl,
        subjectName: subjects.name
      })
      .from(classes)
      .leftJoin(users, eq(classes.teacherId, users.id))
      .leftJoin(subjects, eq(classes.subjectId, subjects.id))
      .orderBy(desc(classes.createdAt))
      .limit(5);

    const recentClasses = rows.map(row => ({
      id: row.id,
      name: row.name,
      bannerUrl: row.bannerUrl,
      status: row.status,
      createdAt: row.createdAt,
      teacher: {
        name: row.teacherName,
        avatarUrl: row.teacherAvatar
      },
      subject: {
        name: row.subjectName
      }
    }));

    res.status(200).json({
      success: true,
      data: recentClasses
    });
  } catch (error) {
    console.error('Error in getRecentClasses:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch recent classes' });
  }
};

export const getChartData = async (req: Request, res: Response) => {
  try {
    // 1. Pie Chart - Enrollment Distribution
    const studentEnrollments = await db
      .select({
        studentId: enrollments.studentId,
        count: sql<number>`CAST(count(*) AS INTEGER)`
      })
      .from(enrollments)
      .groupBy(enrollments.studentId);

    const dist = {
      '1-2 classes': 0,
      '3-5 classes': 0,
      '6+ classes': 0
    };

    studentEnrollments.forEach(row => {
      const c = Number(row.count);
      if (c <= 2) dist['1-2 classes']++;
      else if (c <= 5) dist['3-5 classes']++;
      else dist['6+ classes']++;
    });

    const enrollmentDistribution = Object.entries(dist).map(
      ([name, value]) => ({ name, value })
    );

    // 2. Line Chart - Subjects per Department (Top 10)
    const subjectsPerDept = await db
      .select({
        name: departments.name,
        subjectCount: sql<number>`CAST(count(${subjects.id}) AS INTEGER)`
      })
      .from(departments)
      .leftJoin(subjects, eq(departments.id, subjects.departmentId))
      .groupBy(departments.id, departments.name)
      .orderBy(desc(sql`count(${subjects.id})`))
      .limit(10);

    // 3. Bar Chart - Enrollments per Subject (Top 10)
    const enrollmentsPerSubject = await db
      .select({
        name: subjects.name,
        enrollmentCount: sql<number>`CAST(count(${enrollments.id}) AS INTEGER)`
      })
      .from(subjects)
      .leftJoin(classes, eq(subjects.id, classes.subjectId))
      .leftJoin(enrollments, eq(classes.id, enrollments.classId))
      .groupBy(subjects.id, subjects.name)
      .orderBy(desc(sql`count(${enrollments.id})`))
      .limit(10);

    // 4. Line Chart - Classes per Subject (Top 10)
    const classesPerSubject = await db
      .select({
        name: subjects.name,
        classCount: sql<number>`CAST(count(${classes.id}) AS INTEGER)`
      })
      .from(subjects)
      .leftJoin(classes, eq(subjects.id, classes.subjectId))
      .groupBy(subjects.id, subjects.name)
      .orderBy(desc(sql`count(${classes.id})`))
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        enrollmentDistribution,
        subjectsPerDept,
        enrollmentsPerSubject,
        classesPerSubject
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch chart data' });
  }
};
