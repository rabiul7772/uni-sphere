import type { Request, Response } from 'express';
import { db } from '../db/index.js';

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const data = await db.query.subjects.findMany({
      with: {
        department: true
      }
    });

    if (!data) {
      return res.status(404).json({ message: 'Subjects not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Subjects fetched successfully',
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal server error while fetching all subjects'
    });
  }
};
