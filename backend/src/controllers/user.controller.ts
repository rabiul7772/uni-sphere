import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema/app.js';
import { desc } from 'drizzle-orm';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt));

    // Remove passwords from response
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);

    res.status(200).json({
      success: true,
      data: usersWithoutPasswords
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching users'
    });
  }
};
