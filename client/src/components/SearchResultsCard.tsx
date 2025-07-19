import { Link } from 'react-router-dom';
import { Star, MapPin, Eye } from 'lucide-react';
import type { HotelType } from '../config/type';

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group'>
      <div className='grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-0'>
        {/* Hotel Image */}
        <div className='relative h-64 xl:h-80 overflow-hidden'>
          <img
            src={hotel.imageUrls[0] || '/placeholder.svg'}
            alt={hotel.name}
            className='w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1'>
            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
            <span className='text-sm font-medium'>{hotel.starRating}</span>
          </div>
          <div className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
            {hotel.type}
          </div>
        </div>

        {/* Hotel Details */}
        <div className='p-6 flex flex-col justify-between'>
          {/* Header Section */}
          <div className='mb-4'>
            <div className='flex items-center mb-2'>
              <div className='flex items-center'>
                {Array.from({ length: hotel.starRating }).map((_, index) => (
                  <Star
                    key={index}
                    className='h-4 w-4 fill-yellow-400 text-yellow-400'
                  />
                ))}
              </div>
              <span className='ml-2 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full'>
                {hotel.type}
              </span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className='text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer block mb-2'
            >
              {hotel.name}
            </Link>
            {hotel.city && hotel.country && (
              <div className='flex items-center text-gray-600'>
                <MapPin className='h-4 w-4 mr-1' />
                <span className='text-sm'>
                  {hotel.city}, {hotel.country}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className='mb-6 flex-1'>
            <p className='text-gray-600 line-clamp-3 leading-relaxed'>
              {hotel.description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4'>
            {/* Facilities */}
            <div className='flex flex-wrap gap-2'>
              {hotel.facilities.slice(0, 3).map((facility, index) => (
                <span
                  key={index}
                  className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium'
                >
                  {facility}
                </span>
              ))}
              {hotel.facilities.length > 3 && (
                <span className='text-sm text-gray-500 px-2 py-1'>
                  +{hotel.facilities.length - 3} more
                </span>
              )}
            </div>

            {/* Price and Action */}
            <div className='flex flex-col items-end gap-3'>
              <div className='text-right'>
                <div className='text-2xl font-bold text-blue-600'>
                  ${hotel.pricePerNight}
                </div>
                <div className='text-sm text-gray-500'>per night</div>
              </div>
              <Link
                to={`/detail/${hotel._id}`}
                className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105'
              >
                <Eye className='h-4 w-4' />
                <span>View More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
