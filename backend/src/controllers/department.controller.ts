import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { departments, type NewDepartment } from '../db/schema/app.js';

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const data = await db.query.departments.findMany({
      with: {
        subjects: true
      }
    });

    if (data.length === 0)
      return res.status(404).json({ message: 'Departments not found' });

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
