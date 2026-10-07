"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface TypewriterTextProps {
  prefix: string;
  dynamicText: string;
  className?: string;
  typingSpeed?: number;
}

export default function TypewriterText({ prefix, dynamicText, className = "", typingSpeed = 30 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    if (isComplete) {
      setShowCursor(false);
      return;
    }
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [isComplete]);

  // Typing effect
  useEffect(() => {
    if (isComplete) return;

    if (displayedText.length < dynamicText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(dynamicText.slice(0, displayedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, dynamicText, isComplete, typingSpeed]);

  const handleReplay = () => {
    setIsComplete(false);
    setDisplayedText("");
    setShowCursor(true);
  };

  return (
    <div className={`relative inline-flex items-start ${className}`}>
      <span>
        {prefix}
        <span className="text-foreground/90 font-medium">{displayedText}</span>
        {showCursor && <span className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle opacity-80" />}
      </span>
      
      <AnimatePresence>
        {isComplete && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={handleReplay}
            className="ml-3 p-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/50 hover:text-primary transition-colors inline-flex items-center justify-center shrink-0 translate-y-0.5"
            title="Replay animation"
            aria-label="Replay typing animation"
          >
            <RotateCcw size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
