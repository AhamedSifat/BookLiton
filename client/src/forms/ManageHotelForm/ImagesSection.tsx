import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';
import { ImageIcon, Upload } from 'lucide-react';

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch('imageUrls');

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      'imageUrls',
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <div className='flex items-center space-x-3 mb-6'>
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg'>
          <ImageIcon className='h-5 w-5 text-white' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900'>Images</h2>
      </div>
      <div className='border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center gap-4 bg-gray-50 hover:bg-gray-100 transition-colors'>
        <div className='bg-blue-100 p-4 rounded-full'>
          <Upload className='h-8 w-8 text-blue-600' />
        </div>
        <div className='text-center'>
          <p className='text-lg font-semibold text-gray-700 mb-2'>
            Upload Hotel Images
          </p>
          <p className='text-sm text-gray-500 mb-4'>
            Choose up to 6 images to showcase your hotel
          </p>
        </div>

        {existingImageUrls && (
          <div className='grid grid-cols-6 gap-4'>
            {existingImageUrls.map((url) => (
              <div className='relative group'>
                <img src={url} className='min-h-full object-cover' />
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type='file'
          multiple
          accept='image/*'
          className='w-full text-gray-700 font-normal file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer'
          {...register('imageFiles', {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length +
                (existingImageUrls ? existingImageUrls.length : 0);
              if (totalLength === 0) {
                return 'At least one image should be added';
              }
              if (totalLength > 6) {
                return 'Total number of images cannot be more than 6';
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className='text-red-500 text-sm font-bold mt-2 block'>
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
