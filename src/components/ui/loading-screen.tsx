"use client";

import React, { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Accelerating progress
        const increment = prev < 60 ? 3 : prev < 90 ? 5 : 8;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setIsComplete(true), 300);
      setTimeout(() => setIsHidden(true), 1200);
    }
  }, [progress]);

  if (isHidden) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        backgroundColor: "hsl(0 0% 0%)",
        opacity: isComplete ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: isComplete ? "none" : "auto",
      }}
    >
      <div className="text-center">
        {/* Name */}
        <div
          className="text-3xl md:text-5xl font-bold tracking-tighter mb-8"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: "#C3E41D",
          }}
        >
          SA
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-64 h-[2px] mx-auto overflow-hidden" style={{ backgroundColor: "hsl(0 0% 15%)" }}>
          <div
            className="h-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: "#C3E41D",
            }}
          />
        </div>

        {/* Percentage */}
        <div
          className="mt-4 text-xs tracking-widest tabular-nums"
          style={{
            fontFamily: "'Fira Code', monospace",
            color: "hsl(0 0% 40%)",
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}
