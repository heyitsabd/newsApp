"use client";
import { useAppContext } from "@/context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface NewsDetailProps {
  params: {
    id: string;
  };
}

const NewsDetail: React.FC<NewsDetailProps> = ({ params }) => {
  const { news } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const { theme } = useContext(ThemeContext);
  const currentPage = searchParams.get("page") || "1";

  const article = news[Number(params.id)];

  if (!article) {
    return (
      <div className="text-center mt-10 text-black dark:text-white bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">News not found</p>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[80%] lg:w-[60%] mx-auto my-10 bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg dark:shadow-gray-700">
      <button
        onClick={() => router.push(`/?page=${currentPage}`)}
        className="mb-4 px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-500 transition"
      >
        ← Back
      </button>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="News"
          className="w-full h-80 object-cover rounded-lg shadow-lg"
        />
      )}
      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <p className="text-gray-700 dark:text-gray-300 text-lg mt-2">{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
      >
        Read Full Article →
      </a>
    </div>
  );
};

export default NewsDetail;
