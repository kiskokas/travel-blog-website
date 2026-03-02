// components/DarkModeToggle.tsx
"use client";

import { useTheme } from "@/app/components/ThemeProvider";
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    // MÓDOSÍTÁS: bottom-10 és right-10 a szimmetria miatt
    <div className="fixed bottom-10 right-10 z-50 flex items-center"> 
      <button
        onClick={toggleDarkMode}
        className="relative inline-flex items-center h-6 rounded-full transition-colors duration-200 focus:outline-none"
        style={{ width: '3rem' }}
      >
        <span
          className={`absolute inset-0 rounded-full shadow-inner transition-colors duration-200 ${
            isDarkMode ? 'bg-white/20' : 'bg-black/20'
          } backdrop-blur-md border border-white/10`}
        />
        <span
          className={`absolute left-1 flex items-center justify-center w-4 h-4 rounded-full shadow transition-transform duration-200 ${
            isDarkMode ? 'transform translate-x-full bg-white text-black' : 'bg-black text-white'
          }`}
          style={{transitionProperty: 'transform', transitionDuration: '200ms'}}
        >
          {isDarkMode ? <FaMoon size={10} /> : <FaSun size={10} />}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;