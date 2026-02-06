import type { Request, Response } from 'express';
import { db } from '../db/index.js';
import { users } from '../db/schema/app.js';
import { desc, sql, or, ilike, and, eq } from 'drizzle-orm';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (search)
      conditions.push(
        or(ilike(users.name, `%${search}%`), ilike(users.email, `%${search}%`))
      );

    if (role && role !== 'all') conditions.push(eq(users.role, role as any));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [total] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(whereClause);

    const count = total?.count ?? 0;

    const allUsers = await db
      .select()
      .from(users)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(users.createdAt));

    // Remove passwords from response
    const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);

    res.status(200).json({
      success: true,
      data: usersWithoutPasswords,
      count: Number(count)
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching users'
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, Number(id)),
      with: {
        classes: {
          with: {
            subject: {
              with: {
                department: true
              }
            }
          }
        },
        enrollments: {
          with: {
            class: {
              with: {
                subject: {
                  with: {
                    department: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Remove password
    const { password, ...userWithoutPassword } = data as any;

    res.status(200).json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while fetching user'
    });
  }
};
