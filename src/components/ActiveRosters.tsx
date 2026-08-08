"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ROSTERS = [
  {
    id: "narikootam-gamerz",
    shortName: "NKG",
    name: "NARIKOOTAM GAMERZ",
    logo: "/images/team_logo/nkg_Esports.png",
    status: "ACTIVE",
    players: ["NKG.ALEEM", "NKG.RAJESH", "NKG.SCRIPT", "NKG.HYPER", "NKG.MANI"],
  },
  {
    id: "pvs-gaming",
    shortName: "PVS",
    name: "PVS GAMING",
    logo: "/images/team_logo/pvs_gaming.png",
    status: "ACTIVE",
    players: ["PVS.KHONSU", "PVS.YOGESH", "PVS.NOBITA", "PVS.SCRIPT", "PVS.KRISH"],
  },
  {
    id: "ruthless-esports",
    shortName: "RE",
    name: "RUTHLESS ESPORTS",
    logo: "/images/team_logo/rutheless_esports.png",
    status: "ACTIVE",
    players: ["RE.THAKU", "RE.KUTTY", "RE.AKILJR", "RE.BELIKESR", "RE.KS07"],
  },
  {
    id: "rk-esports",
    shortName: "RK",
    name: "RK ESPORTS",
    logo: "/images/team_logo/rk_esports.png",
    status: "ACTIVE",
    players: ["RK.ODIN", "RK.FLASH", "RK.LIYON", "RK.SINGAM"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function ActiveRosters() {
  return (
    <section className="py-24 bg-background border-t border-border/50 overflow-hidden" id="rosters">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-bold tracking-widest text-muted uppercase">
                COMPETITIVE SCENE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              WHO'S COMPETING?
            </h2>
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              Explore the active rosters shaping Tamil Nadu's Free Fire MAX competitive scene.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="hidden lg:block mt-8"
          >
            <Link
              href="/rosters"
              className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white hover:text-primary transition-colors"
            >
              VIEW ALL ACTIVE ROSTERS
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {ROSTERS.map((roster) => (
            <motion.div
              key={roster.id}
              variants={itemVariants}
              className="group relative bg-[#111111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50"
            >
              {/* Giant background abbreviation watermark */}
              <div className="absolute -bottom-6 -right-2 text-[100px] md:text-[120px] font-black leading-none text-white/[0.02] group-hover:text-white/[0.04] group-hover:scale-105 transition-all duration-700 pointer-events-none select-none z-0">
                {roster.shortName}
              </div>

              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

              <div className="p-6 relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  {/* Team Logo */}
                  <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                    <Image
                      src={roster.logo}
                      alt={`${roster.name} logo`}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                  
                  {/* Status Badge */}
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

                  <div className="flex flex-col">
                    {roster.players.map((player, idx) => (
                      <div 
                        key={player} 
                        className="group/row flex items-center gap-4 py-2 px-2 -mx-2 rounded-lg transition-colors duration-200 hover:bg-white/5"
                      >
                        <span className="text-[10px] font-mono font-bold text-white/20 group-hover/row:text-white/40 transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold tracking-wide text-white/70 group-hover/row:text-white transition-colors">
                          {player}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-4">
                  <Link
                    href={`/rosters/${roster.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/40 group-hover:text-white transition-colors uppercase"
                  >
                    View Roster
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-12 lg:hidden flex justify-center"
        >
          <Link
            href="/rosters"
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white hover:text-primary transition-colors"
          >
            VIEW ALL ACTIVE ROSTERS
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
