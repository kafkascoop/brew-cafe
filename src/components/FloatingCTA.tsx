"use client";

import { useState, useEffect } from "react";
import { Coffee } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA only if scrolled past a certain point e.g., the hero section
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 md:hidden transition-all duration-500 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <a
        href="#menu"
        className="flex items-center gap-2 px-6 py-4 bg-cafe-accent text-white font-medium rounded-full shadow-2xl shadow-cafe-accent/40 active:scale-95 transition-transform"
      >
        <Coffee className="w-5 h-5" />
        <span>View Menu</span>
      </a>
    </div>
  );
}
