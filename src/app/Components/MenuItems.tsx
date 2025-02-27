import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import React from "react";

interface MenuItemsProps {
  isMobile: boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({ isMobile }) => {
  const { fetchNews, selectedCategory } = useAppContext();
  const router = useRouter();

  const categories: string[] = [
    "technology",
    "sports",
    "business",
    "entertainment",
    "health",
    "science",
  ];

  return (
    <nav
      className={`flex flex-wrap ${
        isMobile
          ? "space-3 p-4"
          : "items-center space-x-4 justify-center"
      }`}
    >
      {["latest", ...categories].map((category, index) => {
        const isSelected = selectedCategory === category;
        return (
          <div
            key={index}
            className={`cursor-pointer px-4 py-2 rounded-lg text-sm md:text-base lg:text-lg transition-all
              ${
                isSelected
                  ? "text-yellow-500 font-semibold"
                  : "text-gray-800 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
              }`}
            onClick={() => {
              fetchNews(category);
              router.push(`/?page=1`);
            }}
          >
            {category === "latest"
              ? "Trending"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        );
      })}
    </nav>
  );
};

export default MenuItems;
