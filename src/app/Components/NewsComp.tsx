"use client";
import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingAnimation from "./LoadingAnimation";
import { FaNewspaper } from "react-icons/fa";
import Image from "next/image";

function NewsComp() {
  const { filteredNews, fetchNews, selectedCategory } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageFromURL = Number(searchParams.get("page")) || 1;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredNews.length === 0) {
      setLoading(true);
      fetchNews(selectedCategory).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [selectedCategory]);

  const itemsPerPage = 6;
  const totalPages = useMemo(() => Math.ceil(filteredNews.length / itemsPerPage), [filteredNews]);

  const startIndex = (pageFromURL - 1) * itemsPerPage;
  const displayedNews = useMemo(() => filteredNews.slice(startIndex, startIndex + itemsPerPage), [filteredNews, pageFromURL]);

  const handlePageChange = (newPage:number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/?page=${newPage}`);
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto my-5">
      <h1 className="text-2xl font-bold text-center mb-6 capitalize text-gray-900 dark:text-gray-100">
        {selectedCategory === "latest" ? "Trending News" : `${selectedCategory} News`}
      </h1>

      {loading ? (
        <LoadingAnimation />
      ) : filteredNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 mt-10">
          <FaNewspaper className="text-6xl mb-3 text-gray-400 dark:text-gray-500" />
          <p className="text-lg font-semibold">No news found for "{selectedCategory}"</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Try a different category or check back later.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNews.map((article:any, index:any) => {
              const globalIndex = startIndex + index;
              return (
                <div
                  key={globalIndex}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-[0px_4px_10px_rgba(255,255,0,0.5)] overflow-hidden cursor-pointer transition"
                  onClick={() => router.push(`/${globalIndex}?page=${pageFromURL}`)}
                >
                  {article.urlToImage && (
                    <img src={article.urlToImage} alt="News" className="w-full h-40 object-cover" />
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{article.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">{article.description}</p>
                    <span className="mt-4 inline-block text-blue-600 dark:text-yellow-400 font-semibold hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => handlePageChange(pageFromURL - 1)}
                disabled={pageFromURL === 1}
                className={`px-4 py-2 rounded-lg ${
                  pageFromURL === 1
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800 dark:bg-yellow-600 text-white hover:bg-gray-700 dark:hover:bg-yellow-500 transition"
                }`}
              >
                Previous
              </button>
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Page {pageFromURL} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pageFromURL + 1)}
                disabled={pageFromURL === totalPages}
                className={`px-4 py-2 rounded-lg ${
                  pageFromURL === totalPages
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-gray-800 dark:bg-yellow-600 text-white hover:bg-gray-700 dark:hover:bg-yellow-500 transition"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default NewsComp;
