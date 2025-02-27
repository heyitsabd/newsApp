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
  handleSearch: (query: string) => Promise<void>;
  loading: boolean;
  searchQuery: string;
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

  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const fetchNews = async (category: string = "latest") => {
    setLoading(true);

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    if (category !== "latest") {
      url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok" && Array.isArray(data.articles)) {
        setSelectedCategory(category);
        setNews(data.articles);
        setFilteredNews(data.articles);
      } else {
        console.error("Failed to fetch news:", data);
        setNews([]);
        setFilteredNews([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
      setFilteredNews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query.trim());

    if (!query.trim()) {
      fetchNews(selectedCategory);
      return;
    }

    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ok" && Array.isArray(data.articles)) {
        setFilteredNews(data.articles);
      } else {
        console.error("Failed to fetch search results:", data);
        setFilteredNews([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setFilteredNews([]);
    } finally {
      setLoading(false);
    }
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
