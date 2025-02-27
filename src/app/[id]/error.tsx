"use client";

interface ArticleErrorProps {
  error: Error;
  reset: () => void;
}

export default function ArticleError({ error, reset }: ArticleErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-red-500 text-xl font-semibold">Failed to load the article!</h2>
      <p className="text-gray-600">{error?.message || "An unexpected error occurred while fetching this article."}</p>
      <div className="mt-4">
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition"
        >
          Reload Article
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
