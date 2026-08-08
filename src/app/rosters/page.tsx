"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ROSTERS, type Roster } from "@/lib/rosters";

export default function RostersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"ALL" | "ACTIVE">("ACTIVE");

  const filteredRosters = useMemo(() => {
    return ROSTERS.filter((roster) => {
      // Status filter
      if (filter === "ACTIVE" && roster.status !== "ACTIVE") return false;

      // Search filter
      if (searchQuery.trim() === "") return true;

      const q = searchQuery.toLowerCase();
      const matchesName = roster.name.toLowerCase().includes(q);
      const matchesShort = roster.shortName.toLowerCase().includes(q);
      const matchesPlayer = roster.players.some((player) =>
        player.ign.toLowerCase().includes(q)
      );

      return matchesName || matchesShort || matchesPlayer;
    });
  }, [searchQuery, filter]);

  const totalPlayers = useMemo(
    () => ROSTERS.reduce((acc, roster) => acc + roster.players.length, 0),
    []
  );

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
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold tracking-widest text-muted uppercase">
                COMPETITIVE SCENE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              ACTIVE ROSTERS
            </h1>
            <p className="text-xl text-muted max-w-2xl leading-relaxed mb-8">
              Explore the teams currently competing across the Tamil Nadu Free Fire MAX competitive scene.
            </p>

            <div className="flex items-center gap-6 text-sm font-bold tracking-widest text-white/50 uppercase">
              <div className="flex items-center gap-2">
                <span className="text-white">{ROSTERS.length}</span> ACTIVE TEAMS
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-white">{totalPlayers}</span> PLAYERS
              </div>
            </div>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between gap-6 mb-12"
          >
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search teams or players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface border border-white/10 rounded-full py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter */}
            <div className="flex items-center p-1 bg-surface border border-white/10 rounded-full self-start">
              {(["ALL", "ACTIVE"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    filter === f
                      ? "bg-white text-black shadow-lg"
                      : "text-white/40 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Roster Directory */}
          {filteredRosters.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredRosters.map((roster) => (
                <div
                  key={roster.id}
                  className="group relative bg-[#111111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
                >
                  <div className="absolute -bottom-6 -right-2 text-[100px] md:text-[120px] font-black leading-none text-white/[0.02] group-hover:text-white/[0.04] group-hover:scale-105 transition-all duration-700 pointer-events-none select-none z-0">
                    {roster.shortName}
                  </div>

                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

                  <div className="p-6 relative z-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                      <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                        <Image
                          src={roster.logo}
                          alt={`${roster.name} logo`}
                          fill
                          className="object-contain"
                          sizes="64px"
                        />
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-bold tracking-widest text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        {roster.status}
                      </div>
                    </div>

                    <div className="mb-6 flex-grow">
                      <p className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">
                        {roster.shortName}
                      </p>
                      <h3 className="text-xl font-black tracking-tight text-white mb-6 group-hover:text-primary transition-colors duration-300">
                        {roster.name}
                      </h3>

                      <div className="mb-4 text-[10px] font-bold tracking-widest text-white/30 uppercase">
                        CURRENT ROSTER
                      </div>

                      <div className="flex flex-col">
                        {roster.players.map((player, idx) => (
                          <div
                            key={player.ign}
                            className="group/row flex items-center gap-4 py-2 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
                          >
                            <span className="text-[10px] font-mono font-bold text-white/20 group-hover/row:text-white/40 transition-colors">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm font-semibold tracking-wide text-white/70 group-hover/row:text-white transition-colors">
                              {player.ign}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
                        {roster.players.length} PLAYERS
                      </span>
                      <Link
                        href={`/rosters/${roster.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 group-hover:text-white transition-colors uppercase"
                      >
                        View Roster
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl bg-surface/50"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Search size={24} className="text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">NO ROSTERS FOUND</h3>
              <p className="text-muted max-w-sm">
                We couldn't find any teams or players matching your search. Try searching for another team or player.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
