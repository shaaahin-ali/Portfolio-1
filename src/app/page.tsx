"use client";

import React, { useState, useEffect, useCallback } from "react";
import LoadingScreen from "@/components/ui/loading-screen";
import CustomCursor from "@/components/ui/custom-cursor";
import PortfolioHero from "@/components/ui/portfolio-hero";
import Marquee from "@/components/ui/marquee";
import AboutSection from "@/components/ui/about-section";
import StatsBar from "@/components/ui/stats-bar";
import SkillsSection from "@/components/ui/skills-section";
import ProjectsSection from "@/components/ui/projects-section";
import ExperienceSection from "@/components/ui/experience-section";
import EducationSection from "@/components/ui/education-section";
import ContactSection from "@/components/ui/contact-section";
import ResumeButton from "@/components/ui/resume-button";

export default function Home() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const newTheme = !prev;
      if (newTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      className="transition-colors duration-500 grain-overlay"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
      }}
    >
      <LoadingScreen />
      <CustomCursor isDark={isDark} />

      <PortfolioHero isDark={isDark} toggleTheme={toggleTheme} onNavigate={handleNavigate} />
      <Marquee isDark={isDark} />
      <AboutSection isDark={isDark} />
      <StatsBar isDark={isDark} />
      <SkillsSection isDark={isDark} />
      <ProjectsSection isDark={isDark} />
      <ExperienceSection isDark={isDark} />
      <EducationSection isDark={isDark} />
      <ContactSection isDark={isDark} />

      <ResumeButton isDark={isDark} />
    </div>
  );
}
