import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, LogIn } from 'lucide-react';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // Calculate number of nights
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;
  const totalCost = nights > 0 ? nights * pricePerNight : 0;

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate('/login', { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      '',
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-2xl font-bold'>${pricePerNight}</h3>
            <p className='text-blue-100'>per night</p>
          </div>
          <CreditCard className='h-8 w-8 text-blue-200' />
        </div>
      </div>

      {/* Form */}
      <div className='p-6'>
        <form
          onSubmit={
            isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
          }
          className='space-y-6'
        >
          {/* Check-in Date */}
          <div>
            <label className='text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2'>
              <Calendar className='h-4 w-4' />
              <span>Check-in Date</span>
            </label>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText='Select check-in date'
              className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
              wrapperClassName='w-full'
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label className='text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2'>
              <Calendar className='h-4 w-4' />
              <span>Check-out Date</span>
            </label>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue('checkOut', date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn}
              maxDate={maxDate}
              placeholderText='Select check-out date'
              className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
              wrapperClassName='w-full'
            />
          </div>

          {/* Guests */}
          <div>
            <label className='text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2'>
              <Users className='h-4 w-4' />
              <span>Guests</span>
            </label>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='text-xs text-gray-500 block mb-1'>
                  Adults
                </label>
                <input
                  className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center font-medium'
                  type='number'
                  min={1}
                  max={20}
                  placeholder='1'
                  {...register('adultCount', {
                    required: 'This field is required',
                    min: {
                      value: 1,
                      message: 'There must be at least one adult',
                    },
                    valueAsNumber: true,
                  })}
                />
              </div>
              <div>
                <label className='text-xs text-gray-500 block mb-1'>
                  Children
                </label>
                <input
                  className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center font-medium'
                  type='number'
                  min={0}
                  max={20}
                  placeholder='0'
                  {...register('childCount', {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </div>
            {errors.adultCount && (
              <span className='text-red-500 text-sm mt-1 block'>
                {errors.adultCount.message}
              </span>
            )}
          </div>

          {/* Price Summary */}
          {nights > 0 && (
            <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
              <div className='flex justify-between text-sm text-gray-600'>
                <span>
                  ${pricePerNight} × {nights} night{nights > 1 ? 's' : ''}
                </span>
                <span>${totalCost}</span>
              </div>
              <hr className='border-gray-200' />
              <div className='flex justify-between font-bold text-gray-900'>
                <span>Total</span>
                <span>${totalCost}</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {isLoggedIn ? (
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 font-bold text-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center space-x-2'
            >
              <CreditCard className='h-5 w-5' />
              <span>Book Now</span>
            </button>
          ) : (
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 font-bold text-lg rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center space-x-2'
            >
              <LogIn className='h-5 w-5' />
              <span>Sign in to Book</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default GuestInfoForm;
