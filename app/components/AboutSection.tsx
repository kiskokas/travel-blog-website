// components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from 'next/image';

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section 
      id="about" 
      ref={ref}
      className="bg-[#0a0a0a] text-white py-24 md:py-40 px-6 md:px-20 lg:px-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* BAL OLDAL - Nagy címsor és Aláírás */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-5/12 flex flex-col justify-start"
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-12">
            Photography is the purest form of <span className="bg-[#ff9d00] text-black px-2 inline-block">storytelling</span> for me, wherever I go in the world.
          </h2>
          
          {/* Aláírás / Kézírásos név */}
          <div className="mt-4">
            <span className="font-serif italic text-4xl md:text-5xl text-white/90 tracking-tighter">
              Krisztián Photo Art
            </span>
          </div>
        </motion.div>

        {/* JOBB OLDAL - Szöveg, Kép, Szöveg */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:w-7/12 space-y-12"
        >
          {/* Felső bekezdés */}
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            As a photographer based in Louisville, KY, I travel not just for locations, but for feelings and unforgettable moments. Whether it's the rocky shores of Cyprus, the endless deserts of Oman, or the verdant slopes of Kentucky, my goal is always the same: to freeze time in a single frame.
          </p>

          {/* Középső nagy kép - Téglalap alakú, modern */}
          <div className="relative w-full aspect-[4/5] md:aspect-[16/10] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
            <Image 
              src="/images/cover_photo.png" 
              alt="Profilkép munka közben" 
              fill
              className="object-cover"
            />
          </div>

          {/* Alsó bekezdések */}
          <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
            <p>
              I believe that the play of <span className="text-white">light and shadow</span> speaks louder than words. In my work, I strive for minimalism and honesty, avoiding artificial settings. Each photo is a new chapter in my travel diary.
            </p>
            
            <p className="border-l border-white/20 pl-6 italic">
              "I don't use the camera, but my eyes and my heart. The camera is just a tool to record what I already see."
            </p>

            <p>
              Over the years, I have learned that the best images are created when we let the environment speak to us. Thank you for joining me on this visual journey.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;