import { type FormEvent, useState } from 'react';
import { useSearchContext } from '../contexts/SearchContext';
import { Search, MapPin, Users, Calendar, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  const handleClear = () => {
    setDestination('');
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100 -mt-8 relative z-10'>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'
      >
        {/* Destination */}
        <div className='lg:col-span-2'>
          <label className='text-sm font-medium text-gray-700 flex items-center space-x-1 mb-2'>
            <MapPin className='h-4 w-4' />
            <span>Destination</span>
          </label>
          <div className='relative'>
            <input
              placeholder='Where are you going?'
              className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className='text-sm font-medium text-gray-700 flex items-center space-x-1 mb-2'>
            <Calendar className='h-4 w-4' />
            <span>Check-in</span>
          </label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholderText='Check-in Date'
            className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
            wrapperClassName='w-full'
          />
        </div>

        {/* Check-out */}
        <div>
          <label className='text-sm font-medium text-gray-700 flex items-center space-x-1 mb-2'>
            <Calendar className='h-4 w-4' />
            <span>Check-out</span>
          </label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn}
            maxDate={maxDate}
            placeholderText='Check-out Date'
            className='w-full py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
            wrapperClassName='w-full'
          />
        </div>

        {/* Guests */}
        <div>
          <label className='text-sm font-medium text-gray-700 flex items-center space-x-1 mb-2'>
            <Users className='h-4 w-4' />
            <span>Guests</span>
          </label>
          <div className='flex space-x-2'>
            <div className='flex-1'>
              <input
                className='w-full py-3 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center'
                type='number'
                min={1}
                max={20}
                value={adultCount}
                onChange={(event) =>
                  setAdultCount(Number.parseInt(event.target.value))
                }
                placeholder='Adults'
              />
            </div>
            <div className='flex-1'>
              <input
                className='w-full py-3 px-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center'
                type='number'
                min={0}
                max={20}
                value={childCount}
                onChange={(event) =>
                  setChildCount(Number.parseInt(event.target.value))
                }
                placeholder='Children'
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='lg:col-span-5 flex gap-3 mt-4'>
          <button
            type='submit'
            className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center space-x-2'
          >
            <Search className='h-5 w-5' />
            <span>Search Hotels</span>
          </button>
          <button
            type='button'
            onClick={handleClear}
            className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 font-bold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2'
          >
            <X className='h-5 w-5' />
            <span>Clear</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
