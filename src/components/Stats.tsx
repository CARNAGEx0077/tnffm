"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { label: "Players", value: "2500+", suffix: "" },
  { label: "Teams", value: "180+", suffix: "" },
  { label: "Tournaments", value: "75+", suffix: "" },
  { label: "Prize Pool", value: "10L+", prefix: "₹" },
];

export function Stats() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section id="stats" className="py-20 relative border-y border-border/50 bg-surface/30">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-border/0 md:divide-border/50"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center md:px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter"
              >
                <span className="text-primary">{stat.prefix}</span>
                {stat.value}
                <span className="text-primary">{stat.suffix}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-muted font-medium uppercase tracking-widest text-sm"
              >
                {stat.label}
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
