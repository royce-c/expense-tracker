import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        <p className="text-gray-600 mb-8">
          Please wait while we load your data.
        </p>
        <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded inline-block">
          Loading...
        </div>
      </div>
    </div>
  );
}