'use client';

import { Link } from 'react-router-dom';
import { Hotel, User, Calendar, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import SignOutButton from './SignOutButton';

export default function Header() {
  const { isLoggedIn } = useAppContext();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className='bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50'>
      <div className='container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link to='/' className='flex items-center space-x-2 group'>
            <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl group-hover:scale-105 transition-transform'>
              <Hotel className='h-6 w-6 text-white' />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              BookLiton
            </span>
          </Link>

          {/* Navigation */}
          <nav className='flex items-center space-x-4'>
            {isLoggedIn ? (
              <div className='relative'>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center space-x-2 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors'
                >
                  <div className='h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                    <span className='text-white text-sm font-medium'>U</span>
                  </div>
                  <span className='hidden md:block font-medium'>Account</span>
                </button>

                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2'>
                    <Link
                      to='/my-bookings'
                      className='flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                    >
                      <Calendar className='h-4 w-4' />
                      <span>My Bookings</span>
                    </Link>
                    <Link
                      to='/my-hotels'
                      className='flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors'
                    >
                      <Hotel className='h-4 w-4' />
                      <span>My Hotels</span>
                    </Link>
                    <hr className='my-2 border-gray-200' />
                    <button className='flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left'>
                      <LogOut className='h-4 w-4' />
                      <SignOutButton />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center space-x-3'>
                <Link
                  to='/register'
                  className='px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors'
                >
                  Sign Up
                </Link>
                <Link
                  to='/login'
                  className='flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105'
                >
                  <User className='h-4 w-4' />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
