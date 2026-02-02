import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hashed: string) => {
  return await bcrypt.compare(password, hashed);
};

export const generateToken = (userId: number, role: string) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return jwt.sign({ id: userId, role }, secret, {
    expiresIn: '30d'
  });
};
