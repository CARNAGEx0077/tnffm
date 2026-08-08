"use client";

import { motion } from "framer-motion";
import { Network, Swords, TrendingUp } from "lucide-react";

const features = [
  {
    title: "Community",
    description: "Building Tamil Nadu's strongest Free Fire MAX ecosystem, connecting players across all districts.",
    icon: Network,
  },
  {
    title: "Competition",
    description: "Connecting players with high-stakes tournaments, scrims, and regular competitive matches.",
    icon: Swords,
  },
  {
    title: "Growth",
    description: "Supporting players, teams, and organizers with the tools they need to go professional.",
    icon: TrendingUp,
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Why TNFFM?</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We provide everything needed to elevate your Free Fire MAX journey from casual gaming to competitive excellence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2 z-0" />

          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center p-8 bg-background border border-border rounded-3xl hover:border-primary/50 transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,59,48,0.2)] transition-all duration-300">
                  <Icon size={32} className="text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
