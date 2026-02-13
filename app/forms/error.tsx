'use client';

export default function FormsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <p className="text-gray-600">{error.message}</p>
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}