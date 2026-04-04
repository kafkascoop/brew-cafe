import fs from "fs";
import path from "path";

// Components
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Statistics from "@/components/Statistics";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  // Read Data
  const dataFilePath = path.join(process.cwd(), "src", "data", "data.json");
  const dataFileContents = fs.readFileSync(dataFilePath, "utf8");
  const data = JSON.parse(dataFileContents);

  return (
    <>
      <Navbar />
      
      <main className="flex min-h-screen flex-col w-full overflow-x-hidden pt-16">
        <Hero data={data.hero} />
        <Features data={data.features} />
        <About data={data.about} />
        <Menu data={data.menu} />
        <Reviews data={data.reviews} />
        <Gallery data={data.gallery} />
        <Statistics />
        <ContactSection data={data.contact} />
      </main>
      
      <Footer data={{ social: data.contact.social }} />
      <FloatingCTA />
    </>
  );
}
