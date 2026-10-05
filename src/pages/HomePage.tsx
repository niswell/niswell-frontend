import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/store';

export default function HomePage() {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="text-2xl font-bold text-primary-500">Niswell</div>
          <nav className="flex gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                <Link to="/" className="text-gray-300 hover:text-white">Streams</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                <Link to="/register" className="bg-primary-500 px-4 py-2 rounded hover:bg-primary-600">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-5xl font-bold">Live Streaming Platform</h1>
        <p className="mb-8 text-xl text-gray-300">Connect, stream, and monetize with Niswell</p>
        {!isAuthenticated && (
          <div className="flex justify-center gap-4">
            <Link to="/register?role=creator" className="bg-primary-500 px-8 py-3 rounded-lg hover:bg-primary-600 font-semibold">
              Become a Creator
            </Link>
            <Link to="/register?role=viewer" className="border border-primary-500 px-8 py-3 rounded-lg hover:bg-dark-800">
              Watch Streams
            </Link>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-dark-900 py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-dark-800 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">HD Streaming</h3>
            <p className="text-gray-300">Crystal clear video quality up to 1080p</p>
          </div>
          <div className="bg-dark-800 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Live Chat</h3>
            <p className="text-gray-300">Real-time interaction with your audience</p>
          </div>
          <div className="bg-dark-800 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Monetization</h3>
            <p className="text-gray-300">Earn through tips, subscriptions, and ads</p>
          </div>
        </div>
      </section>
    </div>
  );
}
