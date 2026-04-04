"use client";

import React, { useEffect, useState, useRef } from "react";
import { Smile, Utensils, ThumbsUp } from "lucide-react";

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}

const Counter = ({ end, duration = 2000, label, icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultDuration = duration;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / defaultDuration, 1);
            // Ease out quad
            const easeOutProgress = progress * (2 - progress);
            setCount(Math.floor(easeOutProgress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={counterRef} className="flex flex-col items-center justify-center p-8 bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-2xl shadow-sm border border-cafe-brown/5 dark:border-white/10 hover:-translate-y-1 hover:bg-white dark:hover:bg-white/10 hover:shadow-md dark:hover:shadow-none transition-all duration-300 ease-out group">
      <div className="p-4 bg-[#fbf9f6] dark:bg-black/20 rounded-full mb-5 text-cafe-brown dark:text-cafe-beige group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-outfit font-bold text-cafe-brown dark:text-white mb-2 tracking-tight">
        {count}+
      </div>
      <p className="text-gray-500 dark:text-gray-400 font-medium text-sm md:text-base uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function Statistics() {
  return (
    <section className="py-20 bg-[#fbf9f6] dark:bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Counter 
            end={500} 
            label="Guest Served" 
            icon={<Smile className="w-8 h-8" strokeWidth={1.5} />} 
          />
          <Counter 
            end={100} 
            label="Menu Item" 
            icon={<Utensils className="w-8 h-8" strokeWidth={1.5} />} 
          />
          <Counter 
            end={50} 
            label="Positive Review" 
            icon={<ThumbsUp className="w-8 h-8" strokeWidth={1.5} />} 
          />
        </div>
      </div>
    </section>
  );
}
