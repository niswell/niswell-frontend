import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Video, Edit2 } from 'lucide-react';

interface StreamSetupForm {
  title: string;
  description: string;
  isPrivate: boolean;
  allowChat: boolean;
  allowTips: boolean;
}

interface StreamSetupProps {
  onSubmit: (data: StreamSetupForm) => Promise<void>;
  isLoading?: boolean;
}

export default function StreamSetup({ onSubmit, isLoading = false }: StreamSetupProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<StreamSetupForm>({
    defaultValues: {
      title: 'My Live Stream',
      description: '',
      isPrivate: false,
      allowChat: true,
      allowTips: true,
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = async (data: StreamSetupForm) => {
    try {
      await onSubmit(data);
      setSubmitted(true);
    } catch (err) {
      console.error('Stream setup error:', err);
    }
  };

  return (
    <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Video className="text-primary-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Start Streaming</h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stream Title
          </label>
          <input
            {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
            type="text"
            className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            placeholder="What are you streaming about?"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            {...register('description')}
            className="w-full bg-dark-800 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            placeholder="Tell viewers what to expect"
            rows={4}
          />
        </div>

        {/* Privacy */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register('isPrivate')}
              type="checkbox"
              className="w-4 h-4 rounded bg-dark-800 border border-dark-600 cursor-pointer"
            />
            <span className="text-gray-300">Private stream (invite only)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register('allowChat')}
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded bg-dark-800 border border-dark-600 cursor-pointer"
            />
            <span className="text-gray-300">Allow live chat</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              {...register('allowTips')}
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded bg-dark-800 border border-dark-600 cursor-pointer"
            />
            <span className="text-gray-300">Allow viewer tips</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || submitted}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Edit2 size={18} />
          {isLoading ? 'Starting...' : submitted ? 'Stream Started!' : 'Go Live'}
        </button>

        {submitted && (
          <div className="bg-green-900/20 border border-green-600 text-green-200 px-4 py-3 rounded-lg text-sm">
            ✓ Stream started successfully! Share the link with your viewers.
          </div>
        )}
      </form>
    </div>
  );
}
