import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ActiveRosters } from "@/components/ActiveRosters";
import { FeaturedTournament } from "@/components/FeaturedTournament";
import { Footer } from "@/components/Footer";
import fs from "fs";
import path from "path";

export default function Home() {
  // Read hero images automatically
  const heroImagesDir = path.join(process.cwd(), "public/images/hero");
  let heroImages: string[] = [];
  try {
    if (fs.existsSync(heroImagesDir)) {
      const files = fs.readdirSync(heroImagesDir);
      heroImages = files
        .filter((file) => /\.(jpg|jpeg|png|webp|avif)$/i.test(file))
        .map((file) => `/images/hero/${file}`);
    }
  } catch (error) {
    console.error("Failed to read hero images directory:", error);
  }

  // Fallback in case directory is missing or empty
  if (heroImages.length === 0) {
    heroImages = ["/images/hero/hero_1.png"];
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero images={heroImages} />
      <ActiveRosters />
      <FeaturedTournament />
      <Footer />
    </main>
  );
}
