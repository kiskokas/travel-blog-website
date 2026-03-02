"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import TravelGallery from "@/app/components/TravelGallery";
// Importáljuk a pontos típust, amit a TravelGallery is használ
import type { TravelAlbum } from "@/app/lib/getTravelAlbums";

export default function TravelSectionClient({ albums }: { albums: TravelAlbum[] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="travel"
      className="py-24 px-10 bg-[#0a0a0a] scroll-mt-20"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase">
            Gallery
          </h2>

          <div className="w-20 h-1 bg-[#ff9d00] mx-auto mb-6"></div>

          <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto uppercase tracking-[0.15em] mb-4">
            A PLACE WHERE I COLLECT MY FAVORITE PICTURES FROM MY TRAVELS.
          </p>
        </div>

        {albums && albums.length > 0 ? (
          <TravelGallery albums={albums} />
        ) : (
          <div className="text-center text-white/50 bg-white/5 border border-white/10 rounded-3xl p-16">
            Még nincs feltöltött úticél.
          </div>
        )}
      </motion.div>
    </section>
  );
}