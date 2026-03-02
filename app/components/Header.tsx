// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MotionLink = motion(Link);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const menuItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Gallery", href: "/#travel" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 flex justify-end items-center ${
        scrolled 
          ? "bg-black/70 backdrop-blur-md p-4 px-8" 
          : "bg-transparent p-8"
      }`}
    >
      {/* Desktop Nav - Jobbra igazítva */}
      <nav className="hidden md:flex space-x-10">
        {menuItems.map((item) => (
          <MotionLink
            key={item.name}
            href={item.href}
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
            whileHover={{ y: -1 }}
          >
            {item.name}
          </MotionLink>
        ))}
      </nav>

      {/* Mobile Toggle Button - Magasabb z-index, hogy a menü felett legyen */}
      <div className="md:hidden z-[110]">
        <button onClick={toggleMenu} className="focus:outline-none text-white p-2">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-2xl">
            {isOpen ? "✕" : "☰"}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay - Teljes képernyős fix fekete háttér */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 w-screen h-screen bg-black flex flex-col items-center justify-center space-y-8 z-[100]"
          >
             {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={toggleMenu}
                className="text-sm font-medium uppercase text-white tracking-[0.3em] hover:text-white/60 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;