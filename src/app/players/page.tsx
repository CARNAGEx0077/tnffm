"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROSTERS } from "@/lib/rosters";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Flatten players and attach team info for easy rendering/searching
  const allPlayers = ROSTERS.flatMap((roster) =>
    roster.players.map((player) => ({
      ...player,
      teamName: roster.name,
      teamShort: roster.shortName,
      status: roster.status,
    }))
  );

  const filteredPlayers = allPlayers.filter((player) => {
    const q = searchQuery.toLowerCase();
    return (
      player.ign.toLowerCase().includes(q) ||
      player.teamName.toLowerCase().includes(q) ||
      player.teamShort.toLowerCase().includes(q)
    );
  });

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
                MEET THE COMPETITIVE SCENE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 uppercase">
              PLAYERS
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed mb-12">
              Explore players currently competing across Tamil Nadu's Free Fire MAX ecosystem.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/30" />
              </div>
              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all uppercase tracking-wide text-sm font-semibold"
                placeholder="Search by Player IGN, Team, or Tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Player List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col border-t border-white/10"
          >
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, idx) => (
                <motion.div key={player.ign} variants={rowVariants}>
                  <Link
                    href={`/players/${player.slug}`}
                    className="group/row relative flex flex-col md:flex-row items-start md:items-center py-6 px-4 md:px-6 border-b border-white/5 hover:bg-white/[0.02] focus-visible:bg-white/[0.02] transition-colors duration-300 outline-none"
                  >
                    {/* Floating Image Preview — Desktop only */}
                    {player.image && (
                      <div className="hidden md:block absolute right-[10%] top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <div className="w-[140px] h-[170px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 bg-[#111111] opacity-0 scale-90 translate-y-2 group-hover/row:opacity-100 group-hover/row:scale-100 group-hover/row:translate-y-0 group-focus-visible/row:opacity-100 group-focus-visible/row:scale-100 group-focus-visible/row:translate-y-0 transition-all duration-300 ease-out">
                          <Image
                            src={player.image}
                            alt={player.ign}
                            fill
                            className="object-cover"
                            sizes="140px"
                          />
                          {/* Bottom gradient overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      </div>
                    )}

                    {/* Index */}
                    <div className="hidden md:block w-16 shrink-0 relative z-10">
                      <span className="text-sm font-mono font-bold text-white/20 group-hover/row:text-white/40 transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* IGN */}
                    <div className="w-full md:w-1/3 shrink-0 mb-2 md:mb-0 flex items-center gap-4 relative z-10">
                      <span className="text-xl md:text-2xl font-black tracking-wide text-white group-hover/row:text-primary transition-colors uppercase">
                        {player.ign}
                      </span>
                    </div>

                    {/* Team Tag */}
                    <div className="hidden md:block w-32 shrink-0 relative z-10">
                      <span className="text-sm font-bold tracking-widest text-white/40 uppercase group-hover/row:text-white/70 transition-colors">
                        {player.teamShort}
                      </span>
                    </div>

                    {/* Team Name */}
                    <div className="flex-1 shrink-0 mb-4 md:mb-0">
                      <span className="text-sm font-semibold tracking-wider text-white/50 uppercase group-hover/row:text-white/90 transition-colors">
                        {player.teamName}
                      </span>
                    </div>

                    {/* Status & Arrow */}
                    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 shrink-0">
                      <div className="inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold tracking-widest text-green-400 uppercase">
                          {player.status}
                        </span>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-white/20 group-hover/row:text-primary transition-all duration-300 group-hover/row:translate-x-2"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="py-20 text-center border-b border-white/5">
                <p className="text-lg text-white/40 font-semibold tracking-wide uppercase">
                  No players found matching "{searchQuery}"
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
