import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import {
  departments,
  subjects,
  type NewDepartment,
  type NewSubject
} from '../db/schema/app.js';

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const data = await db.query.departments.findMany({
      with: {
        subjects: true
      }
    });

    if (!data) {
      return res.status(404).json({ message: 'Departments not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Departments fetched successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error while fetching all departments'
    });
  }
};
