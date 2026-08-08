"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, Trophy, ChevronRight } from "lucide-react";

export function FeaturedTournament() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Tournament</h2>
            <p className="text-muted text-lg max-w-xl">
              Compete against the best teams in Tamil Nadu for glory and massive prize pools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="#tournaments"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-white transition-colors"
            >
              View all tournaments
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border bg-surface overflow-hidden group"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-5 h-full">
            {/* Banner Side */}
            <div className="lg:col-span-3 relative h-64 md:h-auto bg-card overflow-hidden">
              {/* Placeholder image representation */}
              <div className="absolute inset-0 bg-gradient-to-br from-surface to-background flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 backdrop-blur-sm z-10 group-hover:scale-110 transition-transform duration-700">
                  <Trophy size={48} className="text-primary opacity-80" />
                </div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-muted/50">BANNER PLACEHOLDER</div>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-surface relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold tracking-wider uppercase w-max mb-6">
                Coming Soon
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-muted transition-all">
                TNFFM Community Cup
              </h3>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                    <Trophy className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Prize Pool</div>
                    <div className="text-xl font-bold">₹50,000</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Teams</div>
                    <div className="text-xl font-bold">48</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center">
                    <Calendar className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-muted mb-1">Date</div>
                    <div className="text-xl font-bold">Coming Soon</div>
                  </div>
                </div>
              </div>

              <Link
                href="#learn-more"
                className="w-full h-14 inline-flex items-center justify-center rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
