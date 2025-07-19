import { Request, Response } from 'express';
import cloudinary from '../utils/cloudinary';
import { HotelType } from '../shared/type';
import Hotel from '../models/hotel.model';

export const createUserHotels = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const imageFiles = req.files as Express.Multer.File[];
    if (!imageFiles || imageFiles.length === 0) {
      res.status(400).json({ message: 'No images uploaded' });
      return;
    }

    const uploadPromise = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString('base64');
      let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
      const res = await cloudinary.uploader.upload(dataURI);
      return res.secure_url;
    });

    const imageUrls = await Promise.all(uploadPromise);

    const newHotel: HotelType = req.body;
    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = userId;

    // Save the new hotel to the database
    await Hotel.create(newHotel);
    res.status(201).json({ message: 'User hotel created successfully' });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('createUserHotels error:', errorMessage);
    res
      .status(500)
      .json({ message: 'User hotel creation failed', error: errorMessage });
  }
};

export const getUserHotels = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const hotels = await Hotel.find({ userId }).sort({ lastUpdated: -1 });
    res.status(200).json(hotels);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('getUserHotels error:', errorMessage);
    res
      .status(500)
      .json({ message: 'Failed to fetch user hotels', error: errorMessage });
  }
};

export const getUserHotelById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const hotelId = req.params.id.toString();
    if (!hotelId) {
      res.status(400).json({ message: 'Hotel ID is required' });
      return;
    }

    const hotel = await Hotel.findOne({ _id: hotelId, userId });
    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }

    res.status(200).json(hotel);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('getUserHotelById error:', errorMessage);
    res
      .status(500)
      .json({ message: 'Failed to fetch user hotel', error: errorMessage });
  }
};

export const updateUserHotelById = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const hotelId = req.params.id.toString();
    if (!hotelId) {
      res.status(400).json({ message: 'Hotel ID is required' });
      return;
    }

    const updatedHotel = req.body as HotelType;
    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: hotelId,
        userId,
      },
      updatedHotel,
      {
        new: true,
      }
    );

    if (!hotel) {
      res.status(404).json({ message: 'Hotel not found' });
      return;
    }

    const imageFiles = req.files as Express.Multer.File[];
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.secure_url;
      });

      const updatedImageUrls = await Promise.all(uploadPromise);
      hotel.imageUrls = [...updatedImageUrls, ...(hotel.imageUrls || [])];
      await hotel.save();
    }
    res.status(200).json(hotel);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('updateUserHotelById error:', errorMessage);
    res
      .status(500)
      .json({ message: 'Failed to update user hotel', error: errorMessage });
  }
};
