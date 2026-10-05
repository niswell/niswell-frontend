import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/store';
import { registerUser } from '../store/slices/authSlice';
import { RegisterPayload } from '../types';

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterPayload>();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const password = watch('password');

  const onSubmit = async (data: RegisterPayload) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-dark-900 border border-dark-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Join Niswell</h1>

        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
            <input
              {...register('displayName', { required: 'Display name is required' })}
              type="text"
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
              placeholder="Your name"
            />
            {errors.displayName && <p className="text-red-400 text-sm mt-1">{errors.displayName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Account Type</label>
            <select
              {...register('role')}
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
            >
              <option value="viewer">Viewer</option>
              <option value="creator">Creator</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
              type="password"
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
            <input
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: value => value === password || 'Passwords do not match'
              })}
              type="password"
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLoading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary-500 hover:text-primary-400">Login</Link>
        </p>
      </div>
    </div>
  );
}
