"use client";
import { useAppContext } from "@/context/AppContext";
import { useState, useContext, ChangeEvent } from "react";
import Link from "next/link";
import { LuSquareMenu } from "react-icons/lu";
import { IoCloseCircle } from "react-icons/io5";
import { ThemeContext } from "@/context/ThemeContext";
import CongratsPopUp from "./CongratsPopUp";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { handleSearch, fetchNews } = useAppContext();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
      setIsMenuOpen(false);
      setSearchQuery("");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <nav className="bg-gray-900 dark:bg-gray-800 px-5 py-4 shadow-md">
        <div className="flex justify-between items-center gap-5">
          <Link
            href="/"
            onClick={() => fetchNews("latest")}
            className="text-2xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition"
          >
            Newzzz...
          </Link>
          {/* Desktop Search Bar */}
          <div className="hidden md:flex w-[60vw] lg:w-[40vw] border border-gray-600 rounded-full overflow-hidden bg-white dark:bg-gray-700 items-center">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={handleInputChange}
              className="px-4 py-2 w-full text-black dark:text-white dark:bg-gray-700 focus:outline-none"
            />
            {searchQuery && (
              <IoCloseCircle
                className="text-gray-500 dark:text-gray-300 text-2xl cursor-pointer hover:text-gray-700 dark:hover:text-gray-400 mx-2"
                onClick={clearSearch}
              />
            )}
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500 transition"
            >
              Search
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition hidden md:block"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <button
            className="hidden md:block px-6 py-3 text-white font-semibold rounded-full 
             bg-gradient-to-r from-pink-500 to-red-600 shadow-lg shadow-red-500/50 
             transform transition-transform duration-300 hover:scale-105 hover:shadow-red-700/50"
            onClick={() => setIsPopupOpen(true)}
          >
            🔔 Subscribe
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isMenuOpen ? <IoCloseCircle /> : <LuSquareMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 text-center">
            <div className="flex w-full my-5 border border-gray-600 rounded-full overflow-hidden bg-white dark:bg-gray-700 items-center">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={handleInputChange}
                className="px-4 py-2 w-full text-black dark:text-white dark:bg-gray-700 focus:outline-none"
              />
              {searchQuery && (
                <IoCloseCircle
                  className="text-gray-500 dark:text-gray-300 text-2xl cursor-pointer hover:text-gray-700 dark:hover:text-gray-400 mx-2"
                  onClick={clearSearch}
                />
              )}
              <button
                onClick={handleSearchClick}
                className="px-4 py-2 bg-gray-800 dark:bg-gray-600 text-white hover:bg-gray-700 dark:hover:bg-gray-500 transition"
              >
                Search
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 dark:text-white shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full"
            >
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>
            <button
              className="px-6 py-3 w-full text-white font-semibold rounded-full 
             bg-gradient-to-r from-pink-500 to-red-600 shadow-md shadow-red-500/50 
             transform transition-transform duration-300 hover:scale-105 hover:shadow-red-700/50"
              onClick={() => setIsPopupOpen(true)}
            >
              🔔 Subscribe Now
            </button>
          </div>
        )}
      </nav>
      {isPopupOpen && <CongratsPopUp onClose={() => setIsPopupOpen(false)} />}
    </>
  );
};

export default Navbar;
