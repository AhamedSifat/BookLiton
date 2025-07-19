import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerUser } from '../api-client';
import { useMutation } from '@tanstack/react-query';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      showToast({
        message: 'Registration successful',
        type: 'SUCCESS',
      });
      navigate('/');
    },
    onError: (error) => {
      showToast({
        message: error instanceof Error ? error.message : 'Registration failed',
        type: 'ERROR',
      });
    },
  });

  return (
    <div className='min-h-screen  flex items-center justify-center py-12 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-2'>
            Create an Account
          </h2>
          <p className='text-gray-600 text-center mb-6'>
            Join thousands of travelers today
          </p>

          <div className='flex flex-col md:flex-row gap-5'>
            <label className='text-gray-700 text-sm font-bold flex-1'>
              First Name
              <input
                type='text'
                className={`border-2 rounded-lg w-full py-3 px-4 font-normal mt-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.firstName
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder='Enter first name'
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className='text-red-500 text-sm mt-1 block'>
                  {errors.firstName.message}
                </span>
              )}
            </label>
            <label className='text-gray-700 text-sm font-bold flex-1'>
              Last Name
              <input
                type='text'
                className={`border-2 rounded-lg w-full py-3 px-4 font-normal mt-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.lastName
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder='Enter last name'
                {...register('lastName', { required: 'Last name is required' })}
              />
              {errors.lastName && (
                <span className='text-red-500 text-sm mt-1 block'>
                  {errors.lastName.message}
                </span>
              )}
            </label>
          </div>

          <label className='text-gray-700 text-sm font-bold flex-1'>
            Email
            <input
              type='email'
              className={`border-2 rounded-lg w-full py-3 px-4 font-normal mt-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.email
                  ? 'border-red-300 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder='Enter your email'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className='text-red-500 text-sm mt-1 block'>
                {errors.email.message}
              </span>
            )}
          </label>

          <label className='text-gray-700 text-sm font-bold flex-1'>
            Password
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`border-2 rounded-lg w-full py-3 px-4 pr-12 font-normal mt-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder='Enter your password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <span className='text-red-500 text-sm mt-1 block'>
                {errors.password.message}
              </span>
            )}
          </label>

          <label className='text-gray-700 text-sm font-bold flex-1'>
            Confirm Password
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`border-2 rounded-lg w-full py-3 px-4 pr-12 font-normal mt-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.confirmPassword
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder='Confirm your password'
                {...register('confirmPassword', {
                  validate: (value) => {
                    if (!value) {
                      return 'Confirm Password is required';
                    } else if (value !== watch('password')) {
                      return 'Passwords do not match';
                    }
                  },
                })}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-5 w-5' />
                ) : (
                  <Eye className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className='text-red-500 text-sm mt-1 block'>
                {errors.confirmPassword.message}
              </span>
            )}
          </label>

          <span>
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 font-bold text-xl rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            >
              Create Account
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
