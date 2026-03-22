"use client";

import React, { useRef, useState, useEffect } from "react";
import { ExternalLink, Github, Users, Clock, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  role: string;
  teamSize?: number;
  duration: string;
  status: string;
  technologies: string[];
  description: string;
  github?: string;
  live?: string;
}

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isDark, index }) => {
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(50px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
      }}
    >
      <div
        className="relative rounded-2xl p-8 transition-all duration-500 overflow-hidden h-full"
        style={{
          backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 96%)",
          border: `1px solid ${
            isHovered
              ? "rgba(195, 228, 29, 0.4)"
              : isDark
              ? "hsl(0 0% 12%)"
              : "hsl(0 0% 88%)"
          }`,
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          boxShadow: isHovered
            ? "0 30px 60px rgba(195, 228, 29, 0.08)"
            : "none",
        }}
      >
        {/* Gradient overlay on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(195, 228, 29, 0.03) 0%, transparent 50%)",
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3
                className="text-2xl font-bold tracking-tight mb-1"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  color: isHovered ? "#C3E41D" : isDark ? "hsl(0 0% 95%)" : "hsl(0 0% 10%)",
                  transition: "color 0.3s ease",
                }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm font-medium"
                style={{ color: "#C3E41D" }}
              >
                {project.role}
              </p>
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: project.status === "Ongoing"
                  ? "rgba(195, 228, 29, 0.15)"
                  : isDark
                  ? "hsl(0 0% 10%)"
                  : "hsl(0 0% 90%)",
                color: project.status === "Ongoing"
                  ? "#C3E41D"
                  : isDark
                  ? "hsl(0 0% 60%)"
                  : "hsl(0 0% 45%)",
              }}
            >
              {project.status}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex gap-4 mb-6">
            {project.teamSize && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }} />
                <span className="text-xs" style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}>
                  Team of {project.teamSize}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }} />
              <span className="text-xs" style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}>
                {project.duration}
              </span>
            </div>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 65%)" : "hsl(0 0% 40%)",
            }}
          >
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 90%)",
                  color: isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 45%)",
                  border: `1px solid ${isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 82%)"}`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 group/link"
                style={{ color: "#C3E41D" }}
              >
                <Github className="w-4 h-4" />
                Code
                <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-300 group/link"
                style={{ color: "#C3E41D" }}
              >
                <ExternalLink className="w-4 h-4" />
                Live
                <ChevronRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsSectionProps {
  isDark: boolean;
}

export default function ProjectsSection({ isDark }: ProjectsSectionProps) {
  const [titleInView, setTitleInView] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleInView(true);
      },
      { threshold: 0.1 }
    );
    const current = titleRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const projects: Project[] = [
    {
      title: "SeekRight",
      role: "Team Lead",
      teamSize: 3,
      duration: "Ongoing",
      status: "Ongoing",
      technologies: ["FastAPI", "Python", "Whisper", "FAISS", "SentenceTransformers", "SQLite", "SQLAlchemy", "yt-dlp", "FFmpeg", "Chrome Extension API"],
      description:
        "A transcript-grounded semantic retrieval system that processes lecture videos into structured embeddings, enabling fast vector-based search and hallucination-free question answering through a multi-stage ingestion and retrieval pipeline.",
      github: "https://github.com/shaaahin-ali",
    },
    {
      title: "Sahay Kerala",
      role: "Full-Stack Developer",
      duration: "4 Months",
      status: "Completed",
      technologies: ["FastAPI", "Python", "Next.js", "TypeScript", "PostgreSQL", "SQLite", "JWT", "Docker", "SMTP"],
      description:
        "Designed and implemented a scalable disaster response platform enabling real-time emergency request handling, location-based volunteer coordination, and secure role-based access using modular API architecture and containerized deployment.",
      github: "https://github.com/shaaahin-ali",
      live: "https://disaster-relief-lake.vercel.app/",
    },
    {
      title: "Deepfake Detection Extension",
      role: "Solo Developer",
      duration: "4 Months",
      status: "Completed",
      technologies: ["JavaScript", "Chrome Extension API", "Manifest V3", "Cloudflare Workers", "Hugging Face Inference API"],
      description:
        "Built a Chrome extension that detects deepfake media in real time by capturing webpage images, processing them through a Cloudflare Worker backend, and performing AI-based analysis using Hugging Face models to deliver confidence-scored alerts.",
      github: "https://github.com/shaaahin-ali",
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      <div
        className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            style={{ fontFamily: "'Fira Code', monospace", color: "#C3E41D" }}
          >
            PROJECTS
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-16"
            style={{ backgroundColor: "#C3E41D" }}
          />
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              isDark={isDark}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
