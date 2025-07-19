import { Request, Response } from 'express';
import Hotel from '../models/hotel.model';
import { BookingType, HotelSearchResponse } from '../shared/type';
import { constructSearchQuery } from '../utils/contructSearchQuery';
import { validationResult } from 'express-validator';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil', // or your current version
});

export const searchHotels = async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    );

    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions = { starRating: -1 };
        break;
      case 'pricePerNightAsc':
        sortOptions = { pricePerNight: 1 };
        break;
      case 'pricePerNightDesc':
        sortOptions = { pricePerNight: -1 };
        break;
    }

    const skip = (pageNumber - 1) * pageSize;

    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const totalHotels = await Hotel.countDocuments();

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total: totalHotels,
        page: pageNumber,
        pages: Math.ceil(totalHotels / pageSize),
      },
    };
    res.json(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('search error:', errorMessage);
    res
      .status(500)
      .json({ message: 'Hotel search failed', error: errorMessage });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const id = req.params.id.toString();

    const hotel = await Hotel.findById(id);
    res.json(hotel);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('getHotelById error:', errorMessage);
    res
      .status(500)
      .json({ message: 'getHotelById failed', error: errorMessage });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      res.status(400).json({ message: 'Hotel not found' });
      return;
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'usd',
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      res.status(500).json({ message: 'Error creating payment intent' });
      return;
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret.toString(),
      totalCost,
    };

    res.send(response);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('createPayment error:', errorMessage);
    res
      .status(500)
      .json({ message: 'createPayment failed', error: errorMessage });
  }
};

export const createHotelBooking = async (req: Request, res: Response) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );

    if (!paymentIntent) {
      res.status(400).json({ message: 'payment intent not found' });
      return;
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      res.status(400).json({ message: 'payment intent mismatch' });
      return;
    }

    if (paymentIntent.status !== 'succeeded') {
      res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
      return;
    }

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      res.status(400).json({ message: 'hotel not found' });
      return;
    }

    await hotel.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });
  }
};
export const allHotels = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find();
    res.json(hotel);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('allHotels error:', errorMessage);
    res.status(500).json({ message: 'allHotels failed', error: errorMessage });
  }
};
