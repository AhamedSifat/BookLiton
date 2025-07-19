import type { HotelType } from '../config/type';
import { MapPin, Calendar, Users, Clock, Star } from 'lucide-react';

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-8'>
      {/* Header */}
      <div className='flex items-center space-x-3 mb-6'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
          <Calendar className='h-5 w-5 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900'>Booking Details</h2>
      </div>

      {/* Hotel Info */}
      <div className='mb-6 pb-6 border-b border-gray-200'>
        <div className='flex space-x-4'>
          <div className='relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0'>
            <img
              src={hotel.imageUrls?.[0] || '/placeholder.svg'}
              alt={hotel.name}
              className='object-cover'
            />
          </div>
          <div className='flex-1'>
            <h3 className='font-bold text-lg text-gray-900 mb-1'>
              {hotel.name}
            </h3>
            <div className='flex items-center text-gray-600 mb-2'>
              <MapPin className='h-4 w-4 mr-1' />
              <span className='text-sm'>
                {hotel.city}, {hotel.country}
              </span>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center'>
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <Star
                    key={index}
                    className='h-4 w-4 fill-yellow-400 text-yellow-400'
                  />
                ))}
              </div>
              <span className='ml-2 text-sm text-gray-600'>{hotel.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in/Check-out */}
      <div className='grid grid-cols-2 gap-4 mb-6'>
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <Calendar className='h-4 w-4 text-gray-500' />
            <span className='text-sm font-medium text-gray-700'>Check-in</span>
          </div>
          <div className='font-bold text-gray-900'>
            {checkIn.toDateString()}
          </div>
        </div>
        <div className='bg-gray-50 rounded-lg p-4'>
          <div className='flex items-center space-x-2 mb-2'>
            <Calendar className='h-4 w-4 text-gray-500' />
            <span className='text-sm font-medium text-gray-700'>Check-out</span>
          </div>
          <div className='font-bold text-gray-900'>
            {checkOut.toDateString()}
          </div>
        </div>
      </div>

      {/* Stay Duration */}
      <div className='bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100'>
        <div className='flex items-center space-x-2 mb-2'>
          <Clock className='h-4 w-4 text-blue-600' />
          <span className='text-sm font-medium text-blue-800'>Total Stay</span>
        </div>
        <div className='font-bold text-blue-900'>
          {numberOfNights} night{numberOfNights > 1 ? 's' : ''}
        </div>
      </div>

      {/* Guests */}
      <div className='bg-gray-50 rounded-lg p-4'>
        <div className='flex items-center space-x-2 mb-2'>
          <Users className='h-4 w-4 text-gray-500' />
          <span className='text-sm font-medium text-gray-700'>Guests</span>
        </div>
        <div className='font-bold text-gray-900'>
          {adultCount} adult{adultCount > 1 ? 's' : ''} & {childCount} child
          {childCount !== 1 ? 'ren' : ''}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
