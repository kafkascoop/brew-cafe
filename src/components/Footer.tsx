"use client";

import { Camera, MapPin } from "lucide-react";

interface FooterProps {
  data: {
    social: {
      instagram: string;
      google: string;
    };
  };
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-cafe-brown text-cafe-beige py-12 border-t border-cafe-brown/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-outfit font-bold text-white mb-2">Brew Café</h2>
            <p className="text-cafe-beige/70 dark:text-cafe-beige text-sm">
              Crafting memories, one cup at a time. Proudly serving Rampurhat.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href={data.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-cafe-accent transition-colors rounded-full text-white"
              aria-label="Instagram/Camera"
            >
              <Camera className="w-5 h-5" />
            </a>
            <a
              href={data.social.google}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/10 hover:bg-cafe-accent transition-colors rounded-full text-white flex items-center justify-center"
              aria-label="Google Maps"
            >
              <MapPin className="w-5 h-5" />
            </a>
          </div>
          
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-cafe-beige/50 dark:text-cafe-beige/90">
          <p>&copy; {new Date().getFullYear()} Brew Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
