"use client";

import { Wallet, Heart, MapPin } from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  data: Feature[];
}

export default function Features({ data }: FeaturesProps) {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Wallet":
        return <Wallet className="w-8 h-8 text-cafe-accent" />;
      case "Heart":
        return <Heart className="w-8 h-8 text-cafe-accent" />;
      case "MapPin":
        return <MapPin className="w-8 h-8 text-cafe-accent" />;
      default:
        return <MapPin className="w-8 h-8 text-cafe-accent" />;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((feature, index) => (
            <div
              key={index}
              className="bg-cafe-cream/50 dark:bg-cafe-beige/10 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 bg-cafe-beige/30 dark:bg-cafe-brown/40 rounded-full mb-4">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold font-outfit text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
