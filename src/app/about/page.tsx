"use client";

import { motion, type Variants } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col overflow-hidden">
      <Navbar />

      {/* 1. INTRODUCTION */}
      <section className="relative pt-40 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 border-b border-white/5">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerVariants}
            className="max-w-4xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span className="text-xs font-bold tracking-widest text-primary uppercase">
                ABOUT TNFFM
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-8">
              BUILT FOR <br />
              <span className="text-white/40">THE TAMIL NADU SCENE.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl font-medium tracking-wide text-white/60 max-w-2xl leading-relaxed">
              TNFFM is a community-driven platform for the Tamil Nadu Free Fire MAX esports scene — bringing players, teams and tournaments together in one place.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. WHAT YOU CAN FIND ON TNFFM */}
      <section className="py-20 md:py-24 px-6 md:px-12 border-b border-white/5 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mb-12">
              WHAT YOU'LL FIND HERE.
            </motion.h2>

            <div className="space-y-2">
              <motion.div variants={itemVariants} className="group flex flex-col md:flex-row md:items-start justify-between py-6 border-b border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <span className="text-[10px] font-bold tracking-widest text-white/30 transition-colors group-hover:text-primary">01 — </span>
                  <h3 className="text-xl font-black tracking-tight text-white uppercase transition-colors group-hover:text-primary">PLAYERS</h3>
                </div>
                <p className="text-white/60 font-medium md:max-w-md md:text-right">
                  Player profiles and competitive information.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="group flex flex-col md:flex-row md:items-start justify-between py-6 border-b border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <span className="text-[10px] font-bold tracking-widest text-white/30 transition-colors group-hover:text-primary">02 — </span>
                  <h3 className="text-xl font-black tracking-tight text-white uppercase transition-colors group-hover:text-primary">TEAMS</h3>
                </div>
                <p className="text-white/60 font-medium md:max-w-md md:text-right">
                  Active rosters and team profiles.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="group flex flex-col md:flex-row md:items-start justify-between py-6 border-b border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <span className="text-[10px] font-bold tracking-widest text-white/30 transition-colors group-hover:text-primary">03 — </span>
                  <h3 className="text-xl font-black tracking-tight text-white uppercase transition-colors group-hover:text-primary">TOURNAMENTS</h3>
                </div>
                <p className="text-white/60 font-medium md:max-w-md md:text-right">
                  Upcoming tournaments hosted by Tamil Nadu organizers.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="group flex flex-col md:flex-row md:items-start justify-between py-6 border-b border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-2 md:mb-0">
                  <span className="text-[10px] font-bold tracking-widest text-white/30 transition-colors group-hover:text-primary">04 — </span>
                  <h3 className="text-xl font-black tracking-tight text-white uppercase transition-colors group-hover:text-primary">NEWS & UPDATES</h3>
                </div>
                <p className="text-white/60 font-medium md:max-w-md md:text-right">
                  Important developments from the local competitive scene.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. WHO IS BEHIND TNFFM */}
      <section className="py-20 md:py-24 px-6 md:px-12 border-b border-white/5 relative bg-white/[0.01]">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase mb-16">
              THE PEOPLE BEHIND TNFFM.
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-full aspect-square bg-surface/50 border border-white/5 rounded-2xl mb-6 relative overflow-hidden" />
                <h3 className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">FOUNDER / CREATOR</h3>
                <h4 className="text-xl font-black tracking-tight text-white uppercase mb-3">[YOUR NAME]</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed">Responsible for the creation and direction of TNFFM.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-full aspect-square bg-surface/50 border border-white/5 rounded-2xl mb-6 relative overflow-hidden" />
                <h3 className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">SITE MANAGEMENT</h3>
                <h4 className="text-xl font-black tracking-tight text-white uppercase mb-3">[NAME / TEAM]</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed">Responsible for maintaining and managing the platform.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col">
                <div className="w-full aspect-square bg-surface/50 border border-white/5 rounded-2xl mb-6 relative overflow-hidden" />
                <h3 className="text-[10px] font-bold tracking-widest text-primary uppercase mb-2">COMMUNITY / CONTENT</h3>
                <h4 className="text-xl font-black tracking-tight text-white uppercase mb-3">[NAME / TEAM]</h4>
                <p className="text-white/50 text-sm font-medium leading-relaxed">Responsible for keeping the platform updated with players, teams and tournaments.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. BUILT BY / CONTACT */}
      <section className="py-20 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerVariants}
            className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start"
          >
            <motion.div variants={itemVariants} className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
                BUILT WITH THE SCENE IN MIND.
              </h2>
              <p className="text-lg text-white/60 font-medium leading-relaxed">
                TNFFM is an independent community project created to make the Tamil Nadu Free Fire MAX competitive scene easier to discover and follow.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:mt-2">
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">BUILT BY</h3>
                <p className="text-sm font-bold text-white uppercase">[CREATOR NAME]</p>
              </div>
              
              <div>
                <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">MANAGED BY</h3>
                <p className="text-sm font-bold text-white uppercase">[MANAGER / TEAM NAME]</p>
              </div>
              
              <div className="sm:col-span-2">
                <h3 className="text-[10px] font-bold tracking-widest text-white/30 uppercase mb-2">CONTACT</h3>
                <a href="https://chat.whatsapp.com/LCP24W7GlhM40bIL3ey29R" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-primary hover:text-white transition-colors uppercase">
                  WHATSAPP COMMUNITY
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
