"use client";

import React, { useRef, useState, useEffect } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  isDark: boolean;
  delay?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, suffix = "", label, isDark, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    const current = ref.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, end, delay]);

  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums"
        style={{ fontFamily: "'Fira Code', monospace", color: "#C3E41D" }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-xs md:text-sm uppercase tracking-[0.2em] mt-2 font-medium"
        style={{
          fontFamily: "'Antic', sans-serif",
          color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface StatsBarProps {
  isDark: boolean;
}

export default function StatsBar({ isDark }: StatsBarProps) {
  return (
    <section
      className="py-20 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        borderTop: `1px solid ${isDark ? "rgba(195, 228, 29, 0.08)" : "rgba(195, 228, 29, 0.15)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(195, 228, 29, 0.08)" : "rgba(195, 228, 29, 0.15)"}`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatCounter end={3} suffix="+" label="Projects Built" isDark={isDark} delay={0} />
          <StatCounter end={15} suffix="+" label="Technologies" isDark={isDark} delay={150} />
          <StatCounter end={9} suffix=".39" label="CGPA Score" isDark={isDark} delay={300} />
          <StatCounter end={4} suffix="+" label="Certifications" isDark={isDark} delay={450} />
        </div>
      </div>
    </section>
  );
}
