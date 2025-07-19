import { useForm } from 'react-hook-form';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn } from '../api-client';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      showToast({ message: 'Sign in Successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries({ queryKey: ['verifyUser'] });
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>
            Welcome Back
          </h2>
          <p className='text-gray-600'>Sign in to your account to continue</p>
        </div>

        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
          <label className='text-gray-700 text-sm font-bold flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <Mail className='h-4 w-4 text-gray-500' />
              <span>Email</span>
            </div>
            <input
              type='email'
              className={`border-2 rounded-lg w-full py-3 px-4 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.email
                  ? 'border-red-300 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
              }`}
              placeholder='Enter your email'
              {...register('email', { required: 'This field is required' })}
            />
            {errors.email && (
              <span className='text-red-500 text-sm mt-1 block'>
                {errors.email.message}
              </span>
            )}
          </label>

          <label className='text-gray-700 text-sm font-bold flex-1'>
            <div className='flex items-center space-x-2 mb-2'>
              <Lock className='h-4 w-4 text-gray-500' />
              <span>Password</span>
            </div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`border-2 rounded-lg w-full py-3 px-4 pr-12 font-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }`}
                placeholder='Enter your password'
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
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

          <span className='flex items-center justify-between'>
            <span className='text-sm text-gray-600'>
              Not Registered?{' '}
              <Link
                className='text-blue-600 hover:text-blue-700 font-medium underline'
                to='/register'
              >
                Create an account here
              </Link>
            </span>
            <button
              type='submit'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 font-bold text-xl rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            >
              Login
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
