import React from 'react';
import { useAppSelector } from '../store/store';

export default function DashboardPage() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <div className="min-h-screen bg-dark-950 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Creator Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Total Viewers</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Total Earnings</p>
            <p className="text-3xl font-bold mt-2">$0.00</p>
          </div>
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Active Streams</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm">Followers</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        <div className="mt-8 bg-dark-900 border border-dark-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Start Streaming</h2>
          <button className="bg-primary-500 hover:bg-primary-600 px-6 py-3 rounded-lg font-semibold">
            Go Live
          </button>
        </div>
      </div>
    </div>
  );
}
