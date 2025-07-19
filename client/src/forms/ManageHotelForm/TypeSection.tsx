import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import type { HotelFormData } from './ManageHotelForm';
import { Home } from 'lucide-react';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch('type');

  return (
    <div>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
          <Home className='h-5 w-5 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900'>Type</h2>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer text-sm rounded-xl px-4 py-3 font-semibold text-center transition-all duration-200 border-2 ${
              typeWatch === type
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-600 transform scale-105'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            <input
              type='radio'
              value={type}
              {...register('type', {
                required: 'This field is required',
              })}
              className='hidden'
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className='text-red-500 text-sm font-bold mt-2 block'>
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
