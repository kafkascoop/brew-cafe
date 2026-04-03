"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroProps {
  data: {
    title: string;
    tagline: string;
    slides: string[];
  };
}

export default function Hero({ data }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [data.slides.length]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-cafe-brown">
      {data.slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide}
            alt="Café background"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-20" />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-4 drop-shadow-md tracking-tight">
          {data.title}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl font-light drop-shadow-md tracking-wide">
          {data.tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#menu"
            className="px-8 py-3 bg-cafe-accent hover:bg-orange-600 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center"
          >
            View Menu
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center"
          >
            Visit Us
          </a>
        </div>
      </div>
    </section>
  );
}
