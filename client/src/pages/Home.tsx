import { useQuery } from '@tanstack/react-query';
import { fetchAllHotels } from '../api-client';
import { Suspense } from 'react';

import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Waves,
  Shield,
  Clock,
  Award,
  TrendingUp,
  Users,
  Building,
} from 'lucide-react';
import Layout from '../layouts/Layout';
import HomeSkeleton from '../components/home-skeleton';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: hotels, isLoading: hotelLoading } = useQuery({
    queryKey: ['fetchAllHotel'],
    queryFn: fetchAllHotels,
  });

  console.log(hotels);

  if (hotelLoading) {
    return (
      <Layout>
        <HomeSkeleton />
      </Layout>
    );
  }

  // Get featured hotels (first 6)
  const featuredHotels = hotels?.slice(0, 6) || [];

  return (
    <Layout>
      <Suspense fallback={<HomeSkeleton />}>
        <div className='space-y-20'>
          {/* Welcome Section */}
          <section className='text-center py-8'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Welcome to Your Next Adventure
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed'>
              Discover amazing hotels around the world with unbeatable prices
              and exceptional service. Your perfect getaway is just a click
              away.
            </p>
          </section>

          {/* Quick Stats */}
          <section className='grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Building className='h-6 w-6 text-white' />
              </div>
              <div className='text-2xl md:text-3xl font-bold text-gray-900 mb-1'>
                {hotels?.length || 0}+
              </div>
              <div className='text-gray-600 text-sm'>Hotels Available</div>
            </div>
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Users className='h-6 w-6 text-white' />
              </div>
              <div className='text-2xl md:text-3xl font-bold text-gray-900 mb-1'>
                50K+
              </div>
              <div className='text-gray-600 text-sm'>Happy Customers</div>
            </div>
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <TrendingUp className='h-6 w-6 text-white' />
              </div>
              <div className='text-2xl md:text-3xl font-bold text-gray-900 mb-1'>
                100+
              </div>
              <div className='text-gray-600 text-sm'>Countries</div>
            </div>
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow'>
              <div className='bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Award className='h-6 w-6 text-white' />
              </div>
              <div className='text-2xl md:text-3xl font-bold text-gray-900 mb-1'>
                24/7
              </div>
              <div className='text-gray-600 text-sm'>Support</div>
            </div>
          </section>

          {/* Featured Hotels */}
          <section>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Featured Hotels
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                Discover our handpicked selection of premium hotels and resorts
                from around the world
              </p>
            </div>

            {featuredHotels.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {featuredHotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group'
                  >
                    <div className='relative h-48 overflow-hidden'>
                      <img
                        src={
                          hotel.imageUrls?.[0] ||
                          '/placeholder.svg?height=200&width=400'
                        }
                        alt={hotel.name}
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        <span className='text-sm font-medium'>
                          {hotel.starRating}
                        </span>
                      </div>
                      <div className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                        {hotel.type}
                      </div>
                    </div>
                    <div className='p-6'>
                      <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                        {hotel.name}
                      </h3>
                      <div className='flex items-center text-gray-600 mb-4'>
                        <MapPin className='h-4 w-4 mr-1' />
                        <span className='text-sm'>
                          {hotel.city}, {hotel.country}
                        </span>
                      </div>
                      <div className='flex items-center space-x-4 mb-4 text-gray-600'>
                        <Wifi className='h-4 w-4' />
                        <Car className='h-4 w-4' />
                        <Coffee className='h-4 w-4' />
                        <Waves className='h-4 w-4' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <div>
                          <span className='text-2xl font-bold text-gray-900'>
                            ${hotel.pricePerNight}
                          </span>
                          <span className='text-gray-500'>/night</span>
                        </div>
                        <Link
                          to={`/detail/${hotel._id}`}
                          className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105'
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <div className='bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6'>
                  <Building className='h-12 w-12 text-gray-400' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  No Hotels Available
                </h3>
                <p className='text-gray-600'>
                  Check back later for amazing hotel deals!
                </p>
              </div>
            )}

            {hotels && hotels.length > 6 && (
              <div className='text-center mt-12'>
                <Link
                  to='/search'
                  className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all transform hover:scale-105'
                >
                  <span>View All Hotels</span>
                  <TrendingUp className='h-5 w-5' />
                </Link>
              </div>
            )}
          </section>

          {/* Why Choose Us */}
          <section className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Why Choose BookLiton?
              </h2>
              <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                We make your travel experience seamless with our premium
                services and unmatched support
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='text-center'>
                <div className='bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Shield className='h-8 w-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Secure Booking
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Your payments and personal information are protected with
                  bank-level security encryption
                </p>
              </div>
              <div className='text-center'>
                <div className='bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Clock className='h-8 w-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  24/7 Support
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  Our dedicated support team is available round the clock to
                  assist you with any queries
                </p>
              </div>
              <div className='text-center'>
                <div className='bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <Award className='h-8 w-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  Best Price Guarantee
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  We guarantee the best prices on hotels. Find a lower price
                  elsewhere and we'll match it
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
        </div>
      </Suspense>
    </Layout>
  );
};

export default Home;
