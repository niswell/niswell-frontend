import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/store';
import StreamSetup from '../components/Dashboard/StreamSetup';
import { DefaultAnalytics } from '../components/Dashboard/AnalyticsPanel';
import { setActiveStream, setIsStreaming } from '../store/slices/streamSlice';
import { Settings } from 'lucide-react';

export default function DashboardPage() {
  const user = useAppSelector(state => state.auth.user);
  const isStreaming = useAppSelector(state => state.stream.isStreaming);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartStream = async (data: any) => {
    setIsLoading(true);
    try {
      // TODO: Call API to start stream
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/streams/start`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${accessToken}`
      //   },
      //   body: JSON.stringify(data)
      // });
      // const result = await response.json();
      // dispatch(setActiveStream(result.stream));

      // Mock stream creation
      const mockStream = {
        id: 'stream-' + Date.now(),
        title: data.title,
        description: data.description,
        status: 'live' as const,
        creatorProfileId: user?.userId || '',
        creatorName: user?.displayName || 'Streamer',
        startedAt: new Date(),
        viewerCount: 0,
        peakViewerCount: 0,
        isPrivate: data.isPrivate,
        createdAt: new Date(),
      };

      dispatch(setActiveStream(mockStream));
      dispatch(setIsStreaming(true));

      // Redirect to stream page would happen here
      // navigate(`/stream/${mockStream.id}`);
    } catch (error) {
      console.error('Failed to start stream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-700 px-4 py-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Creator Dashboard</h1>
          <p className="text-gray-400">Manage your streams and earnings</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Status Alert */}
        {isStreaming && (
          <div className="mb-6 bg-green-900/20 border border-green-600 text-green-200 px-4 py-3 rounded-lg flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            You're currently streaming!
          </div>
        )}

        {/* Analytics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings size={24} />
            Your Statistics
          </h2>
          <DefaultAnalytics />
        </div>

        {/* Stream Setup */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Settings size={24} />
            Stream Configuration
          </h2>
          <StreamSetup onSubmit={handleStartStream} isLoading={isLoading} />
        </div>

        {/* Recent Streams */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Recent Streams</h2>
          <div className="bg-dark-900 border border-dark-700 rounded-lg p-6">
            <p className="text-gray-400 text-center py-8">No streams yet. Start your first stream above!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
