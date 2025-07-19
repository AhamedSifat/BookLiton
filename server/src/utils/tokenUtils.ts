import jwt from 'jsonwebtoken';
import { Response } from 'express';

export const generateAuthToken = (userId: string): string => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not defined in environment variables');
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
};
