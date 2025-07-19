import { Request, Response } from 'express';
import { generateAuthToken, setTokenCookie } from '../utils/tokenUtils';
import { createNewUser, findUserByEmail } from '../services/user.service';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    // Check existing user
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'User already exists with this email' });
      return;
    }

    // Create user
    const newUser = await createNewUser(firstName, lastName, email, password);

    // Generate and set token
    const token = generateAuthToken(newUser._id.toString());
    setTokenCookie(res, token);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Registration error:', errorMessage);
    res
      .status(500)
      .json({ message: 'User registration failed', error: errorMessage });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
    return;
  }

  try {
    const { email, password } = req.body;

    // Check existing user
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }

    // Generate and set token
    const token = generateAuthToken(user._id.toString());
    setTokenCookie(res, token);

    res
      .status(200)
      .json({ userId: user._id, message: 'User logged in successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('login error:', errorMessage);
    res.status(500).json({ message: 'User login failed', error: errorMessage });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({ userId, message: 'User verified successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('verification error:', errorMessage);
    res
      .status(500)
      .json({ message: 'User verification failed', error: errorMessage });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Clear the auth-token cookie
    res.clearCookie('auth_token');
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('logout error:', errorMessage);
    res
      .status(500)
      .json({ message: 'User logout failed', error: errorMessage });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('getUserDetails error:', errorMessage);
    res
      .status(500)
      .json({ message: 'getUserDetails failed', error: errorMessage });
  }
};
