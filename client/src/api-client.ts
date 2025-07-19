import type {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  SearchParams,
  UserType,
} from './config/type';
import type { BookingFormData } from './forms/BookingForm/BookingForm';
import type { Inputs } from './pages/Register';
import type { SignInFormData } from './pages/SignIn';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: Inputs) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Registration failed');
  }

  return responseData;
};

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: 'include',
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Login failed');
  }

  return responseData;
};

export const loginUser = async (formData: Inputs) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Login failed');
  }

  return responseData;
};

export const verifyUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/verify-token`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('User verification failed');
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users/logout`, {
    credentials: 'include',
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Error during sign out');
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error('Failed to add hotel');
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching hotels');
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching Hotels');
  }

  return response.json();
};

export const updateMyHotelById = async (
  hotelFormData: FormData
): Promise<HotelType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update hotel');
  }

  return response.json();
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount || '');
  queryParams.append('childCount', searchParams.childCount || '');
  queryParams.append('page', searchParams.page || '');
  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOption', searchParams.sortOption || '');

  searchParams.facilities?.forEach((facility) =>
    queryParams.append('facilities', facility)
  );

  searchParams.types?.forEach((type) => queryParams.append('types', type));
  searchParams.stars?.forEach((star) => queryParams.append('stars', star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error('Error fetching hotels');
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error('Error fetching Hotels');
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ numberOfNights }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error fetching payment intent');
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  console.log(formData);
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error('Error booking room');
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to fetch bookings');
  }

  return response.json();
};

export const fetchAllHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/all`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error fetching hotels');
  }

  return response.json();
};
