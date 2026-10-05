import React from 'react';

export default function StreamPage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Live Stream</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="bg-dark-900 aspect-video rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Video player coming soon</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-dark-900 rounded-lg p-4 h-96 overflow-y-auto">
              <h2 className="font-bold mb-4">Live Chat</h2>
              <p className="text-gray-400">Chat messages will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
