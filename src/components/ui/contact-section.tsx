"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Github, Linkedin, Mail, Phone, ArrowUpRight, Heart } from "lucide-react";

interface ContactSectionProps {
  isDark: boolean;
}

export default function ContactSection({ isDark }: ContactSectionProps) {
  const [titleInView, setTitleInView] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFormInView(true);
      },
      { threshold: 0.1 }
    );
    const current = formRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/shaaahin-ali",
      handle: "@shaaahin-ali",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shahin-ali-tp/",
      handle: "Shahin Ali",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:shahinali.mec@gmail.com",
      handle: "shahinali.mec@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      href: "tel:+918547270067",
      handle: "+91 8547270067",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
      style={{
        backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 98%)",
        color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
      }}
    >
      <div
        className="absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl"
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
            CONTACT
          </h2>
          <div
            className="w-24 h-1 rounded-full mb-8"
            style={{ backgroundColor: "#C3E41D" }}
          />
          <p
            className="text-xl md:text-2xl mb-16 max-w-2xl"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 60%)" : "hsl(0 0% 45%)",
            }}
          >
            Have an exciting project in mind? Let&apos;s build something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Links */}
          <div
            ref={formRef}
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            <h3
              className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
              style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
            >
              Get in Touch
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Phone" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-5 rounded-xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 95%)",
                    border: `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)"}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(195, 228, 29, 0.4)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(195, 228, 29, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: isDark ? "rgba(195, 228, 29, 0.1)" : "rgba(195, 228, 29, 0.15)",
                      }}
                    >
                      <link.icon className="w-5 h-5" style={{ color: "#C3E41D" }} />
                    </div>
                    <div>
                      <p
                        className="text-sm font-bold"
                        style={{ fontFamily: "'Fira Code', monospace" }}
                      >
                        {link.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
                      >
                        {link.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: isDark ? "hsl(0 0% 40%)" : "hsl(0 0% 60%)" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Message */}
          <div
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            }}
          >
            <h3
              className="text-xs uppercase tracking-[0.3em] mb-8 font-bold"
              style={{ color: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 50%)" }}
            >
              Send a Message
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;
                const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;
                window.open(
                  `mailto:shahinali.mec@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0A%0AFrom: ${name} (${email})`,
                  "_self"
                );
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-4 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 95%)",
                  border: `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)"}`,
                  color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
                  fontFamily: "'Antic', sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(195, 228, 29, 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(195, 228, 29, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-4 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 95%)",
                  border: `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)"}`,
                  color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
                  fontFamily: "'Antic', sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(195, 228, 29, 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(195, 228, 29, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                required
                className="w-full p-4 rounded-xl text-sm transition-all duration-300 outline-none focus:ring-2 resize-none"
                style={{
                  backgroundColor: isDark ? "hsl(0 0% 4%)" : "hsl(0 0% 95%)",
                  border: `1px solid ${isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)"}`,
                  color: isDark ? "hsl(0 0% 90%)" : "hsl(0 0% 15%)",
                  fontFamily: "'Antic', sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(195, 228, 29, 0.5)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(195, 228, 29, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 88%)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
              <button
                type="submit"
                className="w-full p-4 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#C3E41D",
                  color: "hsl(0 0% 0%)",
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                <Send className="w-4 h-4" />
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 pt-8 text-center"
          style={{
            borderTop: `1px solid ${isDark ? "hsl(0 0% 10%)" : "hsl(0 0% 90%)"}`,
          }}
        >
          <p
            className="text-sm flex items-center justify-center gap-1.5"
            style={{
              fontFamily: "'Antic', sans-serif",
              color: isDark ? "hsl(0 0% 40%)" : "hsl(0 0% 55%)",
            }}
          >
            Built with <Heart className="w-3.5 h-3.5 inline" style={{ color: "#C3E41D" }} /> by Shahin Ali · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
