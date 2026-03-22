"use client";

import React, { useRef, useState, useEffect } from "react";
import { Award, BookOpen, Trophy, Briefcase } from "lucide-react";

interface ExperienceSectionProps {
  isDark: boolean;
}

interface TimelineItemProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  isDark: boolean;
  index: number;
  isLeft: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  description,
  icon,
  isDark,
  index,
  isLeft,
}) => {
  const [inView, setInView] = useState(false);
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
      className={`flex items-center gap-6 mb-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : `translateX(${isLeft ? "-50px" : "50px"})`,
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 150}ms`,
      }}
    >
      {/* Content */}
      <div className="flex-1">
        <div
          className="p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1"
          style={{
            backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 96%)",
            border: `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)"}`,
          }}
        >
          <h4
            className="text-lg font-bold tracking-tight mb-1"
            style={{ fontFamily: "'Fira Code', monospace" }}
          >
            {title}
          </h4>
          <p
            className="text-sm font-medium mb-3"
            style={{ color: "#C3E41D" }}
          >
            {subtitle}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 45%)",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Icon */}
      <div
        className="hidden md:flex w-12 h-12 rounded-full items-center justify-center shrink-0"
        style={{
          backgroundColor: isDark ? "rgba(195, 228, 29, 0.1)" : "rgba(195, 228, 29, 0.15)",
          border: "2px solid rgba(195, 228, 29, 0.3)",
        }}
      >
        <div style={{ color: "#C3E41D" }}>{icon}</div>
      </div>

      {/* Spacer for layout */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

export default function ExperienceSection({ isDark }: ExperienceSectionProps) {
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

  const experiences = [
    {
      title: "Chief Publicity Officer",
      subtitle: "IEDC MEC 2025",
      description: "Managed publicity for startup events at Innovation & Entrepreneurship Development Centre, creating impactful campaigns and strategies for maximum outreach.",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: "Events Head",
      subtitle: "Excel MEC 2025",
      description: "Led operations and event coordination for Excel MEC, the annual national-level techno-managerial fest of Model Engineering College.",
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      title: "Cloud Computing Certification",
      subtitle: "NPTEL — IIT Kharagpur",
      description: "Completed comprehensive certification on cloud computing concepts, architectures, and deployment models from IIT Kharagpur through NPTEL.",
      icon: <Award className="w-5 h-5" />,
    },
    {
      title: "Python Certification",
      subtitle: "Kaggle",
      description: "Completed certification covering core programming concepts and hands-on problem solving in Python through the Kaggle learning platform.",
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  const achievements = [
    "Participated in IEEE MAGIC 3.0 Hackathon — developed a library management system within 24 hours in a team of 4",
    "Active member of Design & Management Team, Excel MEC (2025–Present)",
    "Member of Design Team, IEDC MEC (2024) — designed promotional posters and visual assets",
    "Completed 3-day NLP Workshop conducted by ICFOSS",
    "Participated in Drone Workshop conducted by Excel MEC 2025",
    "Attended Agent Development Kit Hands-on Workshop, Excel 2025",
  ];

  return (
    <section
      id="experience"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full opacity-3 blur-3xl -translate-x-1/2"
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
            EXPERIENCE
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-16"
            style={{ backgroundColor: "#C3E41D" }}
          />
        </div>

        {/* Timeline / Cards */}
        <div className="mb-20">
          <h3
            className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
            style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
          >
            Positions & Certifications
          </h3>
          <div className="relative">
            {/* Center line */}
            <div
              className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{ backgroundColor: isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 85%)" }}
            />
            {experiences.map((exp, i) => (
              <TimelineItem
                key={exp.title}
                {...exp}
                isDark={isDark}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3
            className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
            style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
          >
            Achievements & Activities
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement, i) => (
              <AchievementCard
                key={i}
                text={achievement}
                isDark={isDark}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface AchievementCardProps {
  text: string;
  isDark: boolean;
  index: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ text, isDark, index }) => {
  const [inView, setInView] = useState(false);
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
      className="flex items-start gap-3 p-4 rounded-xl transition-all duration-500 hover:-translate-y-1"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 95%)",
        border: `1px solid ${isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 88%)"}`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
      }}
    >
      <Trophy className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#C3E41D" }} />
      <p
        className="text-sm leading-relaxed"
        style={{
          fontFamily: "'Antic', sans-serif",
          color: isDark ? "hsl(0 0% 65%)" : "hsl(0 0% 40%)",
        }}
      >
        {text}
      </p>
    </div>
  );
};
