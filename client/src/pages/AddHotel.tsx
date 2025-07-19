import { useMutation } from '@tanstack/react-query';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { addMyHotel } from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isPending } = useMutation({
    mutationFn: addMyHotel,
    onSuccess: () => {
      showToast({ message: 'Hotel Saved!', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Error Saving Hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
