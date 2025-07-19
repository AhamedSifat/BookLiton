import { Router } from 'express';

import verifyToken from '../middleware/verifyToken';
import { upload } from '../utils/multer';
import {
  createUserHotels,
  getUserHotelById,
  getUserHotels,
  updateUserHotelById,
} from '../controllers/my-hotels.controller';
import { hotelValidator } from '../utils/validators';

const router = Router();
// api/my-hotels
router.post(
  '/',
  verifyToken,
  hotelValidator,
  upload.array('imageFiles', 6),

  createUserHotels
);

router.get('/', verifyToken, getUserHotels);
router.get('/:id', verifyToken, getUserHotelById);
router.put(
  '/:id',
  verifyToken,
  upload.array('imageFiles', 6),
  updateUserHotelById
);

export default router;
