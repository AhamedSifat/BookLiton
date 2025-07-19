import { useParams } from 'react-router-dom';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchHotelById } from '../api-client';
import GuestInfoForm from '../forms/GuestInfoForm/GuestInfoForm';
import { Suspense } from 'react';
import HotelDetailsSkeleton from '../components/hotel-details-skeleton';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { data: hotel, isLoading } = useQuery({
    queryKey: ['fetchHotelById'],
    queryFn: () => fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  if (isLoading) {
    return <HotelDetailsSkeleton />;
  }

  if (!hotel) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Hotel Not Found
          </h2>
          <p className='text-gray-600'>
            The hotel you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <Suspense fallback={<HotelDetailsSkeleton />}>
          <div className='space-y-8'>
            {/* Hotel Header */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <div className='flex items-center mb-4'>
                <div className='flex items-center'>
                  {Array.from({ length: hotel.starRating }).map((_, index) => (
                    <Star
                      key={index}
                      className='h-5 w-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                </div>
                <span className='ml-3 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                  {hotel.type}
                </span>
              </div>
              <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                {hotel.name}
              </h1>
              {hotel.city && hotel.country && (
                <div className='flex items-center text-gray-600'>
                  <MapPin className='h-5 w-5 mr-2' />
                  <span className='text-lg'>
                    {hotel.city}, {hotel.country}
                  </span>
                </div>
              )}
            </div>

            {/* Hotel Images */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>Gallery</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {hotel.imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className='relative h-64 rounded-xl overflow-hidden group'
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`${hotel.name} - Image ${index + 1}`}
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Facilities & Amenities
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {hotel.facilities.map((facility, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-lg p-4 hover:from-blue-100 hover:to-purple-100 transition-colors'
                  >
                    {/* You can add specific icons for different facilities */}
                    <div className='bg-blue-600 p-2 rounded-lg'>
                      {facility.toLowerCase().includes('wifi') ? (
                        <Wifi className='h-4 w-4 text-white' />
                      ) : facility.toLowerCase().includes('parking') ? (
                        <Car className='h-4 w-4 text-white' />
                      ) : facility.toLowerCase().includes('pool') ? (
                        <Waves className='h-4 w-4 text-white' />
                      ) : (
                        <Coffee className='h-4 w-4 text-white' />
                      )}
                    </div>
                    <span className='font-medium text-gray-700'>
                      {facility}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description and Booking */}
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8'>
              {/* Description */}
              <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                  About This Hotel
                </h2>
                <div className='prose prose-gray max-w-none'>
                  <p className='text-gray-600 leading-relaxed whitespace-pre-line'>
                    {hotel.description}
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <div className='h-fit'>
                <GuestInfoForm
                  pricePerNight={hotel.pricePerNight}
                  hotelId={hotel._id}
                />
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default HotelDetails;
