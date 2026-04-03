import { Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
}

interface ReviewsProps {
  data: Review[];
}

export default function Reviews({ data }: ReviewsProps) {
  return (
    <section id="reviews" className="py-20 bg-cafe-beige/20 dark:bg-cafe-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-foreground">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-cafe-accent mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-background rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 relative border border-cafe-beige/20"
            >
              {/* Quote Mark Decoration */}
              <div className="absolute top-6 right-8 text-6xl text-cafe-accent/10 font-serif leading-none">
                "
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < item.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-foreground/80 leading-relaxed mb-6 italic relative z-10">
                "{item.review}"
              </p>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cafe-orange/20 flex items-center justify-center text-cafe-accent font-bold">
                  {item.name.charAt(0)}
                </div>
                <h4 className="font-bold font-outfit text-foreground">{item.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
