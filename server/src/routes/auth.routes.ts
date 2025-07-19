import { Router } from 'express';
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from '../controllers/auth.controller';
import { logInValidator, registerValidator } from '../utils/validators';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', logInValidator, loginUser);
router.get('/verify-token', verifyToken, verifyUser);
router.post('/logout', verifyToken, logoutUser);
router.get('/me', verifyToken, getUserDetails);
export default router;
