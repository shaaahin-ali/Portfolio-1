import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shahin Ali — Portfolio",
  description:
    "Shahin Ali — B.Tech CSE student at Govt. Model Engineering College, Kochi. Full-stack developer, AI enthusiast, and creative thinker. Explore projects, skills, and experience.",
  keywords: [
    "Shahin Ali",
    "Portfolio",
    "Full Stack Developer",
    "AI",
    "Machine Learning",
    "React",
    "Next.js",
    "Python",
    "Web Developer",
    "Kerala",
  ],
  authors: [{ name: "Shahin Ali" }],
  openGraph: {
    title: "Shahin Ali — Portfolio",
    description:
      "Full-stack developer, AI enthusiast, and creative thinker. Explore my projects, skills, and experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} h-full antialiased dark`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Antic&display=swap"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          margin: 0,
        }}
      >
        {children}
      </body>
    </html>
  );
}
