import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sowmya Vankayalapati | Full Stack & AI Developer",
  description:
    "Portfolio of Sowmya Vankayalapati — Full Stack Developer & AI Engineer. Building end-to-end web applications, RAG pipelines, and cloud-native solutions. Open to internships and entry-level roles.",
  keywords: [
    "Sowmya Vankayalapati",
    "Sowmya Vankayalapati Portfolio",
    "Full Stack Developer",
    "AI Engineer",
    "AI Developer",
    "Machine Learning",
    "LangChain",
    "Retrieval Augmented Generation",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Cloud",
    "AWS",
    "Portfolio",
    "Entry-level developer",
    "Internship",
  ],
  verification: {
    google: "54Z5X_l3QEDarJzQc9pgpTGdrB0n-MwsARidbyHUd9o",
  },
  openGraph: {
    title: "Sowmya Vankayalapati | Full Stack & AI Developer",
    description:
      "Building end-to-end web apps with AI. React, Next.js, Python, LangChain, Cloud. Open to internships.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="ARtlgAUq8LNikgV7A6n8ycbYQVuqo1hofYdLpHvnchw"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sowmya Vankayalapati",
          "url": "https://sowmya.qzz.io",
          "jobTitle": "Full Stack & AI Developer",
          "sameAs": []
        }` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
