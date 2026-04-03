interface OffersProps {
  data: {
    title: string;
    description: string;
  };
}

export default function Offers({ data }: OffersProps) {
  return (
    <section className="py-12 bg-cafe-accent text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute transform rotate-45 -top-24 -left-24 w-64 h-64 bg-white rounded-3xl" />
        <div className="absolute transform rotate-45 top-12 right-12 w-32 h-32 bg-white rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block px-3 py-1 bg-white text-cafe-accent uppercase tracking-widest text-xs font-bold rounded-full mb-4 shadow-sm">
          Special Offer
        </span>
        <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 drop-shadow-sm">
          {data.title}
        </h2>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light">
          {data.description}
        </p>
      </div>
    </section>
  );
}
