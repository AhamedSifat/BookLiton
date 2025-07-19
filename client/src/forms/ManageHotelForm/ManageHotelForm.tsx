import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import type { HotelType } from '../../config/type';
import { useEffect } from 'react';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

interface ManageHotelFormProps {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
}

const ManageHotelForm = ({
  onSave,
  isLoading,
  hotel,
}: ManageHotelFormProps) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotel) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const onSubmit = (data: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('hotelId', hotel._id);
    }

    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('pricePerNight', data.pricePerNight.toString());
    formData.append('starRating', data.starRating.toString());
    formData.append('adultCount', data.adultCount.toString());
    formData.append('childCount', data.childCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  };

  return (
    <FormProvider {...formMethods}>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className='flex justify-end'>
          <button
            disabled={isLoading}
            type='submit'
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 font-bold text-xl rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
