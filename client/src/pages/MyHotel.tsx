import { Link } from 'react-router-dom';
import {
  MapPin,
  Building,
  Users,
  Star,
  Plus,
  Calendar,
  Eye,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyHotels } from '../api-client';
import { Suspense } from 'react';
import HotelSkeleton from '../components/hotel-skeleton';

const MyHotels = () => {
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ['my-hotels'],
    queryFn: fetchMyHotels,
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
          <div className='flex justify-between items-center mb-8'>
            <div className='h-10 bg-gray-200 rounded-lg w-48 animate-pulse'></div>
            <div className='h-12 bg-gray-200 rounded-lg w-32 animate-pulse'></div>
          </div>
          <div className='space-y-6'>
            {[...Array(3)].map((_, i) => (
              <HotelSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
          <div className='text-center py-16'>
            <div className='bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6'>
              <Building className='h-12 w-12 text-gray-400' />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              No Hotels Found
            </h2>
            <p className='text-gray-600 mb-8'>
              You haven't added any hotels yet. Start by adding your first
              hotel.
            </p>
            <Link
              to='/add-hotel'
              className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105'
            >
              <Plus className='h-5 w-5' />
              <span>Add Your First Hotel</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <Suspense fallback={<HotelSkeleton />}>
          <div className='flex justify-between items-center mb-8'>
            <div className='flex items-center space-x-3'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl'>
                <Building className='h-6 w-6 text-white' />
              </div>
              <h1 className='text-3xl font-bold text-gray-900'>My Hotels</h1>
              <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                {hotelData.length} {hotelData.length === 1 ? 'Hotel' : 'Hotels'}
              </span>
            </div>
            <Link
              to='/add-hotel'
              className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105'
            >
              <Plus className='h-5 w-5' />
              <span>Add Hotel</span>
            </Link>
          </div>

          <div className='space-y-6'>
            {hotelData.map((hotel) => (
              <div
                key={hotel._id}
                data-testid='hotel-card'
                className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'
              >
                <div className='md:flex'>
                  {/* Hotel Image - Made smaller */}
                  <div className='md:w-1/4'>
                    <div className='relative h-48 md:h-56'>
                      <img
                        src={
                          hotel.imageUrls[0] ||
                          '/placeholder.svg?height=200&width=300'
                        }
                        alt={hotel.name}
                        className='object-cover'
                      />
                      <div className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        <span className='text-xs font-medium'>
                          {hotel.starRating}
                        </span>
                      </div>
                      {hotel.bookings && hotel.bookings.length > 0 && (
                        <div className='absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium'>
                          {hotel.bookings.length} Booking
                          {hotel.bookings.length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hotel Details - Takes more space now */}
                  <div className='md:w-3/4 p-6'>
                    <div className='flex justify-between items-start mb-4'>
                      <div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                          {hotel.name}
                        </h2>
                        <div className='flex items-center text-gray-600 mb-2'>
                          <MapPin className='h-4 w-4 mr-1' />
                          <span>
                            {hotel.city}, {hotel.country}
                          </span>
                        </div>
                        <div className='flex items-center text-gray-600'>
                          <Building className='h-4 w-4 mr-1' />
                          <span>{hotel.type}</span>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-2xl font-bold text-blue-600'>
                          ${hotel.pricePerNight}
                        </div>
                        <div className='text-sm text-gray-500'>per night</div>
                      </div>
                    </div>

                    <p className='text-gray-600 mb-4 line-clamp-2'>
                      {hotel.description}
                    </p>

                    {/* Hotel Stats */}
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mb-4'>
                      <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                        <Users className='h-4 w-4 text-gray-500' />
                        <span className='text-sm text-gray-700'>
                          {hotel.adultCount} adults, {hotel.childCount} children
                        </span>
                      </div>
                      <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2'>
                        <Calendar className='h-4 w-4 text-gray-500' />
                        <span className='text-sm text-gray-700'>
                          Updated{' '}
                          {new Date(hotel.lastUpdated).toLocaleDateString()}
                        </span>
                      </div>
                      <div className='bg-gray-50 rounded-lg p-3 flex items-center space-x-2 md:col-span-1 col-span-2'>
                        <Building className='h-4 w-4 text-gray-500' />
                        <span className='text-sm text-gray-700'>
                          {hotel.imageUrls.length} Photos
                        </span>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div className='mb-4'>
                      <div className='flex flex-wrap gap-2'>
                        {hotel.facilities.slice(0, 4).map((facility, index) => (
                          <span
                            key={index}
                            className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'
                          >
                            {facility}
                          </span>
                        ))}
                        {hotel.facilities.length > 4 && (
                          <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium'>
                            +{hotel.facilities.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className='flex justify-end'>
                      <Link
                        to={`/edit-hotel/${hotel._id}`}
                        className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105'
                      >
                        <Eye className='h-4 w-4' />
                        <span>View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default MyHotels;
