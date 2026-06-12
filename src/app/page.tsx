"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
  Rocket,
  ExternalLink,
  ChevronDown,
  Send,
  X,
  MessageCircle,
  Code2,
  Cpu,
  Cloud,
  Database,
  Award,
  ArrowRight,
  Sparkles,
  Menu,
  Bot,
  ShoppingBag,
  Target,
  LineChart,
  Globe,
  Server
} from "lucide-react";

// Inline SVGs for icons not available in this lucide-react version
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── FADE-IN WRAPPER ────────────────────────────────────────────
const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) => {
  const dirs = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── SKILLS DATA ────────────────────────────────────────────────
const skillTabs = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Code2 size={14} />,
    skills: [
      { name: "React.js", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "JavaScript", icon: "🟨" },
      { name: "HTML5 / CSS3", icon: "🎨" },
      { name: "Tailwind CSS", icon: "💨" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Database size={14} />,
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express.js", icon: "🚂" },
      { name: "Python", icon: "🐍" },
      { name: "FastAPI", icon: "⚡" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
    ],
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: <Cpu size={14} />,
    skills: [
      { name: "LangChain", icon: "🦜" },
      { name: "Google Gemini API", icon: "💎" },
      { name: "OpenAI API", icon: "🤖" },
      { name: "HuggingFace", icon: "🤗" },
      { name: "RAG Pipelines", icon: "🔍" },
      { name: "Vector DBs", icon: "📊" },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: <Cloud size={14} />,
    skills: [
      { name: "AWS", icon: "☁️" },
      { name: "Google Cloud", icon: "🌐" },
      { name: "Docker", icon: "🐳" },
      { name: "GitHub Actions", icon: "⚙️" },
      { name: "Vercel", icon: "▲" },
      { name: "CI / CD", icon: "🔄" },
    ],
  },
];

// ── PROJECTS DATA ──────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "Dynamic AI Agent Platform",
    category: "ai",
    categoryLabel: "AI / ML",
    desc: "Scalable AI agent platform that dynamically invokes tools based on user queries — web search, email automation, database retrieval, and conversation history management.",
    tech: ["Python", "FastAPI", "Groq LLM", "OpenAI SDK", "JavaScript"],
    icon: <Bot size={28} color="white" />,
    github: "https://github.com/sowmyavankayalapati1507-sketch/dynamic-ai-agent-platform",
    live: null,
    gradient: "linear-gradient(135deg, #1e3a5f, #2d5282)",
    impact: "Automated tool execution reduced manual task handling significantly",
  },
  {
    id: 2,
    title: "Flask Docker Flower Shop",
    category: "fullstack",
    categoryLabel: "Full Stack",
    desc: "Full-stack e-commerce platform with product catalog and shopping functionality. Containerised with Docker and deployed to cloud — full end-to-end workflow.",
    tech: ["Python", "Flask", "Docker", "Render", "HTML/CSS/JS"],
    icon: <ShoppingBag size={28} color="white" />,
    github: "https://github.com/sowmyavankayalapati1507-sketch/flask-docker-flower-shop",
    live: null,
    gradient: "linear-gradient(135deg, #ffb800, #ff6b6b)",
    impact: "Production-deployed with Docker for full portability",
  },
  {
    id: 3,
    title: "AWS S3 Image Hosting Platform",
    category: "fullstack",
    categoryLabel: "Cloud",
    desc: "Cloud-based image hosting with upload, management, and secure sharing. AWS S3 integration for scalable storage with access control and secure file management.",
    tech: ["AWS S3", "HTML", "CSS", "Cloud Storage"],
    icon: <Cloud size={28} color="white" />,
    github: "https://github.com/sowmyavankayalapati1507-sketch/aws_s3-image-hosting",
    live: null,
    gradient: "linear-gradient(135deg, #1e3a5f, #ff6b6b)",
    impact: "Scalable cloud storage with controlled access mechanisms",
  },
  {
    id: 4,
    title: "AI Support Triage System",
    category: "ai",
    categoryLabel: "AI / ML",
    desc: "Support ticket classification system for automated issue categorisation and routing. Rule-based processing combined with AI-assisted decision-making workflows.",
    tech: ["Python", "NLP", "CSV Processing", "Data Analysis"],
    icon: <Target size={28} color="white" />,
    github: "https://github.com/sowmyavankayalapati1507-sketch/AI-Support-Triage-System",
    live: null,
    gradient: "linear-gradient(135deg, #2d5282, #1e3a5f)",
    impact: "Eliminated manual ticket sorting, improved routing efficiency",
  },
  {
    id: 5,
    title: "Adidas US Sales Dashboard",
    category: "data",
    categoryLabel: "Data",
    desc: "Interactive Power BI dashboard analysing Adidas US sales performance, profitability, and regional trends with KPIs designed for real business decision-making.",
    tech: ["Power BI", "Excel", "Data Analytics", "Data Viz"],
    icon: <LineChart size={28} color="white" />,
    github: "https://github.com/sowmyavankayalapati1507-sketch/addidas-sales-",
    live: null,
    gradient: "linear-gradient(135deg, #ffb800, #ff6b6b)",
    impact: "Identified top-performing regions & visualised monthly profit trends",
  },
];

// ── CERTS DATA ─────────────────────────────────────────────────
const certs = [
  { icon: <Cloud size={28} />, iconBg: "gold-bg", title: "AWS Cloud Foundations", issuer: "Amazon Web Services · 2025" },
  { icon: <Database size={28} />, iconBg: "coral-bg", title: "Oracle Cloud Infrastructure Badge", issuer: "Oracle · 2025" },
  { icon: <Globe size={28} />, iconBg: "navy-bg", title: "Web Development Internship", issuer: "ApexPlanet Software · Mar 2026" },
  { icon: <LineChart size={28} />, iconBg: "gold-bg", title: "Data Analytics Job Simulation", issuer: "Deloitte Australia via Forage · 2025" },
  { icon: <GraduationCap size={28} />, iconBg: "green-bg", title: "NPTEL Certification", issuer: "IITs & IISc · 2025" },
  { icon: <Server size={28} />, iconBg: "navy-bg", title: "Cloud Computing Training", issuer: "Pursuit Future Technologies · 2025" },
];

// ── TIMELINE DATA ──────────────────────────────────────────────
const timelineItems = [
  {
    type: "work" as const,
    typeLabel: "💼 Work",
    date: "May 2026 – Present",
    title: "AI Automation Engineer Intern",
    org: "Datavalley Inc · Remote",
    desc: "Engineered 5+ production LLM workflows using LangChain + OpenAI API — manual task completion time dropped 40% across 3 departments within 4 weeks. Architected multi-step AI agent systems saving 10+ weekly hours.",
    active: true,
  },
  {
    type: "work" as const,
    typeLabel: "💼 Work",
    date: "Dec 2025 – Mar 2026",
    title: "Web Development Intern",
    org: "ApexPlanet Software Pvt Ltd · Remote",
    desc: "Shipped 8+ responsive interfaces with 100% cross-device compatibility. Reduced user input errors by 30%. Collaborated in a 4-developer Agile team with zero missed deadlines across 3 sprint cycles.",
    active: false,
  },
  {
    type: "edu" as const,
    typeLabel: "🎓 Education",
    date: "2023 – 2027 (Expected)",
    title: "B.Tech in Computer Science Engineering",
    org: "Sri Padmavati Mahila Visvavidyalayam (SPMVV)",
    desc: "CGPA: 8.9 · Strong academic performance alongside 2 active internships and 6+ shipped projects. Coursework: DSA, DBMS, OS, Cloud Computing, Machine Learning.",
    active: false,
  },
];

// ── CHAT SUGGESTIONS ───────────────────────────────────────────
const chatSuggestions = [
  "What are your top skills?",
  "Tell me about your projects",
  "Are you available for internships?",
  "What's your tech stack?",
];

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================
export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("frontend");
  const [activeFilter, setActiveFilter] = useState("all");
  const [typewriterText, setTypewriterText] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    {
      role: "ai",
      text: "Hi! 👋 I'm Sowmya's AI assistant. Ask me anything about her skills, projects, experience, or availability!",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Full Stack Developer",
    "AI/ML Engineer",
    "Cloud Enthusiast",
    "React Specialist",
    "FastAPI Builder",
  ];

  // ── TYPEWRITER ───────────────────────────────────────────────
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        setTypewriterText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timer = setTimeout(type, 400);
          return;
        }
      } else {
        setTypewriterText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timer = setTimeout(type, 1800);
          return;
        }
      }
      timer = setTimeout(type, isDeleting ? 60 : 80);
    };

    timer = setTimeout(type, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── SCROLL ──────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── THEME ───────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // ── CHAT SCROLL ─────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // ── SEND MESSAGE ─────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    const userMsg = text.trim();
    if (!userMsg || isSending) return;

    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInputVal("");
    setIsSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  // ── FILTERED PROJECTS ────────────────────────────────────────
  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  // ── FORM SUBMIT ──────────────────────────────────────────────
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const dataObj = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Error submitting form:", data);
        setFormStatus("idle");
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setFormStatus("idle");
      alert("Failed to send message. Please try again.");
    }

    setTimeout(() => {
      if (formStatus !== "sending") setFormStatus("idle");
    }, 3000);
  };

  return (
    <>
      {/* ── SCROLL PROGRESS ──────────────────────────────────── */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <a href="#hero" className="nav-logo">SV.</a>

          <div className="nav-links">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="#contact" className="btn-primary btn-small">
              <span>Hire Me</span>
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: "var(--bg-glass)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid var(--border-color)",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <section id="hero" className="hero section">
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="hero-blob-3" />

          <div className="container hero-container">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  Available for Internships & Full-time
                </div>
              </motion.div>

              <motion.h1
                className="hero-name"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Sowmya
                <br />
                <span className="highlight">Vankayalapati</span>
              </motion.h1>

              <motion.div
                className="hero-tagline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span>{typewriterText}</span>
                <span className="typewriter-cursor" />
              </motion.div>

              <motion.p
                className="hero-bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I build <strong>AI-powered systems</strong> and <strong>full-stack web applications</strong> that actually
                work in production. Currently engineering LLM automation workflows at Datavalley Inc
                while finishing my B.Tech CSE at SPMVV, graduating 2027.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a href="#projects" className="btn-primary">
                  <span>View My Work</span>
                  <ArrowRight size={16} />
                </a>
                <a href="/resume.pdf" className="btn-ghost" target="_blank">
                  Download Resume
                </a>
              </motion.div>

              <motion.div
                className="hero-social"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <a
                  href="https://github.com/sowmyavankayalapati1507-sketch"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sowmyavankayalapati/"
                  target="_blank"
                  rel="noreferrer"
                  className="social-icon"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a href="mailto:sowmyavankayalapati.1507@gmail.com" className="social-icon">
                  <Mail size={20} />
                </a>
              </motion.div>

              <motion.div
                className="hero-stats"
                style={{ marginTop: "40px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="hero-stat">
                  <span className="hero-stat-number gradient-text">2</span>
                  <span className="hero-stat-label">Internships</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number gradient-text">6+</span>
                  <span className="hero-stat-label">Projects Shipped</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number gradient-text">40%</span>
                  <span className="hero-stat-label">Avg Efficiency Gain</span>
                </div>
                <div className="hero-stat">
                  <span className="hero-stat-number gradient-text">8.9</span>
                  <span className="hero-stat-label">CGPA</span>
                </div>
              </motion.div>
            </div>

            {/* Profile Visual */}
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="profile-wrapper">
                <div className="profile-ring-outer" />
                <div className="profile-ring-inner" />
                <div className="profile-image">
                  <img src="/profile.jpg" alt="Sowmya Vankayalapati" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Floating tech badges */}
                <div className="float-badge float-badge-1">
                  <span className="badge-dot coral" />
                  React + Next.js
                </div>
                <div className="float-badge float-badge-2">
                  <span className="badge-dot gold" />
                  Python + AI
                </div>
                <div className="float-badge float-badge-3">
                  <span className="badge-dot green" />
                  Open to Work
                </div>
              </div>
            </motion.div>
          </div>

          <a href="#about" className="scroll-indicator">
            <ChevronDown size={20} />
            <span>scroll</span>
          </a>
        </section>

        {/* ── ABOUT ────────────────────────────────────────── */}
        <section id="about" className="section">
          <div className="container">
            <FadeIn>
              <span className="eyebrow">Who I Am</span>
              <h2 className="section-title">About Me</h2>
            </FadeIn>

            <div className="about-grid">
              <FadeIn delay={0.1}>
                <div className="about-text">
                  <p>
                    I&apos;m Sowmya — a developer who loves turning complex ideas into clean,
                    working software. My stack spans React, Node.js, Python, and cloud platforms,
                    and I&apos;m especially excited about where AI meets real product development.
                  </p>
                  <p>
                    I&apos;m actively building projects that blend full-stack engineering with AI
                    automation — from intelligent web apps to automated data pipelines. I learn
                    fast, ship consistently, and care deeply about writing code that actually works
                    in production.
                  </p>
                  <p>
                    When I&apos;m not coding, I&apos;m exploring new AI models, contributing to
                    open-source, or reading about system design. I believe great software is built
                    by people who are genuinely curious — and I am.
                  </p>
                  <div style={{ marginTop: "28px" }}>
                    <a href="#contact" className="btn-primary">
                      <span>Let&apos;s Talk</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} direction="left">
                <div className="about-card">
                  <div className="availability-badge">
                    <span className="pulse-dot" />
                    Available for Internships
                  </div>
                  <ul className="quick-facts">
                    <li>
                      <div className="fact-icon"><MapPin size={16} /></div>
                      Open to Remote &amp; Relocation
                    </li>
                    <li>
                      <div className="fact-icon"><GraduationCap size={16} /></div>
                      B.Tech Computer Science
                    </li>
                    <li>
                      <div className="fact-icon"><Briefcase size={16} /></div>
                      Full Stack + AI + Cloud
                    </li>
                    <li>
                      <div className="fact-icon"><Rocket size={16} /></div>
                      Seeking Entry-Level Roles
                    </li>
                    <li>
                      <div className="fact-icon"><Sparkles size={16} /></div>
                      AI Enthusiast
                    </li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────── */}
        <section
          id="skills"
          className="section"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="container">
            <FadeIn>
              <span className="eyebrow">What I Work With</span>
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">
                Technologies I use to build full-stack applications, AI pipelines, and cloud
                infrastructure.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="skills-tabs">
                {skillTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="skills-content">
                {skillTabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}
                  >
                    {tab.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="skill-badge"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="skill-icon">{skill.icon}</span>
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────── */}
        <section id="projects" className="section">
          <div className="container">
            <FadeIn>
              <span className="eyebrow">My Work</span>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Real applications built from scratch — not tutorials, not clones.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="project-filters">
                {[
                  { id: "all", label: "All" },
                  { id: "fullstack", label: "Full Stack" },
                  { id: "ai", label: "AI / ML" },
                  { id: "data", label: "Data" },
                ].map((f) => (
                  <button
                    key={f.id}
                    className={`filter-btn ${activeFilter === f.id ? "active" : ""}`}
                    onClick={() => setActiveFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </FadeIn>

            <motion.div className="projects-grid" layout>
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    className="project-card"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="project-info">
                      <div className="project-header">
                        <div className="project-icon-wrapper" style={{ background: project.gradient }}>
                          {project.icon}
                        </div>
                        <span className="project-category-tag">{project.categoryLabel}</span>
                      </div>
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.desc}</p>
                      {"impact" in project && project.impact && (
                        <div style={{
                          fontSize: "0.8rem",
                          color: "var(--coral)",
                          background: "rgba(255,107,107,0.08)",
                          borderLeft: "2px solid var(--coral)",
                          padding: "6px 12px",
                          borderRadius: "0 8px 8px 0",
                          marginBottom: "16px",
                          fontWeight: 500,
                        }}>
                          ✦ {(project as typeof project & { impact: string }).impact}
                        </div>
                      )}
                      <div className="project-tech-stack">
                        {project.tech.map((t) => (
                          <span key={t} className="tech-tag">{t}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-ghost btn-small"
                        >
                          <GithubIcon size={14} />
                          Code
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary btn-small"
                          >
                            <span><ExternalLink size={14} /> Live</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ───────────────────────────────── */}
        <section
          id="certifications"
          className="section"
          style={{ background: "var(--bg-secondary)" }}
        >
          <div className="container">
            <FadeIn>
              <span className="eyebrow">Achievements</span>
              <h2 className="section-title">Certifications</h2>
              <p className="section-subtitle">
                Continuous learning is part of my engineering mindset.
              </p>
            </FadeIn>

            <div className="certs-grid">
              {certs.map((cert, i) => (
                <FadeIn key={cert.title} delay={i * 0.08}>
                  <div className="cert-card">
                    <div className={`cert-icon ${cert.iconBg}`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <span>{cert.icon}</span>
                    </div>
                    <div className="cert-info">
                      <h4>{cert.title}</h4>
                      <p className="cert-issuer">{cert.issuer}</p>
                    </div>
                    <Award
                      size={16}
                      style={{ marginLeft: "auto", color: "var(--text-muted)" }}
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE & EDUCATION ───────────────────────── */}
        <section id="experience" className="section">
          <div className="container">
            <FadeIn>
              <span className="eyebrow">My Journey</span>
              <h2 className="section-title">Experience &amp; Education</h2>
            </FadeIn>

            <div className="timeline">
              {timelineItems.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.15} direction="left">
                  <div className="timeline-item">
                    <div className={`timeline-dot ${item.active ? "active" : ""}`} />
                    <div className="timeline-content">
                      <span className={`timeline-type ${item.type}`}>{item.typeLabel}</span>
                      <span className="timeline-date">{item.date}</span>
                      <h3>{item.title}</h3>
                      <h4>{item.org}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────── */}
        <section id="contact" className="section">
          <div className="container">
            <FadeIn>
              <span className="eyebrow">Get In Touch</span>
              <h2 className="section-title">Let&apos;s Build Something</h2>
              <p className="section-subtitle">
                I&apos;m actively looking for internship and entry-level opportunities. My inbox is
                always open.
              </p>
            </FadeIn>

            <div className="contact-grid">
              <FadeIn delay={0.1}>
                <div className="contact-form-wrapper">
                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-input"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        className="form-textarea"
                        rows={4}
                        placeholder="Tell me about the role or opportunity..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary w-full"
                      disabled={formStatus === "sending" || formStatus === "sent"}
                      style={{ width: "100%" }}
                    >
                      <span>
                        {formStatus === "idle" && "Send Message"}
                        {formStatus === "sending" && "Sending..."}
                        {formStatus === "sent" && "✅ Message Sent!"}
                      </span>
                      {formStatus === "idle" && <Send size={16} />}
                    </button>
                  </form>
                </div>
              </FadeIn>

              <FadeIn delay={0.25} direction="left">
                <div className="contact-info-cards">
                  <a href="mailto:sowmyavankayalapati.1507@gmail.com" className="info-card">
                    <div className="info-card-icon"><Mail size={20} /></div>
                    <div>
                      <div className="info-card-title">Email</div>
                      <div className="info-card-value">sowmyavankayalapati.1507@gmail.com</div>
                    </div>
                    <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sowmyavankayalapati/"
                    target="_blank"
                    rel="noreferrer"
                    className="info-card"
                  >
                    <div className="info-card-icon"><LinkedinIcon size={20} /></div>
                    <div>
                      <div className="info-card-title">LinkedIn</div>
                      <div className="info-card-value">www.linkedin.com/in/sowmyavankayalapati/</div>
                    </div>
                    <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
                  </a>
                  <a
                    href="https://github.com/sowmyavankayalapati1507-sketch"
                    target="_blank"
                    rel="noreferrer"
                    className="info-card"
                  >
                    <div className="info-card-icon"><GithubIcon size={20} /></div>
                    <div>
                      <div className="info-card-title">GitHub</div>
                      <div className="info-card-value">sowmyavankayalapati1507-sketch</div>
                    </div>
                    <ArrowRight size={16} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
                  </a>
                  <div className="info-card">
                    <div className="info-card-icon" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
                      <span>⚡</span>
                    </div>
                    <div>
                      <div className="info-card-title">Response Time</div>
                      <div className="info-card-value">Within 24 hours</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <span className="footer-brand-logo">SV.</span>
              <p className="footer-tagline">
                Full Stack Developer &amp; AI Engineer building the future, one commit at a time.
              </p>
              <div className="footer-social">
                <a href="https://github.com/sowmyavankayalapati1507-sketch" target="_blank" rel="noreferrer" className="social-icon">
                  <GithubIcon size={18} />
                </a>
                <a href="https://www.linkedin.com/in/sowmyavankayalapati/" target="_blank" rel="noreferrer" className="social-icon">
                  <LinkedinIcon size={18} />
                </a>
                <a href="mailto:sowmyavankayalapati.1507@gmail.com" className="social-icon">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="footer-heading">Navigation</h4>
              <ul className="footer-links">
                {["About", "Skills", "Projects", "Experience", "Contact"].map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase()}`}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-heading">Tools</h4>
              <ul className="footer-links">
                <li><a href="/resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
                <li><a href="#ai-assistant">AI Assistant</a></li>
                <li><a href="https://github.com/sowmyavankayalapati1507-sketch" target="_blank" rel="noreferrer">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 Sowmya Vankayalapati. All rights reserved.
            </p>
            <p className="footer-made-with">
              Built with Next.js &amp; <span>♥</span>
            </p>
          </div>
        </div>
      </footer>

      {/* ── FLOATING CHAT WIDGET ─────────────────────────────── */}
      <div className="chat-widget">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              className="chat-panel"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">🤖</div>
                  <div>
                    <span className="chat-name">Sowmya&apos;s AI</span>
                    <span className="chat-status">● Powered by Mistral-7B</span>
                  </div>
                </div>
                <button
                  className="chat-close"
                  onClick={() => setChatOpen(false)}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`msg ${msg.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {isSending && (
                  <div className="msg ai typing">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {messages.length <= 2 && (
                <div className="chat-suggestions">
                  {chatSuggestions.map((s) => (
                    <button
                      key={s}
                      className="suggestion-chip"
                      onClick={() => sendMessage(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div className="chat-input-area">
                <textarea
                  className="chat-input"
                  placeholder="Ask about Sowmya..."
                  value={inputVal}
                  rows={1}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage(inputVal);
                    }
                  }}
                />
                <button
                  className="chat-send-btn"
                  onClick={() => sendMessage(inputVal)}
                  disabled={isSending || !inputVal.trim()}
                  aria-label="Send"
                >
                  <Send size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="chat-toggle-btn"
          onClick={() => setChatOpen((o) => !o)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open AI chat"
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} color="white" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={24} color="white" />
              </motion.span>
            )}
          </AnimatePresence>
          {!chatOpen && <span className="chat-notify" />}
        </motion.button>
      </div>
    </>
  );
}
