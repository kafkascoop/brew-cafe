"use client";

import { useState } from "react";
import Image from "next/image";
import { QrCode } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
}

interface MenuProps {
  data: {
    categories: string[];
    items: MenuItem[];
  };
}

export default function Menu({ data }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(data.categories[0]);

  const filteredItems = data.items.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-20 bg-cafe-beige/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area with QR Code */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground mb-4">
              Our Menu
            </h2>
            <p className="text-foreground/70 max-w-lg">
              Freshly brewed coffee and hand-crafted snacks to make your day better.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-background p-3 pl-5 rounded-2xl shadow-sm border border-cafe-brown/10">
            <div className="text-sm">
              <p className="font-semibold text-foreground">Scan to View Menu</p>
              <p className="text-foreground/60 text-xs">On your phone</p>
            </div>
            <div className="p-2 bg-cafe-cream dark:bg-cafe-brown rounded-xl">
              <QrCode className="w-10 h-10 text-foreground" />
            </div>
          </div>
        </div>

        {/* Categories Tab */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 custom-scrollbar">
          {data.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 font-medium ${
                activeCategory === cat
                  ? "bg-cafe-accent text-white shadow-md"
                  : "bg-background text-foreground hover:bg-cafe-cream dark:hover:bg-cafe-brown"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex justify-between items-center">
                <h3 className="text-xl font-bold font-outfit text-foreground">{item.name}</h3>
                <span className="text-lg font-bold text-cafe-accent bg-cafe-accent/10 px-3 py-1 rounded-full">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
