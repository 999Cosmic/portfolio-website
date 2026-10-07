"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceProps {
  role: string;
  company: string;
  date: string;
  index: number;
}

export default function ExperienceCard({ role, company, date, index }: ExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 pb-8 border-l border-foreground/10 last:border-transparent last:pb-0"
    >
      <div className="absolute left-[-17px] top-0 bg-background border border-primary text-primary p-1.5 rounded-full">
        <Briefcase size={16} />
      </div>
      <div>
        <h4 className="text-xl font-bold text-foreground">{role}</h4>
        <div className="text-primary font-medium mb-1">{company}</div>
        <div className="text-sm text-foreground/50">{date}</div>
      </div>
    </motion.div>
  );
}
