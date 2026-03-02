// components/HomeSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const HomeSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isFollowHovered, setIsFollowHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.pageYOffset;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- ITT TUDOD SZERKESZTENI A LINKEKET ---
  // Ha törölni akarsz, csak töröld ki az adott { name: ... } sort.
  // Az url: "#" helyére írd be a saját linkedet.
  const socialLinks = [
    { name: "Fb", color: "hover:bg-[#4267B2]", url: "https://www.facebook.com/share/1GDLzfESGM/?mibextid=wwXIfr" },
    { name: "Ig", color: "hover:bg-[#E1306C]", url: "https://www.instagram.com/krisztian_photoart" },
    { name: "in", color: "hover:bg-[#0077B5]", url: "https://www.linkedin.com/in/krisztian-nagy-b12700211" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative h-screen overflow-hidden"
    >
      <div
        id="home"
        className="hero h-screen bg-cover bg-center flex items-end justify-center relative pb-32" 
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        ref={heroRef}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Szöveg rész */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white drop-shadow-2xl tracking-tight uppercase">
            Krisztian Nagy
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/80 font-light tracking-[0.2em] uppercase">
            Engineer • Photographer • Softwer Developer • Traveller
          </p>
          <Link
            href="#travel"
            className="border border-white/40 bg-white/10 backdrop-blur-md text-white font-medium py-3 px-8 rounded-full transition-all hover:bg-white hover:text-black inline-block uppercase text-xs tracking-widest"
          >
            Gallery
          </Link>
        </div>

        {/* FOLLOW RÉSZ */}
        <div 
          className="absolute bottom-10 left-10 z-20 flex items-center h-10"
          onMouseEnter={() => setIsFollowHovered(true)}
          onMouseLeave={() => setIsFollowHovered(false)}
        >
          <div className="flex items-center cursor-pointer group">
            {/* Fehér kör a plusz jelnek */}
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full mr-3 text-black shadow-lg transition-transform group-hover:scale-110">
              <span className="text-lg font-bold">+</span>
            </div>
            <span className="text-white text-sm font-bold uppercase tracking-widest mr-6 drop-shadow-md">Follow</span>
          </div>

          <AnimatePresence>
            {isFollowHovered && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex space-x-3"
              >
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank" // Új lapon nyílik meg
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-[11px] font-bold transition-all duration-300 ${social.color} hover:border-transparent hover:scale-110 shadow-lg`}
                  >
                    {social.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSection;