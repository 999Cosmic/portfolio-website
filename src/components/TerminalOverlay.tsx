"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";

interface HistoryItem {
  type: "input" | "output";
  content: React.ReactNode;
}

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Initial welcome message
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          type: "output",
          content: (
            <div>
              Welcome to my portfolio terminal!
              <br />
              Type <span className="text-primary">'help'</span> to see available commands.
            </div>
          ),
        },
      ]);
    }
  }, [history]);

  // Handle global keydown for backtick
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if they are typing in another input (unless it's the terminal input)
      if (e.key === "`" && e.target instanceof HTMLInputElement && e.target !== inputRef.current) return;
      if (e.key === "`" && e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "`") {
        e.preventDefault(); // prevent typing backtick
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomToggle = () => setIsOpen((prev) => !prev);

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener("toggleTerminal", handleCustomToggle);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("toggleTerminal", handleCustomToggle);
    };
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new history
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add input to history
    setHistory((prev) => [...prev, { type: "input", content: cmd }]);

    // Parse command
    let output: React.ReactNode = "";
    switch (trimmedCmd) {
      case "help":
        output = (
          <div className="whitespace-pre">
            Available commands:
            <br />
            <span className="text-primary">whoami</span>       - Learn more about my background
            <br />
            <span className="text-primary">projects</span>     - List featured projects
            <br />
            <span className="text-primary">skills</span>       - View my technical stack
            <br />
            <span className="text-primary">contact</span>      - Display contact information
            <br />
            <span className="text-primary">theme</span>        - Toggle or set the theme, e.g. theme dark or theme light
            <br />
            <span className="text-primary">clear</span>        - Clear the terminal screen
          </div>
        );
        break;
      case "whoami":
        output = (
          <div>
            Hey, I'm Zachary Trenary, but you can call me Zach.
            <br />
            {portfolioData.hero.subheadline}
            <br />
            Currently based in {portfolioData.hero.location}.
            <br />
            <br />
            Fun facts about me:
            <br />
            1. Born in Honolulu, Hawaii!
            <br />
            2. I got my A.A. Degree at Valencia, which allowed me to graduate early at UCF!
            <br />
            3. I used to be an editor, working around in Vegas Pro and Adobe Premiere!
          </div>
        );
        break;
      case "projects":
      case "ls projects":
      case "ls":
        output = (
          <div className="flex flex-col gap-2 mt-1">
            {portfolioData.projects.map((p, i) => (
              <div key={i} className="mb-2">
                <span className="font-bold">{p.title}</span> - {p.description}
              </div>
            ))}
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="mt-1">
            <strong className="text-white">Tech Stack:</strong>
            <br />
            {Object.values(portfolioData.skills).flat().join(", ")}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="mt-1">
            Email: <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.hero.email}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{portfolioData.hero.email}</a>
            <br />
            GitHub: <a href={portfolioData.hero.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{portfolioData.hero.github}</a>
            <br />
            LinkedIn: <a href={portfolioData.hero.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{portfolioData.hero.linkedin}</a>
          </div>
        );
        break;
      case "theme":
        setTheme(theme === "dark" ? "light" : "dark");
        output = (
          <div>
            Switched to {theme === "dark" ? "light" : "dark"} mode. Use <span className="text-primary">theme</span> dark/light to force a specific theme.
          </div>
        );
        break;
      case "theme dark":
        setTheme("dark");
        output = <div>Switched to dark mode.</div>;
        break;
      case "theme light":
        setTheme("light");
        output = <div>Switched to light mode.</div>;
        break;
      case "clear":
        setHistory([]);
        return; // Early return to avoid adding the output
      case "":
        return; // Empty command just prints prompt again
      default:
        output = (
          <div>
            Command not found: <span className="text-red-400">{trimmedCmd}</span>. Type 'help' for a list of commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { type: "output", content: output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    }
  };

  const handleChipClick = (cmd: string) => {
    runCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 top-0 z-[100] p-4 md:p-6 shadow-2xl pointer-events-none"
        >
          <div className="bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-xl max-w-4xl mx-auto shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto flex flex-col h-[60vh] md:h-[50vh]">
            
            {/* Terminal Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-slate-400" />
                <span className="text-xs font-mono text-slate-400">guest@zachary-portfolio:~</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close Terminal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 overflow-y-auto font-mono text-sm md:text-base text-slate-300 flex-1 space-y-3 cursor-text" onClick={() => inputRef.current?.focus()}>
              {history.map((item, index) => (
                <div key={index} className={item.type === "input" ? "flex gap-2" : "pl-4 mb-2"}>
                  {item.type === "input" && (
                    <span className="text-emerald-500 font-bold shrink-0">guest@portfolio:~$</span>
                  )}
                  <div className={item.type === "output" ? "text-slate-400" : "text-white"}>
                    {item.content}
                  </div>
                </div>
              ))}
              
              {/* Active Input Line */}
              <div className="flex gap-2 items-center">
                <span className="text-emerald-500 font-bold shrink-0">guest@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none flex-1 text-white shadow-none focus:ring-0 p-0"
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Quick Command Chips */}
            <div className="bg-slate-900/50 border-t border-slate-800 p-3 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {["help", "whoami", "projects", "skills", "contact", "theme", "clear"].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleChipClick(cmd)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-md transition-colors border border-slate-700/50"
                >
                  {cmd}
                </button>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
