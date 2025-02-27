"use client";
import { useState, useEffect, useContext } from "react";
import NewsComp from "./Components/NewsComp";
import MenuItems from "./Components/MenuItems";
import { ThemeContext } from "@/context/ThemeContext";

export default function Home() {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); 
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  useEffect(() => {
    const updateMobileView = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    updateMobileView();
    window.addEventListener("resize", updateMobileView);
    return () => window.removeEventListener("resize", updateMobileView);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 dark:bg-gray-900">
        <h2 className="text-red-500 text-xl font-semibold">Something went wrong!</h2>
        <button
          onClick={() => setHasError(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">
      <MenuItems isMobile={isMobile} />
      <NewsComp />
    </div>
  );
}
