import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { NewSubject, subjects } from '../db/schema/app.js';

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const data = await db.query.subjects.findMany({
      with: {
        department: true
      }
    });

    if (data.length === 0) {
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
