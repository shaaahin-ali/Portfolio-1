"use client";

import React from "react";
import { Download } from "lucide-react";

interface ResumeButtonProps {
  isDark: boolean;
}

export default function ResumeButton({ isDark }: ResumeButtonProps) {
  return (
    <a
      href="/SHAHINALI - RESUME.pdf"
      download="Shahin_Ali_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-xl group"
      style={{
        backgroundColor: "#C3E41D",
        color: "hsl(0 0% 0%)",
        fontFamily: "'Fira Code', monospace",
        boxShadow: "0 4px 20px rgba(195, 228, 29, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 40px rgba(195, 228, 29, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(195, 228, 29, 0.3)";
      }}
    >
      <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      <span className="hidden sm:inline">RESUME</span>
    </a>
  );
}
