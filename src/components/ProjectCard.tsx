"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectProps {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  githubUrl: string;
  liveUrl: string;
  index: number;
  onTagClick?: (tag: string) => void;
}

export default function ProjectCard({ title, description, tech, highlights, githubUrl, liveUrl, index, onTagClick }: ProjectProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-2xl p-8 glow-effect hover:border-[var(--color-card-border-hover)] flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-primary text-sm font-medium">{description}</p>
        </div>
        <div className="flex gap-3">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
              <FaGithub size={20} />
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      
      <ul className="space-y-2 mb-6 flex-grow">
        {highlights.map((highlight, i) => (
          <li key={i} className="text-foreground/70 text-sm flex items-start">
            <span className="text-success mr-2 mt-1">▹</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t, i) => (
          <button
            key={i}
            onClick={() => onTagClick?.(t)}
            className={`px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium ${onTagClick ? 'hover:bg-primary/20 hover:scale-105 transition-all cursor-pointer' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
