"use client";

import { motion } from "framer-motion";

export default function SkillBadge({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="px-4 py-2 bg-foreground/5 border border-foreground/10 rounded-lg text-foreground/80 text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors text-center"
    >
      {skill}
    </motion.div>
  );
}
