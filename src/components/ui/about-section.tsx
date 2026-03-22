"use client";

import React, { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className = "", delay = 0 }) => {
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
    return () => { if (current) observer.unobserve(current); };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export { AnimatedSection };

interface AboutSectionProps {
  isDark: boolean;
}

export default function AboutSection({ isDark }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 2%)" : "hsl(0 0% 96%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: "#C3E41D" }}
      />

      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            style={{ fontFamily: "'Fira Code', monospace", color: "#C3E41D" }}
          >
            ABOUT
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-16"
            style={{ backgroundColor: "#C3E41D" }}
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left - Image & Quick Info */}
          <AnimatedSection delay={200}>
            <div className="relative">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl mb-8 max-w-[400px]"
                style={{
                  border: `2px solid ${isDark ? "rgba(195, 228, 29, 0.2)" : "rgba(195, 228, 29, 0.3)"}`,
                }}
              >
                <img
                  src="/profile.png"
                  alt="Shahin Ali"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="space-y-3 mt-8">
                {[
                  { icon: Mail, text: "shahinali.mec@gmail.com", href: "mailto:shahinali.mec@gmail.com" },
                  { icon: Phone, text: "+91 8547270067", href: "tel:+918547270067" },
                  { icon: MapPin, text: "Kochi, Kerala, India" },
                  { icon: Calendar, text: "Born 26th October, 2003" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <item.icon
                      className="w-5 h-5 transition-colors duration-300"
                      style={{ color: "#C3E41D" }}
                    />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm md:text-base transition-colors duration-300 hover:underline"
                        style={{ color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)" }}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span
                        className="text-sm md:text-base"
                        style={{ color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)" }}
                      >
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {[
                  { icon: Github, href: "https://github.com/shaaahin-ali", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/shahin-ali-tp/", label: "LinkedIn" },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 92%)",
                      border: `1px solid ${isDark ? "rgba(195, 228, 29, 0.15)" : "rgba(195, 228, 29, 0.3)"}`,
                    }}
                    aria-label={item.label}
                  >
                    <item.icon className="w-6 h-6" style={{ color: "#C3E41D" }} />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Bio */}
          <AnimatedSection delay={400}>
            <div className="space-y-6">
              <h3
                className="text-2xl md:text-3xl font-bold tracking-tight"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                Hey, I&apos;m Shahin! 👋
              </h3>
              
              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Antic', sans-serif",
                  color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                }}
              >
                I&apos;m a <span style={{ color: "#C3E41D", fontWeight: 600 }}>B.Tech Computer Science Engineering</span> student 
                at <span style={{ color: "#C3E41D", fontWeight: 600 }}>Govt. Model Engineering College, Kochi</span> (KTU) 
                with a CGPA of <span style={{ color: "#C3E41D", fontWeight: 600 }}>9.39</span>.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Antic', sans-serif",
                  color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                }}
              >
                I&apos;m passionate about building intelligent systems at the intersection of 
                <span style={{ color: "#C3E41D", fontWeight: 600 }}> AI, web development, and real-world problem solving</span>. 
                From semantic retrieval systems to disaster response platforms and deepfake detection — 
                I love turning complex problems into elegant solutions.
              </p>

              <p
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: "'Antic', sans-serif",
                  color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                }}
              >
                When I&apos;m not coding, you&apos;ll find me sketching designs, leading event teams, 
                or exploring new frontiers in <span style={{ color: "#C3E41D", fontWeight: 600 }}>cloud computing</span> and 
                <span style={{ color: "#C3E41D", fontWeight: 600 }}> machine learning</span>.
              </p>

              {/* Interests */}
              <div className="pt-4">
                <h4
                  className="text-sm uppercase tracking-widest mb-4 font-bold"
                  style={{ color: "#C3E41D" }}
                >
                  Interests
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Cloud Computing",
                    "Machine Learning",
                    "Web Development",
                    "Artificial Intelligence",
                    "Game Development",
                  ].map((interest) => (
                    <span
                      key={interest}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
                      style={{
                        backgroundColor: isDark ? "rgba(195, 228, 29, 0.1)" : "rgba(195, 228, 29, 0.15)",
                        color: "#C3E41D",
                        border: "1px solid rgba(195, 228, 29, 0.2)",
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              <div className="pt-2">
                <h4
                  className="text-sm uppercase tracking-widest mb-4 font-bold"
                  style={{ color: "#C3E41D" }}
                >
                  Hobbies
                </h4>
                <div className="flex flex-wrap gap-3">
                  {["Reading", "Sketching", "Drawing", "Designing", "Football"].map((hobby) => (
                    <span
                      key={hobby}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-default"
                      style={{
                        backgroundColor: isDark ? "hsl(0 0% 8%)" : "hsl(0 0% 92%)",
                        color: isDark ? "hsl(0 0% 70%)" : "hsl(0 0% 40%)",
                        border: `1px solid ${isDark ? "hsl(0 0% 15%)" : "hsl(0 0% 85%)"}`,
                      }}
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
