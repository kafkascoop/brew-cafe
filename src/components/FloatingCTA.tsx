"use client";

import { Phone } from "lucide-react";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-5 right-5 z-50 animate-call-bounce flex">
      <a
        href="tel:+919339537315"
        className="flex items-center justify-center w-14 h-14 bg-cafe-accent text-white rounded-full shadow-lg shadow-cafe-accent/40 active:scale-95 hover:scale-110 transition-transform duration-300"
        aria-label="Call Brew Cafe"
      >
        <Phone className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
}
