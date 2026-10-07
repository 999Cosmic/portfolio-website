"use client";

import { useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import SkillBadge from "@/components/SkillBadge";
import ExperienceCard from "@/components/ExperienceCard";
import ResumeModal from "@/components/ResumeModal";
import TypewriterText from "@/components/TypewriterText";
import { portfolioData } from "@/data/portfolio";
import { Download, ChevronRight, GraduationCap, Eye } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("All");

  const allTags = ["All", ...Array.from(new Set(portfolioData.projects.flatMap(p => p.tech)))];

  const filteredProjects = selectedTag === "All" 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.tech.includes(selectedTag));

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 container mx-auto flex flex-col lg:flex-row items-center justify-between min-h-[90vh] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl flex-1 flex flex-col items-center text-center"
        >
          <div className="inline-block px-3 py-1 mb-6 border border-primary/30 bg-primary/10 rounded-full text-primary text-sm font-medium">
            📍 {portfolioData.hero.location}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider text-slate-300 leading-tight mb-6">
            <span className="[text-shadow:_0_0_1px_#94a3b8] [-webkit-text-stroke:_1px_#94a3b8] text-transparent">
              Hey, I&apos;m{" "}
            </span>
            <span className="relative inline-block group cursor-default">
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Zachary Trenary</span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-300 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"></span>
            </span>,
            <br />
            <span className="[text-shadow:_0_0_1px_#94a3b8] [-webkit-text-stroke:_1px_#94a3b8] text-transparent">
              but you can call me{" "}
            </span>
            <span className="relative inline-block group cursor-default">
              <span className="bg-gradient-to-r from-cyan-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">Zach</span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-300 to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-full"></span>
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-2xl leading-relaxed">
            <TypewriterText 
              prefix="Software Engineer specializing in "
              dynamicText="embedded software development, real-time control systems, and AI research applications."
            />
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              View Projects <ChevronRight size={18} />
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-6 py-3 bg-foreground/5 border border-foreground/10 text-foreground font-medium rounded-lg hover:bg-foreground/10 transition-colors flex items-center gap-2"
            >
              <Eye size={18} /> View Full Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 glow-effect">
            <Image
              src="/profile.jpg"
              alt="Zachary Trenary"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-background-secondary border-t border-foreground/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="group inline-block mb-6 cursor-default">
              <h2 className="text-3xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                Featured Projects
              </h2>
              <div className="h-1 w-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full" />
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTag === tag 
                      ? "bg-primary text-background scale-105" 
                      : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground cursor-pointer"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} {...project} index={index} onTagClick={setSelectedTag} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="group inline-block mb-1 cursor-default">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              Technical Skills
            </h2>
            <div className="h-1 w-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full mx-auto" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground/90">
              <span className="text-primary">&lt;/&gt;</span> Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.languages.map((skill, i) => (
                <SkillBadge key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground/90">
              <span className="text-emerald-400">⚛</span> Frameworks
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.frameworks.map((skill, i) => (
                <SkillBadge key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground/90">
              <span className="text-purple-400">🔧</span> Tools & APIs
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.tools.map((skill, i) => (
                <SkillBadge key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground/90">
              <span className="text-amber-400">☁️</span> Infrastructure
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.cloud.map((skill, i) => (
                <SkillBadge key={i} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Education Section */}
      <section id="experience" className="py-24 bg-background-secondary border-y border-foreground/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <div className="group inline-block mb-1 cursor-default">
                  <h2 className="text-3xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                    Experience
                  </h2>
                  <div className="h-1 w-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full" />
                </div>
              </motion.div>
              <div className="space-y-0">
                {portfolioData.experience.map((exp, index) => (
                  <ExperienceCard key={exp.id} {...exp} index={index} />
                ))}
              </div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <div className="group inline-block mb-1 cursor-default">
                  <h2 className="text-3xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                    Education
                  </h2>
                  <div className="h-1 w-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{portfolioData.education.degree}</h3>
                    <div className="text-foreground/70">{portfolioData.education.university}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-foreground/50 mb-3 uppercase tracking-wider">Relevant Coursework</div>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.education.coursework.map((course, i) => (
                      <span key={i} className="px-3 py-1 bg-foreground/5 border border-foreground/10 rounded-md text-sm text-foreground/80">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-foreground/10 text-center bg-background">
        <div className="container mx-auto px-6">
          <div className="group inline-block mb-6 cursor-default">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground transition-colors duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-sky-500 group-hover:to-emerald-500 group-hover:bg-clip-text group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
              Let's Connect
            </h2>
            <div className="h-1 w-0 bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300 group-hover:w-full mx-auto" />
          </div>
          <div className="flex justify-center items-center gap-4 mb-8">
            <a
              href={portfolioData.hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-foreground/70"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={portfolioData.hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-foreground/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors text-foreground/70"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="inline-flex items-center gap-3 bg-foreground/5 px-6 py-3 rounded-full border border-foreground/10 mb-8">
            <span className="text-foreground/80">{portfolioData.hero.email}</span>
            <button
              onClick={() => navigator.clipboard.writeText(portfolioData.hero.email)}
              className="text-primary hover:text-primary/70 text-sm font-medium transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-foreground/40 text-sm">
            © {new Date().getFullYear()} Zachary Trenary. Built with Next.js & Tailwind CSS.
          </p>
        </div>
      </footer>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl="/resume.pdf"
      />
    </main>
  );
}
