import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <Link to="/" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}
