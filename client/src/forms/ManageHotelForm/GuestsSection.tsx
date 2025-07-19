import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';
import { Users } from 'lucide-react';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
          <Users className='h-5 w-5 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900'>Guests</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100'>
        <label className='text-gray-700 text-sm font-semibold'>
          <span className='block mb-2'>Adults</span>
          <input
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.adultCount
                ? 'border-red-300 bg-red-50 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 bg-white'
            }`}
            type='number'
            min={1}
            placeholder='Number of adults'
            {...register('adultCount', {
              required: 'This field is required',
            })}
          />
          {errors.adultCount?.message && (
            <span className='text-red-500 text-sm font-bold mt-1 block'>
              {errors.adultCount?.message}
            </span>
          )}
        </label>
        <label className='text-gray-700 text-sm font-semibold'>
          <span className='block mb-2'>Children</span>
          <input
            className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              errors.childCount
                ? 'border-red-300 bg-red-50 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300 bg-white'
            }`}
            type='number'
            min={0}
            placeholder='Number of children'
            {...register('childCount', {
              required: 'This field is required',
            })}
          />
          {errors.childCount?.message && (
            <span className='text-red-500 text-sm font-bold mt-1 block'>
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
