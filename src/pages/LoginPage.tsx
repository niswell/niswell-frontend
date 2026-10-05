import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../store/store';
import { loginUser } from '../store/slices/authSlice';
import { LoginPayload } from '../types';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const onSubmit = async (data: LoginPayload) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-dark-900 border border-dark-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Login</h1>

        {error && (
          <div className="bg-red-900/20 border border-red-600 text-red-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              {...register('password', { required: 'Password is required' })}
              type="password"
              className="w-full bg-dark-800 border border-dark-600 rounded px-4 py-2 text-white focus:border-primary-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account? <Link to="/register" className="text-primary-500 hover:text-primary-400">Register</Link>
        </p>
      </div>
    </div>
  );
}
