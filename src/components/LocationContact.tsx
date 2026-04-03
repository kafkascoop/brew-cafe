"use client";

import { useState, useEffect } from "react";
import { Phone, MapPin as MapPinIcon, Clock } from "lucide-react";

interface LocationContactProps {
  data: {
    address: string;
    phone: string;
    openingHours: { open: string; close: string };
    mapEmbedUrl: string;
  };
}

export default function LocationContact({ data }: LocationContactProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Use IST time roughly or simple locale time since Rampurhat is in India
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      const openHour = parseInt(data.openingHours.open.split(":")[0]);
      const closeHour = parseInt(data.openingHours.close.split(":")[0]);

      // Simple time logic
      const isCurrentlyOpen =
        currentHour > openHour || (currentHour === openHour && currentMinute >= 0)
          ? currentHour < closeHour
          : false;

      setIsOpen(isCurrentlyOpen);

      setCurrentTimeStr(`${openHour > 12 ? openHour - 12 : openHour}:00 AM - ${closeHour > 12 ? closeHour - 12 : closeHour}:00 PM`);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [data.openingHours]);

  return (
    <section id="contact" className="py-20 bg-background border-t border-cafe-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
            Visit Us
          </h2>
          <p className="text-foreground/70 mt-4">
            We are located in the heart of Rampurhat. Drop by for a perfect brew.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-cafe-cream/30 dark:bg-cafe-brown/5 rounded-3xl p-4 sm:p-8">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm">
                <MapPinIcon className="w-6 h-6 text-cafe-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Address</h4>
                <p className="text-foreground/70">{data.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm">
                <Phone className="w-6 h-6 text-cafe-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Phone</h4>
                <p className="text-foreground/70">{data.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-cafe-brown rounded-2xl shadow-sm rounded-tl-sm">
                <Clock className="w-6 h-6 text-cafe-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg font-outfit text-foreground mb-1">Opening Hours</h4>
                <p className="text-foreground/70 mb-2">Today: {currentTimeStr}</p>
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                    isOpen
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                  }`}
                >
                  <span className="relative flex h-2 w-2">
                    {isOpen && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span
                      className={`relative inline-flex rounded-full h-2 w-2 ${
                        isOpen ? "bg-emerald-500" : "bg-rose-500"
                      }`}
                    ></span>
                  </span>
                  {isOpen ? "Open Now" : "Closed"}
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-80 lg:h-full min-h-[300px] w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-cafe-brown relative">
            <iframe
              src={data.mapEmbedUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
}
