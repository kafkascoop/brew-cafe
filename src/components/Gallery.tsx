import Image from "next/image";

interface GalleryProps {
  data: string[];
}

export default function Gallery({ data }: GalleryProps) {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
            Moments at Brew Café
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            A sneak peek into our aesthetic ambiance and mouth-watering delicacies.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
          {data.map((src, index) => {
            // Create a pseudo masonry-like effect with differing aspect ratios
            const isWide = index === 0 || index === 3;
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl ${
                  isWide ? "col-span-2 md:col-span-2" : "col-span-1 md:col-span-1"
                } ${index % 2 === 0 ? "aspect-video" : "aspect-square"} md:aspect-auto md:h-72`}
              >
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
