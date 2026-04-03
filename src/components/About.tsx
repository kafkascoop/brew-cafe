import Image from "next/image";

interface AboutProps {
  data: {
    title: string;
    content: string;
  };
}

export default function About({ data }: AboutProps) {
  return (
    <section id="about" className="py-20 bg-background overflow-hidden relative">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-cafe-orange/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-8 border-cafe-cream dark:border-cafe-brown">
              <Image
                src="/images/interior3.jpeg"
                alt="Brew Café Interior"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-2xl md:text-4xl font-bold font-outfit tracking-wider text-cafe-accent uppercase mb-6">{data.title}</h2>
            <p className="text-foreground/80 text-lg leading-relaxed mb-8">
              {data.content}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-cafe-accent text-cafe-accent hover:bg-cafe-accent hover:text-white font-medium rounded-full transition-colors duration-300"
            >
              Find Us
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
