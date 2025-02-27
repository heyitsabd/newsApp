"use client";

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center"
      aria-live="polite"
    >
      <h2 className="text-red-500 text-xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-600">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
