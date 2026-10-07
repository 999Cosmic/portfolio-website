"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl h-[85vh] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <ResumeModalBody resumeUrl={resumeUrl} onClose={onClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ResumeModalBody({ onClose, resumeUrl }: { onClose: () => void; resumeUrl: string }) {
  const TOTAL_PAGES = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const handlePageSubmit = () => {
    const parsed = parseInt(pageInput, 10);
    if (Number.isNaN(parsed) || parsed < 1 || parsed > TOTAL_PAGES) {
      setPageInput(String(currentPage));
      return;
    }
    setCurrentPage(parsed);
    setPageInput(String(parsed));
  };

  return (
    <>
      {/* Header */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4 border-b border-foreground/10 bg-background-secondary">
        <h3 className="text-lg font-bold text-foreground shrink-0">Resume Preview</h3>

        {/* Chrome-style page navigation */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-1.5 bg-background border border-foreground/10 hover:border-primary/40 transition-colors rounded-lg px-2 py-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handlePageSubmit();
                }
              }}
              onBlur={() => setPageInput(String(currentPage))}
              aria-label="Current page"
              className="w-8 bg-transparent border-none outline-none text-center text-sm text-foreground focus:ring-0 p-0"
            />
            <span className="text-sm text-foreground/50">/ {TOTAL_PAGES}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={resumeUrl}
            download
            className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 hover:bg-primary/20 text-foreground/80 hover:text-primary rounded-lg transition-colors text-sm font-medium"
            title="Download PDF"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            onClick={onClose}
            className="p-1.5 bg-foreground/5 hover:bg-red-500/20 text-foreground/80 hover:text-red-500 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 w-full h-full bg-black/5">
        <iframe
          key={currentPage}
          src={`${resumeUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full border-none"
          title="Resume PDF"
        />
      </div>
    </>
  );
}