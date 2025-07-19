import { useForm } from 'react-hook-form';
import type { PaymentIntentResponse, UserType } from '../../config/type';
import { useSearchContext } from '../../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAppContext } from '../../contexts/AppContext';
import { useMutation } from '@tanstack/react-query';
import { createRoomBooking } from '../../api-client';
import type { StripeCardElement } from '@stripe/stripe-js';
import { User, Mail, CreditCard, DollarSign, CheckCircle } from 'lucide-react';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: createRoomBooking,
    onSuccess: () => {
      showToast({ message: 'Booking Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error saving booking', type: 'ERROR' });
    },
  });

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        {/* Header */}
        <div className='flex items-center space-x-3 mb-6'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
            <CheckCircle className='h-5 w-5 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Confirm Your Details
          </h2>
        </div>

        {/* Personal Details */}
        <div className='space-y-6'>
          <h3 className='text-lg font-semibold text-gray-900 flex items-center space-x-2'>
            <User className='h-5 w-5 text-gray-600' />
            <span>Personal Information</span>
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='text-sm font-medium text-gray-700 block mb-2'>
                First Name
              </label>
              <input
                className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium cursor-not-allowed'
                type='text'
                readOnly
                disabled
                {...register('firstName')}
              />
            </div>
            <div>
              <label className='text-sm font-medium text-gray-700 block mb-2'>
                Last Name
              </label>
              <input
                className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium cursor-not-allowed'
                type='text'
                readOnly
                disabled
                {...register('lastName')}
              />
            </div>
            <div className='md:col-span-2'>
              <label className='text-sm font-medium text-gray-700 block mb-2 flex items-center space-x-2'>
                <Mail className='h-4 w-4' />
                <span>Email Address</span>
              </label>
              <input
                className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-medium cursor-not-allowed'
                type='email'
                readOnly
                disabled
                {...register('email')}
              />
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900 flex items-center space-x-2'>
            <DollarSign className='h-5 w-5 text-gray-600' />
            <span>Price Summary</span>
          </h3>
          <div className='bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6'>
            <div className='flex justify-between items-center'>
              <div>
                <div className='text-2xl font-bold text-blue-900'>
                  ${paymentIntent.totalCost.toFixed(2)}
                </div>
                <div className='text-sm text-blue-700'>Total Cost</div>
              </div>
              <div className='text-right'>
                <div className='text-sm text-blue-600'>
                  Includes taxes and charges
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900 flex items-center space-x-2'>
            <CreditCard className='h-5 w-5 text-gray-600' />
            <span>Payment Details</span>
          </h3>
          <div className='border-2 border-gray-200 rounded-lg p-4 bg-gray-50'>
            <CardElement
              id='payment-element'
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#374151',
                    '::placeholder': {
                      color: '#9CA3AF',
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end pt-6 border-t border-gray-200'>
          <button
            disabled={isPending}
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 font-bold text-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2'
          >
            {isPending ? (
              <>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CheckCircle className='h-5 w-5' />
                <span>Confirm Booking</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
