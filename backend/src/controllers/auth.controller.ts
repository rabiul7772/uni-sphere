import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users, type NewUser } from '../db/schema/app.js';
import { eq } from 'drizzle-orm';
import {
  hashPassword,
  comparePassword,
  generateToken
} from '../utils/auth.utils.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, avatarUrl } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and role are required'
      });
    }

    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUsers.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser: NewUser = {
      name,
      email,
      password: hashedPassword,
      role,
      avatarUrl: avatarUrl || null
    };

    const returnedUsers = await db.insert(users).values(newUser).returning();
    const user = returnedUsers[0];

    if (!user) {
      throw new Error('Failed to create user');
    }

    const token = generateToken(user.id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while signing up'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const user = foundUsers[0];

    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user.id, user.role);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: userWithoutPassword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while logging in'
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  // This will be used with a middleware to check session
  // For now, simple response
  res.status(200).json({
    success: true,
    data: (req as any).user
  });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};
