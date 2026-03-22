"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor({ isDark }: { isDark: boolean }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const handleOverInteractive = () => setIsHovering(true);
    const handleOutInteractive = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [role='button']"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleOverInteractive);
      el.addEventListener("mouseleave", handleOutInteractive);
    });

    const animationId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleOverInteractive);
        el.removeEventListener("mouseleave", handleOutInteractive);
      });
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
        style={{
          width: isHovering ? "60px" : "40px",
          height: isHovering ? "60px" : "40px",
          borderRadius: "50%",
          border: `2px solid ${isDark ? "rgba(195, 228, 29, 0.5)" : "rgba(195, 228, 29, 0.7)"}`,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.3s ease",
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          width: isHovering ? "8px" : "6px",
          height: isHovering ? "8px" : "6px",
          borderRadius: "50%",
          backgroundColor: "#C3E41D",
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
