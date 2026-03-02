"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import type { TravelAlbum } from "@/app/lib/getTravelAlbums";

function classNames(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

type FlatItem = {
  img: TravelAlbum["images"][number];
  albumSlug: string;
  indexInAlbum: number;
};

export default function TravelGallery({ albums }: { albums: TravelAlbum[] }) {
  const [active, setActive] = useState<string>(albums[0]?.slug ?? "all");
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxAlbumSlug, setLightboxAlbumSlug] = useState<string>(albums[0]?.slug ?? "");

  const visibleAlbums = useMemo(() => {
    if (active === "all") return albums;
    return albums.filter((a) => a.slug === active);
  }, [active, albums]);

  const allImages: FlatItem[] = useMemo(() => {
    return albums.flatMap((album) =>
      album.images.map((img, idx) => ({
        img,
        albumSlug: album.slug,
        indexInAlbum: idx,
      }))
    );
  }, [albums]);

  const lightboxAlbum = useMemo(
    () => albums.find((a) => a.slug === lightboxAlbumSlug) ?? albums[0],
    [albums, lightboxAlbumSlug]
  );

  const lightboxSlides = useMemo(() => {
    if (active === "all") {
      return allImages.map(({ img }) => ({ src: img.src }));
    }
    if (!lightboxAlbum) return [];
    return lightboxAlbum.images.map((image) => ({ src: image.src }));
  }, [active, allImages, lightboxAlbum]);

  const openLightboxFromAll = (flatIndex: number) => {
    setLightboxIndex(flatIndex);
    setIsOpen(true);
  };

  const openLightboxFromAlbum = (albumSlug: string, indexInAlbum: number) => {
    setLightboxAlbumSlug(albumSlug);
    setLightboxIndex(indexInAlbum);
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      {/* Szűrők */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button
          type="button"
          onClick={() => setActive("all")}
          className={classNames(
            "px-10 py-4 rounded-full border transition-all duration-300 text-sm tracking-wide uppercase",
            active === "all"
              ? "bg-white text-black border-white"
              : "bg-transparent text-white border-white/80 hover:border-white hover:bg-white/10"
          )}
        >
          All
        </button>

        {albums.map((album) => (
          <button
            key={album.slug}
            type="button"
            onClick={() => setActive(album.slug)}
            className={classNames(
              "px-10 py-4 rounded-full border transition-all duration-300 text-sm tracking-wide uppercase",
              active === album.slug
                ? "bg-white text-black border-white"
                : "bg-transparent text-white border-white/80 hover:border-white hover:bg-white/10"
            )}
          >
            {album.name}
          </button>
        ))}
      </div>

      {/* Grid nézet */}
      {active === "all" ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35 }}
        >
          {allImages.map(({ img }, flatIndex) => (
            <button
              key={`${flatIndex}:${img.src}`}
              type="button"
              className="relative group overflow-hidden rounded-xl bg-white/5"
              onClick={() => openLightboxFromAll(flatIndex)}
              aria-label={`Megnyitás: ${img.alt}`}
            >
              <div className="w-full aspect-[16/9] sm:aspect-[3/4]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={img.blurDataURL}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
          ))}
        </motion.div>
      ) : (
        <div className="space-y-14">
          {visibleAlbums.map((album) => (
            <section key={album.slug} id={album.slug} className="scroll-mt-28">
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
              >
                {album.images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    className="relative group overflow-hidden rounded-xl bg-white/5"
                    onClick={() => openLightboxFromAlbum(album.slug, idx)}
                    aria-label={`Megnyitás: ${img.alt}`}
                  >
                    <div className="w-full aspect-[16/9] sm:aspect-[3/4]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        placeholder="blur"
                        blurDataURL={img.blurDataURL}
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </motion.div>
            </section>
          ))}
        </div>
      )}

      {isOpen && (
        <Lightbox
          slides={lightboxSlides}
          open={isOpen}
          close={() => setIsOpen(false)}
          index={lightboxIndex}
          on={{ view: ({ index }) => setLightboxIndex(index) }}
          controller={{ closeOnBackdropClick: true }}
          plugins={[Thumbnails]}
          thumbnails={{ position: "bottom", width: 110, height: 70, gap: 10, border: 0 }}
        />
      )}
    </div>
  );
}