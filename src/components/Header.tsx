"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Mail, Sun, Moon, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";
import { playThemeSwitchSound } from "@/utils/playSound";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
          ZT
        </a>
        <nav className="hidden md:flex items-center gap-8 text-base font-medium text-foreground/80">
          <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
          <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
          <a href="#experience" className="hover:text-primary transition-colors">Experience & Education</a>
        </nav>
        <div className="flex items-center gap-5 text-foreground/60">
          <a href={portfolioData.hero.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FaGithub size={24} />
          </a>
          <a href={portfolioData.hero.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.hero.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            title="Send Email via Gmail"
          >
            <Mail size={24} />
          </a>
          {mounted && (
            <div className="flex items-center">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("toggleTerminal"))}
                className="ml-2 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 hover:text-primary transition-colors group relative"
                aria-label="Open Terminal"
              >
                <Terminal size={20} />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                  Terminal (Press `)
                </span>
              </button>
              <button
                onClick={() => {
                  playThemeSwitchSound();
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className="ml-2 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 hover:text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
