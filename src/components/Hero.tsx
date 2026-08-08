"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero({ images = ["/images/hero/hero_1.png"] }: { images?: string[] }) {
  const [isDesktop, setIsDesktop] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    setPrefersReducedMotion(mediaQuery.matches);
    handleResize();
    
    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", (e) => setPrefersReducedMotion(e.matches));
    
    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", () => {});
    };
  }, []);

  // Cinematic Slideshow Auto-Advance
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per image
    return () => clearInterval(interval);
  }, [images.length]);

  // Subtle Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || prefersReducedMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 60; // Very subtle (4-8px)
    const y = (clientY - top - height / 2) / 60;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Parallax transforms
  const bgX = useTransform(smoothX, [0, 1], [0, 1]);
  const bgY = useTransform(smoothY, [0, 1], [0, 1]);
  const contentX = useTransform(smoothX, [0, 1], [0, -0.5]);
  const contentY = useTransform(smoothY, [0, 1], [0, -0.5]);

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center pt-24 pb-20 overflow-hidden bg-[#080808]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Photography Slideshow */}
      <motion.div
        style={(!isDesktop || prefersReducedMotion) ? {} : { x: bgX, y: bgY }}
        className="absolute -inset-[2%] z-0"
      >
        {images.map((src, index) => {
          const isActive = index === currentImageIndex;
          return (
            <motion.div
              key={src}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive && !prefersReducedMotion ? 1.02 : 1,
                zIndex: isActive ? 10 : 0
              }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 6, ease: "linear" },
                zIndex: { delay: isActive ? 0 : 1.5 }
              }}
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {/* Force loading all images to prevent blank frames */}
              <img
                src={src}
                alt={`TNFFM Cinematic Esports Event ${index + 1}`}
                className="w-full h-full object-cover object-[65%_center] md:object-center"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Cinematic Overlays (Stable over the changing images) */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {/* Film grain texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Subtle red cinematic tint */}
        <div className="absolute inset-0 bg-primary/5 mix-blend-color-burn" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#080808]/40" style={{ background: "radial-gradient(circle, transparent 40%, #080808 110%)" }} />
        
        {/* Strong left gradient for typography readability against ANY image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 lg:via-[#080808]/60 to-transparent" />
        
        {/* Smooth bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-[25vh] bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent" />
      </div>

      {/* Giant Background Watermark */}
      <motion.div 
        style={(!isDesktop || prefersReducedMotion) ? {} : { x: contentX, y: contentY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[16] pointer-events-none select-none"
      >
        <span className="text-[15rem] md:text-[25rem] font-black tracking-tighter text-white/5 whitespace-nowrap">
          TNFFM
        </span>
      </motion.div>

      {/* Hero Content (Completely Stable) */}
      <div className="container mx-auto px-6 md:px-12 md:pl-24 relative z-[20] w-full">
        <motion.div 
          style={(!isDesktop || prefersReducedMotion) ? {} : { x: contentX, y: contentY }}
          className="max-w-3xl"
        >
          {/* Label Badge */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-[pulse_3s_ease-in-out_infinite]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-white/90 uppercase">
              TAMIL NADU'S FREE FIRE MAX COMMUNITY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.05] mb-8 drop-shadow-2xl">
              <span className="block text-white mb-2">THE HOME OF</span>
              <span className="block text-white mb-2">TAMIL NADU</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary inline-block drop-shadow-lg">
                FREE FIRE MAX
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-xl leading-[1.7] drop-shadow-md font-medium"
          >
            Bringing together players, teams, tournament organizers, creators, and fans under one platform to grow the competitive Free Fire MAX ecosystem across Tamil Nadu.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-5"
          >
            <Link
              href="#explore"
              className="group inline-flex h-14 w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-primary px-8 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,59,48,0.3)]"
            >
              Explore TNFFM
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#join"
              className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#111111]/60 backdrop-blur-md border border-white/10 px-8 text-base font-medium text-white transition-all duration-300 hover:bg-[#222222]/80 hover:border-white/20"
            >
              Join Community
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Slideshow Progress Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-10 right-6 md:right-12 flex items-center gap-2 z-[25] pointer-events-none">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${
                index === currentImageIndex 
                  ? "bg-white scale-125 opacity-100" 
                  : "bg-white/20 opacity-50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[25] pointer-events-none"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
          Scroll to explore
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40"
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
