import { useParams } from 'react-router-dom';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMyHotelById, updateMyHotelById } from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery({
    queryKey: ['fetchMyHotelById', hotelId],
    queryFn: () => fetchMyHotelById(hotelId!),

    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['updateMyHotelById'],
    mutationFn: updateMyHotelById,
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

  return hotel ? (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  ) : null;
};

export default EditHotel;
