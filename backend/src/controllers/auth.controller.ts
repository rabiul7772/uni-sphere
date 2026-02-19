import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users, type NewUser } from '../db/schema/app.js';
import { eq } from 'drizzle-orm';
import {
  hashPassword,
  comparePassword,
  generateToken
} from '../utils/auth.utils.js';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '../utils/email.js';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, avatarUrl } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, password, and role are required'
      });
    }

    const allowedRoles = new Set(['admin', 'student', 'teacher']);
    if (!allowedRoles.has(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
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

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
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

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
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
  const isProduction = process.env.NODE_ENV === 'production';

  res.clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    const user = foundUsers[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const resetExpires = new Date(Date.now() + 3600000); // 1 hour from now

    await db
      .update(users)
      .set({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: resetExpires
      })
      .where(eq(users.id, user.id));

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailResponse = await sendPasswordResetEmail(
      user.email,
      user.name,
      resetUrl
    );

    if (!emailResponse.success) {
      return res.status(500).json({
        success: false,
        message: 'Error sending reset email. Please try again later.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while processing forgot password'
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password are required'
      });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.resetPasswordToken, hashedToken))
      .limit(1);
    const user = foundUsers[0];

    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    const hashedPassword = await hashPassword(password);

    await db
      .update(users)
      .set({
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      })
      .where(eq(users.id, user.id));

    res.status(200).json({
      success: true,
      message:
        'Password reset successful. You can now log in with your new password.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while resetting password'
    });
  }
};
