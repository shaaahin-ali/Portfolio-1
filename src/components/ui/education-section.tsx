"use client";

import React, { useRef, useState, useEffect } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

interface EducationEntry {
  school: string;
  degree: string;
  board: string;
  location: string;
  score: string;
  year: string;
}

interface EducationCardProps {
  entry: EducationEntry;
  isDark: boolean;
  index: number;
}

const EducationCard: React.FC<EducationCardProps> = ({ entry, isDark, index }) => {
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
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 200}ms`,
      }}
    >
      <div
        className="p-8 rounded-2xl transition-all duration-500 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 96%)",
          border: `1px solid ${
            isHovered
              ? "rgba(195, 228, 29, 0.4)"
              : isDark
              ? "hsl(0 0% 12%)"
              : "hsl(0 0% 88%)"
          }`,
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: isHovered ? "0 20px 40px rgba(195, 228, 29, 0.08)" : "none",
        }}
      >
        {/* Score badge */}
        <div
          className="absolute top-6 right-6 text-3xl md:text-4xl font-bold"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: "#C3E41D",
            opacity: isHovered ? 1 : 0.6,
            transition: "opacity 0.3s ease",
          }}
        >
          {entry.score}
        </div>

        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              backgroundColor: isDark ? "rgba(195, 228, 29, 0.1)" : "rgba(195, 228, 29, 0.15)",
            }}
          >
            <GraduationCap className="w-6 h-6" style={{ color: "#C3E41D" }} />
          </div>
          <div className="pr-20">
            <h3
              className="text-xl font-bold tracking-tight mb-1"
              style={{ fontFamily: "'Fira Code', monospace" }}
            >
              {entry.school}
            </h3>
            <p
              className="text-base mb-3"
              style={{
                fontFamily: "'Antic', sans-serif",
                color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
              }}
            >
              {entry.degree}
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" style={{ color: isDark ? "hsl(0 0% 45%)" : "hsl(0 0% 55%)" }} />
                <span className="text-xs" style={{ color: isDark ? "hsl(0 0% 45%)" : "hsl(0 0% 55%)" }}>
                  {entry.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" style={{ color: isDark ? "hsl(0 0% 45%)" : "hsl(0 0% 55%)" }} />
                <span className="text-xs" style={{ color: isDark ? "hsl(0 0% 45%)" : "hsl(0 0% 55%)" }}>
                  {entry.year}
                </span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 90%)",
                  color: isDark ? "hsl(0 0% 55%)" : "hsl(0 0% 45%)",
                }}
              >
                {entry.board}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EducationSectionProps {
  isDark: boolean;
}

export default function EducationSection({ isDark }: EducationSectionProps) {
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

  const education: EducationEntry[] = [
    {
      school: "Govt. Model Engineering College",
      degree: "B.Tech in Computer Science Engineering",
      board: "KTU",
      location: "Kochi, Kerala",
      score: "9.39",
      year: "2023 — 2027",
    },
    {
      school: "I U Higher Secondary School",
      degree: "Higher Secondary (12th Standard)",
      board: "State Board",
      location: "Kerala",
      score: "99%",
      year: "2022",
    },
    {
      school: "Sacred Heart Senior Secondary School",
      degree: "Secondary (10th Standard)",
      board: "CBSE",
      location: "Kerala",
      score: "92.6%",
      year: "2020",
    },
  ];

  return (
    <section
      id="education"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl"
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
            EDUCATION
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-16"
            style={{ backgroundColor: "#C3E41D" }}
          />
        </div>

        <div className="space-y-6">
          {education.map((entry, i) => (
            <EducationCard key={entry.school} entry={entry} isDark={isDark} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
