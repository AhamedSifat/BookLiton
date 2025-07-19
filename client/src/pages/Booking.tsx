import { useQuery } from '@tanstack/react-query';
import {
  createPaymentIntent,
  fetchCurrentUser,
  fetchHotelById,
} from '../api-client';
import { useSearchContext } from '../contexts/SearchContext';
import BookingForm from '../forms/BookingForm/BookingForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import BookingDetailsSummary from '../components/BookingDetailsSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';
import BookingSkeleton from '../components/booking-skeleton';

const Booking = () => {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData, isLoading: paymentLoading } = useQuery({
    queryKey: ['createPaymentIntent'],
    queryFn: () =>
      createPaymentIntent(hotelId as string, numberOfNights.toString()),
    enabled: !!hotelId && numberOfNights > 0,
  });

  const { data: hotel, isLoading: hotelLoading } = useQuery({
    queryKey: ['fetchHotelById'],
    queryFn: () => fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ['fetchCurrentUser'],
    queryFn: fetchCurrentUser,
  });

  if (paymentLoading || hotelLoading || userLoading) {
    return <BookingSkeleton />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24'>
        <Suspense fallback={<BookingSkeleton />}>
          <div className='grid md:grid-cols-[1fr_2fr] gap-8'>
            {hotel && (
              <BookingDetailsSummary
                checkIn={search.checkIn}
                checkOut={search.checkOut}
                adultCount={search.adultCount}
                childCount={search.childCount}
                numberOfNights={numberOfNights}
                hotel={hotel}
              />
            )}
            {currentUser && paymentIntentData && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: paymentIntentData.clientSecret,
                }}
              >
                <BookingForm
                  currentUser={currentUser}
                  paymentIntent={paymentIntentData}
                />
              </Elements>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Booking;
