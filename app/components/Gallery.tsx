"use client";

import { motion } from "framer-motion";
import { useState} from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Type definitions
type ImageData = {
  src: string;
  blurDataURL: string;
};

type Category = {
  name: string;
  images: ImageData[];
};

const Gallery = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (category: Category, index: number) => {
    setCurrentCategory(category);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <motion.div 
      className="container mx-auto px-4 pt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-center my-8 text-black"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Galéria
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.div
            id={category.name.toLowerCase()}
            key={category.name}
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(category, 0)}
          >
            <Image
              src={category.images[0].src}
              alt={category.name}
              width={300}
              height={200}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
              <h2 className="text-white text-2xl font-semibold">{category.name}</h2>
            </div>
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
              {category.images.length} photos
            </div>
          </motion.div>
        ))}
      </motion.div>
      {isOpen && currentCategory && (
        <Lightbox
          slides={currentCategory.images.map((image) => ({ src: image.src }))}
          open={isOpen}
          close={() => setIsOpen(false)}
          index={currentIndex}
          on={{ view: ({ index }) => setCurrentIndex(index) }}
          controller={{ closeOnBackdropClick: true }}
          render={{
            slide: ({ slide }) => (
              <div className="flex flex-col items-center">
                <div className="relative w-auto max-w-full max-h-[80vh] flex items-center justify-center">
                  <Image src={slide.src} alt="Gallery Image" width={800} height={600} className="max-w-full max-h-[80vh] object-contain" />
                </div>
                <div className="mt-4 flex justify-center w-full">
                  {currentCategory.images.map((_, index) => (
                    <span
                      key={index}
                      className={`h-3 w-3 rounded-full transition-colors mx-1 ${
                        index === currentIndex ? "bg-gray-500" : "bg-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>
              </div>
            )
          }}
        />
      )}
    </motion.div>
  );
};

export default Gallery;