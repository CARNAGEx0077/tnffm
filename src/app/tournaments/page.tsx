"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TOURNAMENTS } from "@/lib/tournaments";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TournamentsPage() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow pt-32 pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold tracking-widest text-muted uppercase">
                COMPETITIVE SCENE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 uppercase">
              TOURNAMENTS
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed mb-8">
              Explore the premier Free Fire MAX championships, upcoming qualifiers, and elite scrims shaping the Tamil Nadu esports ecosystem.
            </p>

            <div className="flex items-center gap-6 text-sm font-bold tracking-widest text-white/50 uppercase">
              <div className="flex items-center gap-2">
                <span className="text-white">{TOURNAMENTS.length}</span> ACTIVE EVENTS
              </div>
            </div>
          </motion.div>

          {/* Tournament Directory */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-0 border-b border-white/10"
          >
            {TOURNAMENTS.map((tournament) => (
              <motion.div
                key={tournament.id}
                variants={rowVariants}
                className="group relative flex flex-col lg:flex-row items-stretch border-t border-white/10 hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Hover Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />

                {/* Editorial Index */}
                <div className="hidden lg:flex flex-col justify-between py-10 pr-8 w-24 shrink-0 border-r border-white/5">
                  <span className="text-3xl font-black text-white/20 group-hover:text-white/40 transition-colors duration-500">
                    {tournament.index}
                  </span>
                  <span
                    className="text-[9px] font-bold tracking-widest text-white/20 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    UPCOMING
                  </span>
                </div>

                {/* Tournament Image */}
                <div className="relative w-full lg:w-[38%] h-64 lg:h-auto overflow-hidden shrink-0">
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 bg-surface/50">
                    <Image
                      src={tournament.image}
                      alt={tournament.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    {/* Subtle dark gradient for text readability if needed on mobile */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                  </div>
                </div>

                {/* Tournament Content */}
                <div className="flex-1 py-8 lg:py-10 px-0 lg:px-12 flex flex-col justify-between">
                  <div>
                    {/* Status Indicator */}
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                        {tournament.status}
                      </span>
                    </div>

                    {/* Title & Organizer */}
                    <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-2 group-hover:translate-x-1 transition-transform duration-500">
                      {tournament.title}
                    </h3>
                    <p className="text-sm font-semibold tracking-wide text-white/40 uppercase mb-10">
                      HOSTED BY {tournament.organizer}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-8 lg:gap-16 mb-10">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                        PRIZE POOL
                      </p>
                      <p className="text-lg font-bold text-white">{tournament.prize}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                        REGISTRATION
                      </p>
                      <p className="text-lg font-bold text-white">
                        {tournament.registrationFee}
                      </p>
                    </div>
                    {tournament.teams && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                          TEAMS
                        </p>
                        <p className="text-lg font-bold text-white">{tournament.teams}</p>
                      </div>
                    )}
                    {tournament.format && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                          FORMAT
                        </p>
                        <p className="text-lg font-bold text-white">{tournament.format}</p>
                      </div>
                    )}
                    {tournament.date && (
                      <div>
                        <p className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-1">
                          DATE
                        </p>
                        <p className="text-lg font-bold text-white">{tournament.date}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div>
                    <Link
                      href={`/tournaments/${tournament.id}`}
                      className="inline-flex items-center gap-3 text-sm font-bold tracking-widest text-white hover:text-primary transition-colors uppercase group/cta relative"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/cta:translate-x-1"
                      />
                      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white/20 group-hover/cta:bg-primary/50 transition-colors" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
