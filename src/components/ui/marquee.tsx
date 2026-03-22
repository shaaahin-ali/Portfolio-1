"use client";

import React, { useRef, useState, useEffect } from "react";

interface MarqueeProps {
  isDark: boolean;
}

export default function Marquee({ isDark }: MarqueeProps) {
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

  const items = [
    "FULL STACK DEVELOPER",
    "✦",
    "AI ENTHUSIAST",
    "✦",
    "REACT & NEXT.JS",
    "✦",
    "FASTAPI",
    "✦",
    "MACHINE LEARNING",
    "✦",
    "PYTHON",
    "✦",
    "CREATIVE THINKER",
    "✦",
    "TYPE SCRIPT",
    "✦",
  ];

  const marqueeContent = [...items, ...items];

  return (
    <div
      ref={ref}
      className="py-6 overflow-hidden relative"
      style={{
        opacity: inView ? 1 : 0,
        transition: "opacity 1s ease",
        backgroundColor: isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)",
        borderTop: `1px solid ${isDark ? "rgba(195, 228, 29, 0.08)" : "rgba(195, 228, 29, 0.15)"}`,
        borderBottom: `1px solid ${isDark ? "rgba(195, 228, 29, 0.08)" : "rgba(195, 228, 29, 0.15)"}`,
      }}
    >
      {/* Gradient fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{
          background: `linear-gradient(to right, ${isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)"}, transparent)`,
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{
          background: `linear-gradient(to left, ${isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)"}, transparent)`,
        }}
      />

      <div className="animate-marquee flex whitespace-nowrap">
        {marqueeContent.map((item, i) => (
          <span
            key={i}
            className="mx-4 md:mx-6 text-xl md:text-2xl font-bold tracking-wider"
            style={{
              fontFamily: "'Fira Code', monospace",
              color: item === "✦" ? "#C3E41D" : isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 75%)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
