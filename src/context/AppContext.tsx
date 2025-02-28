"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface AppContextType {
  news: Article[];
  filteredNews: Article[];
  fetchNews: (category?: string) => Promise<void>;
  selectedCategory: string;
  handleSearch: (query: string) => void;
  loading: boolean;
  searchQuery: string;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [news, setNews] = useState<Article[]>([]);
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("latest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const CACHE_DURATION = 10 * 60 * 1000; 

  const fetchNews = async (category: string = "latest") => {
    setLoading(true);
    setError(null);
    const cacheKey = `news_${category}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { articles, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setNews(articles);
        setFilteredNews(articles);
        setSelectedCategory(category);
        setLoading(false);
        return;
      }
    }

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    if (category !== "latest") {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok" && Array.isArray(data.articles)) {
        setNews(data.articles);
        setFilteredNews(data.articles);
        setSelectedCategory(category);

        localStorage.setItem(cacheKey, JSON.stringify({ articles: data.articles, timestamp: Date.now() }));
      } else if (data.code === "rateLimited") {
        setError("You've hit the rate limit. Please try again later.");
      } else {
        setError("Failed to fetch news.");
      }
    } catch (error) {
      setError("Error fetching news. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.trim());

    if (!query.trim()) {
      setFilteredNews(news);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok" && Array.isArray(data.articles)) {
          setFilteredNews(data.articles);
        } else if (data.code === "rateLimited") {
          setError("Search limit exceeded. Try again later.");
        } else {
          setFilteredNews([]);
          setError("No results found.");
        }
      } catch (error) {
        setError("Error fetching search results.");
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <AppContext.Provider
      value={{
        news,
        filteredNews,
        fetchNews,
        selectedCategory,
        handleSearch,
        loading,
        searchQuery,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
