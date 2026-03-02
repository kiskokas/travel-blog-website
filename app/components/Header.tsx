// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';

const MotionLink = motion(Link);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Új állapot a görgetéshez

  // Görgetés figyelése
  useEffect(() => {
    const handleScroll = () => {
      // Ha 50 pixelnél többet görgettünk, bekapcsoljuk a hátteret
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
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Megakadályozzuk a görgetést, ha nyitva a menü
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
      className={`fixed w-full top-0 z-50 transition-all duration-300 flex justify-between items-center ${
        scrolled 
          ? "bg-black/70 backdrop-blur-md p-4 px-8" // Ha görgetünk: sötétebb háttér + elmosódás + kisebb padding
          : "bg-transparent p-8" // Alaphelyzet: átlátszó + nagyobb padding
      }`}
    >
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={130}
          height={40}
        />
      </Link>
      
      <nav className="hidden md:flex space-x-10">
        {menuItems.map((item) => (
          <MotionLink
            key={item.name}
            href={item.href}
            className="text-[11px] font-medium uppercase tracking-[0.2em] hover:text-white/70 transition-colors"
            whileHover={{ y: -1 }}
          >
            {item.name}
          </MotionLink>
        ))}
      </nav>

      <div className="md:hidden z-[60]">
        <button onClick={toggleMenu} className="focus:outline-none text-white">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-2xl">
          {isOpen ? "✕" : "☰"}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center space-y-8 z-50"
          >
             {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={toggleMenu}
                className="text-sm font-medium uppercase tracking-[0.3em]"
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