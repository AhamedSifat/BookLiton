import { Router } from 'express';
import {
  allHotels,
  createHotelBooking,
  createPaymentIntent,
  getHotelById,
  searchHotels,
} from '../controllers/hotels.controller';
import { param } from 'express-validator';
import verifyToken from '../middleware/verifyToken';

const router = Router();
// api/hotels/search?
router.get('/all', allHotels);
router.get('/search', searchHotels);
router.get(
  '/:id',
  [param('id').notEmpty().withMessage('Hotel ID is required')],
  getHotelById
);
router.post(
  '/:hotelId/bookings/payment-intent',
  verifyToken,
  createPaymentIntent
);

router.post('/:hotelId/bookings', verifyToken, createHotelBooking);

export default router;
