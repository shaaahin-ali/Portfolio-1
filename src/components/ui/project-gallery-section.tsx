"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Clock,
  ArrowUpRight,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════════
   Types
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ProjectImage {
  src: string;
  caption: string;
}

interface ShowcaseProject {
  id: string;
  title: string;
  tagline: string;
  role: string;
  teamSize?: number;
  duration: string;
  status: "Ongoing" | "Completed";
  technologies: string[];
  overview: string;
  highlights: string[];
  images: ProjectImage[];
  github?: string;
  live?: string;
  accent: string;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════════════════════ */

const PROJECTS: ShowcaseProject[] = [
  {
    id: "seekright",
    title: "SeekRight",
    tagline: "AI-Powered Lecture Intelligence",
    role: "Team Lead",
    teamSize: 3,
    duration: "Ongoing",
    status: "Ongoing",
    accent: "#C3E41D",
    technologies: [
      "FastAPI",
      "Python",
      "Whisper",
      "FAISS",
      "SentenceTransformers",
      "SQLite / SQLAlchemy",
      "yt-dlp",
      "FFmpeg",
      "Chrome Extension (MV3)",
      "Next.js",
      "TypeScript",
    ],
    overview:
      "A transcript-grounded semantic retrieval system that transcribes YouTube lecture videos, chunks and encodes them into a FAISS vector store, and answers natural-language questions with grounded, hallucination-free responses. A companion Chrome extension lets students query any lecture without leaving their browser.",
    highlights: [
      "Multi-stage ingestion pipeline — audio → transcript → embeddings → FAISS index",
      "RAG-based Q&A with source attribution and timestamps",
      "Multi-session dashboard with full query history",
      "Chrome Extension (Manifest V3) for in-browser Q&A",
      "Zero-hallucination constraint via strict transcript grounding",
    ],
    images: [
      { src: "/projects/seekright/home.jpeg", caption: "Home Page" },
      { src: "/projects/seekright/dashboard.jpeg", caption: "Session Dashboard" },
      { src: "/projects/seekright/queries.jpeg", caption: "Past Queries" },
      { src: "/projects/seekright/login.jpeg", caption: "Login & Auth" },
      { src: "/projects/seekright/landing.jpeg", caption: "Landing Page" },
    ],
    github: "https://github.com/shaaahin-ali",
  },
  {
    id: "tenderlens",
    title: "TenderLens",
    tagline: "Automated RFP Compliance Validator",
    role: "Solo Developer",
    duration: "3 Months",
    status: "Completed",
    accent: "#38BDF8",
    technologies: [
      "Python",
      "FastAPI",
      "Hugging Face Inference API",
      "RAG",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Render",
      "Vercel",
    ],
    overview:
      "Automates the tedious process of RFP compliance review. Parses uploaded tender documents, runs clause-by-clause analysis against compliance rules using a RAG pipeline backed by Hugging Face models, and produces structured pass/fail reports — cutting review time from hours to seconds.",
    highlights: [
      "PDF parsing and clause extraction pipeline",
      "RAG pipeline with vector-based rule matching",
      "Clause-level pass / fail / partial verdicts",
      "Structured compliance report export",
      "Full-stack deployment: FastAPI on Render + Next.js on Vercel",
    ],
    images: [
      { src: "/projects/tenderlens/page3.png", caption: "Landing Page" },
      { src: "/projects/tenderlens/page1.png", caption: "RFP & Proposal Upload" },
      { src: "/projects/tenderlens/page2.png", caption: "Compliance Scores" },
      { src: "/projects/tenderlens/page4.png", caption: "Full Scores View" },
      { src: "/projects/tenderlens/feature.png", caption: "Features Overview" },
    ],
    github: "https://github.com/shaaahin-ali",
    live: "https://tender-lens.vercel.app/",
  },
  {
    id: "sahay-kerala",
    title: "Sahay Kerala",
    tagline: "Disaster Response Coordination Platform",
    role: "Full-Stack Developer",
    duration: "4 Months",
    status: "Completed",
    accent: "#F59E0B",
    technologies: [
      "FastAPI",
      "Python",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "SQLite",
      "JWT Auth",
      "Docker",
      "SMTP",
    ],
    overview:
      "A real-time disaster response platform connecting citizens who need help with trained volunteers. Supports multi-role dashboards (admin / volunteer / public), geo-based matching to dispatch the nearest available responder, and automated email notifications.",
    highlights: [
      "Role-based access: Admin, Volunteer, Public citizen",
      "Real-time emergency request board with status tracking",
      "Location-aware volunteer matching algorithm",
      "Automated email notifications via SMTP integration",
      "Containerized with Docker; deployed end-to-end",
    ],
    images: [
      { src: "/projects/sahay-kerala/landing.png", caption: "Landing Page" },
      { src: "/projects/sahay-kerala/dashboard.png", caption: "Admin Dashboard" },
      { src: "/projects/sahay-kerala/dashboard2.png", caption: "Dashboard – Detail" },
      { src: "/projects/sahay-kerala/request.png", caption: "Emergency Requests" },
      { src: "/projects/sahay-kerala/resource.png", caption: "Resource Management" },
      { src: "/projects/sahay-kerala/profile.png", caption: "User Profile" },
      { src: "/projects/sahay-kerala/about.png", caption: "About Page" },
    ],
    live: "https://disaster-relief-lake.vercel.app/",
    github: "https://github.com/shaaahin-ali",
  },
  {
    id: "extension",
    title: "Deepfake Detection",
    tagline: "Real-Time AI Media Verification",
    role: "Solo Developer",
    duration: "4 Months",
    status: "Completed",
    accent: "#A78BFA",
    technologies: [
      "JavaScript",
      "Chrome Extension API",
      "Manifest V3",
      "Cloudflare Workers",
      "Hugging Face Inference API",
    ],
    overview:
      "A Chrome extension that passively monitors media on any webpage and flags AI-generated or manipulated images in real time. Frames are routed through a Cloudflare Worker proxy to a Hugging Face deepfake classification model, and confidence-scored verdicts are displayed inline.",
    highlights: [
      "Inline image capture via content script (Manifest V3)",
      "Cloudflare Worker edge proxy for secure model calls",
      "Hugging Face deepfake classification model",
      "Confidence score badge overlaid on flagged images",
      "Zero persistent storage — privacy-first design",
    ],
    images: [
      { src: "/projects/extension/ext1.png", caption: "Extension UI" },
      { src: "/projects/extension/ext2.png", caption: "Detection in Action" },
      { src: "/projects/extension/ext3.png", caption: "Results & Confidence" },
    ],
    github: "https://github.com/shaaahin-ali",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   Hooks
   ═══════════════════════════════════════════════════════════════════════════════ */

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* Mouse-tracking glow — follows cursor on hover, reveals radial gradient */
function useMouseGlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false });

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setGlow((prev) => ({ ...prev, active: false }));
  }, []);

  return { containerRef, glow, handleMove, handleLeave };
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Image Carousel — smooth slide transitions, auto-play with progress bar
   ═══════════════════════════════════════════════════════════════════════════════ */

interface CarouselProps {
  images: ProjectImage[];
  accent: string;
  isDark: boolean;
}

function ImageCarousel({ images, accent, isDark }: CarouselProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [imgErr, setImgErr] = useState<Set<number>>(new Set());
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_MS = 4200;

  const go = useCallback(
    (dir: 1 | -1) => {
      setIdx((c) => (c + dir + images.length) % images.length);
      setProgressKey((k) => k + 1);
    },
    [images.length]
  );

  const jump = useCallback((i: number) => {
    setIdx(i);
    setProgressKey((k) => k + 1);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Auto-advance
  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = setInterval(() => go(1), AUTO_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, go, images.length]);

  return (
    <div
      className="relative w-full select-none group/carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Main viewport */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          aspectRatio: "16 / 10",
          backgroundColor: isDark ? "hsl(0 0% 5%)" : "hsl(0 0% 93%)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
          boxShadow: `
            0 4px 16px rgba(0,0,0,0.12),
            0 16px 48px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
        }}
      >
        {/* Slide track */}
        <div
          className="flex h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${(idx * 100) / images.length}%)`,
            transition: "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {images.map((img, i) => (
            <div
              key={img.src}
              className="relative h-full"
              style={{ width: `${100 / images.length}%` }}
            >
              {imgErr.has(i) ? (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{ color: isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 70%)" }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl border-2 border-dashed flex items-center justify-center"
                    style={{ borderColor: `${accent}30` }}
                  >
                    <span className="text-xl" style={{ color: accent }}>
                      ⌗
                    </span>
                  </div>
                  <span className="text-xs opacity-40">Screenshot pending</span>
                </div>
              ) : (
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover object-top"
                  loading={i === 0 ? "eager" : "lazy"}
                  onError={() => setImgErr((prev) => new Set(prev).add(i))}
                />
              )}
            </div>
          ))}
        </div>

        {/* Top scrim */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)",
          }}
        />

        {/* Bottom scrim + caption */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${
              isDark ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.45)"
            }, transparent)`,
          }}
        />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none">
          <span
            className="text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
            style={{
              backgroundColor: `${accent}20`,
              color: "#fff",
              border: `1px solid ${accent}35`,
            }}
          >
            {images[idx].caption}
          </span>
          <span
            className="text-xs font-mono tabular-nums"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {String(idx + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Nav arrows — appear on hover with glassmorphism */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
                         opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
                         opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Progress bar — thin accent line at top, restarts on slide change */}
        {images.length > 1 && (
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            <div
              key={progressKey}
              className="h-full"
              style={{
                backgroundColor: accent,
                animation: paused ? "none" : `carouselProgress ${AUTO_MS}ms linear forwards`,
                width: paused ? "0%" : undefined,
              }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => jump(i)}
              className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: "68px",
                height: "44px",
                border: `2px solid ${i === idx ? accent : "transparent"}`,
                opacity: i === idx ? 1 : 0.3,
                backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 88%)",
                transform: i === idx ? "scale(1.06)" : "scale(1)",
              }}
            >
              {!imgErr.has(i) && (
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  onError={() => setImgErr((prev) => new Set(prev).add(i))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Single project showcase — mouse-tracking glow, staggered reveals
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ShowcaseProps {
  project: ShowcaseProject;
  isDark: boolean;
  index: number;
}

function ProjectShowcase({ project, isDark, index }: ShowcaseProps) {
  const { ref, visible } = useInView(0.06);
  const { containerRef, glow, handleMove, handleLeave } = useMouseGlow();
  const flip = index % 2 !== 0;
  const a = project.accent;

  // Merge refs
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref, containerRef]
  );

  return (
    <article
      ref={mergedRef}
      id={`project-${project.id}`}
      className="relative rounded-3xl overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms,
                     transform 1s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
        backgroundColor: isDark ? "hsl(0 0% 3.5%)" : "hsl(0 0% 97%)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      {/* ── Mouse-tracking glow overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-500"
        style={{
          opacity: glow.active ? 1 : 0,
          background: `radial-gradient(800px circle at ${glow.x}px ${glow.y}px, ${a}08, transparent 45%)`,
        }}
      />

      {/* ── Accent top edge ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${a}40, transparent)`,
        }}
      />

      <div className="relative z-10 p-8 md:p-12 lg:p-14">
        {/* Giant watermark number */}
        <div
          className="absolute -top-6 pointer-events-none select-none hidden lg:block"
          style={{
            [flip ? "left" : "right"]: "16px",
            fontSize: "clamp(7rem, 12vw, 12rem)",
            fontWeight: 900,
            lineHeight: 1,
            fontFamily: "'Fira Code', monospace",
            color: `${a}05`,
            letterSpacing: "-0.06em",
          }}
        >
          0{index + 1}
        </div>

        <div
          className={`grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start ${
            flip ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* ─── Image column ─── */}
          <div className={flip ? "lg:[direction:ltr]" : ""}>
            <ImageCarousel images={project.images} accent={a} isDark={isDark} />
          </div>

          {/* ─── Info column ─── */}
          <div className={`space-y-5 ${flip ? "lg:[direction:ltr]" : ""}`}>
            {/* Role badge line */}
            <div
              className="flex items-center gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: "all 0.6s ease 200ms",
              }}
            >
              <span
                className="inline-block h-px flex-grow max-w-[40px]"
                style={{ backgroundColor: a }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.25em]"
                style={{ color: a }}
              >
                {project.role}
                {project.teamSize ? ` · Team of ${project.teamSize}` : ""}
              </span>
            </div>

            {/* Title */}
            <h3
              className="text-3xl md:text-[2.6rem] font-black tracking-tight leading-[1.1]"
              style={{
                fontFamily: "'Fira Code', monospace",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "all 0.7s ease 300ms",
              }}
            >
              {project.title}
            </h3>

            {/* Tagline */}
            <p
              className="text-base font-medium"
              style={{
                color: a,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.6s ease 380ms",
              }}
            >
              {project.tagline}
            </p>

            {/* Meta pills */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 420ms",
              }}
            >
              {[
                { label: project.status, dot: project.status === "Ongoing" },
                { label: project.duration },
              ].map(({ label, dot }, mi) => (
                <span
                  key={`m-${mi}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.035)"
                      : "rgba(0,0,0,0.035)",
                    color: isDark ? "hsl(0 0% 58%)" : "hsl(0 0% 42%)",
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"
                    }`,
                  }}
                >
                  {dot && (
                    <span className="relative flex h-2 w-2">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{ backgroundColor: a }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2 w-2"
                        style={{ backgroundColor: a }}
                      />
                    </span>
                  )}
                  {!dot && <Clock className="w-3 h-3" />}
                  {label}
                </span>
              ))}
            </div>

            {/* Overview */}
            <p
              className="text-[15px] leading-[1.75]"
              style={{
                fontFamily: "'Antic', sans-serif",
                color: isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 38%)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.7s ease 450ms",
              }}
            >
              {project.overview}
            </p>

            {/* Highlights */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 500ms",
              }}
            >
              <h4
                className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                style={{ color: isDark ? "hsl(0 0% 38%)" : "hsl(0 0% 55%)" }}
              >
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {project.highlights.map((h, hi) => (
                  <li
                    key={hi}
                    className="flex items-start gap-2.5 text-sm"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateX(0)" : "translateX(-10px)",
                      transition: `all 0.45s ease ${550 + hi * 70}ms`,
                    }}
                  >
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: a }}
                    />
                    <span
                      style={{
                        color: isDark ? "hsl(0 0% 56%)" : "hsl(0 0% 42%)",
                      }}
                    >
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transition: "opacity 0.5s ease 650ms",
              }}
            >
              <h4
                className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3"
                style={{ color: isDark ? "hsl(0 0% 38%)" : "hsl(0 0% 55%)" }}
              >
                Built With
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t, ti) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors duration-200"
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.03)",
                      color: isDark ? "hsl(0 0% 52%)" : "hsl(0 0% 42%)",
                      border: `1px solid ${
                        isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.06)"
                      }`,
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(6px)",
                      transition: `all 0.35s ease ${700 + ti * 35}ms`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action links */}
            <div
              className="flex gap-3 pt-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "all 0.6s ease 800ms",
              }}
            >
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                             transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                  style={{
                    backgroundColor: isDark
                      ? "hsl(0 0% 7%)"
                      : "hsl(0 0% 92%)",
                    border: `1px solid ${
                      isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.08)"
                    }`,
                    color: isDark ? "hsl(0 0% 85%)" : "hsl(0 0% 15%)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  Source
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-35" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                             transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.97]"
                  style={{
                    backgroundColor: a,
                    color: "hsl(0 0% 5%)",
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-55" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Sticky project nav — appears when scrolling through the section
   ═══════════════════════════════════════════════════════════════════════════════ */

interface ProjectNavProps {
  isDark: boolean;
  activeId: string;
}

function ProjectNav({ isDark, activeId }: ProjectNavProps) {
  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: isDark ? "rgba(10,10,10,0.85)" : "rgba(250,250,250,0.85)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      {PROJECTS.map((p) => {
        const isActive = p.id === activeId;
        return (
          <button
            key={p.id}
            onClick={() => {
              document.getElementById(`project-${p.id}`)?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
            className="relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
            style={{
              color: isActive
                ? p.accent
                : isDark
                ? "hsl(0 0% 45%)"
                : "hsl(0 0% 55%)",
              backgroundColor: isActive
                ? `${p.accent}12`
                : "transparent",
            }}
          >
            {p.title}
            {isActive && (
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                style={{ backgroundColor: p.accent }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Section wrapper — manages sticky nav visibility + active project tracking
   ═══════════════════════════════════════════════════════════════════════════════ */

interface Props {
  isDark: boolean;
}

export default function ProjectGallerySection({ isDark }: Props) {
  const { ref: titleRef, visible: titleVis } = useInView(0.15);
  const sectionRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [activeProject, setActiveProject] = useState(PROJECTS[0].id);

  // Track which project is in the middle of the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    PROJECTS.forEach((p) => {
      const el = document.getElementById(`project-${p.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveProject(p.id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Show/hide bottom nav when scrolling through section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowNav(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      {/* Ambient lights */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none"
        style={{ backgroundColor: "#C3E41D", opacity: 0.02 }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[110px] pointer-events-none"
        style={{ backgroundColor: "#38BDF8", opacity: 0.015 }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          ref={titleRef}
          style={{
            opacity: titleVis ? 1 : 0,
            transform: titleVis ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <h2
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: "#C3E41D",
            }}
          >
            PROJECTS
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-6"
            style={{ backgroundColor: "#C3E41D" }}
          />
          <p
            className="text-base max-w-xl mb-20"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 48%)" : "hsl(0 0% 45%)",
            }}
          >
            A deep dive into each project — browse the screenshots, explore the
            stack, and see what makes it tick.
          </p>
        </div>

        {/* Project cards */}
        <div className="space-y-20 lg:space-y-28">
          {PROJECTS.map((p, i) => (
            <ProjectShowcase
              key={p.id}
              project={p}
              isDark={isDark}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* Floating project nav */}
      <div
        className="transition-all duration-500"
        style={{
          opacity: showNav ? 1 : 0,
          pointerEvents: showNav ? "auto" : "none",
          transform: showNav ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <ProjectNav isDark={isDark} activeId={activeProject} />
      </div>

      {/* Keyframe for carousel progress bar */}
      <style>{`
        @keyframes carouselProgress {
          from { width: 0; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
