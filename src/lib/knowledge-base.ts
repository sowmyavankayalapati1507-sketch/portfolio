export interface KnowledgeChunk {
  id: string;
  content: string;
  category: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  // ── PERSONAL ─────────────────────────────────────────────────
  {
    id: "personal-1",
    category: "personal",
    content:
      "Sowmya Vankatalapati is a Full-Stack Python Developer and AI Automation Engineer based in Tirupati, Andhra Pradesh, India. She is currently pursuing B.Tech in Computer Science Engineering at Sri Padmavati Mahila Visvavidyalayam (SPMVV), graduating in 2027, with a CGPA of 8.9. She builds AI-powered systems and full-stack applications that work in production.",
  },
  {
    id: "personal-2",
    category: "personal",
    content:
      "Sowmya is a Computer Science student who got hooked on AI automation early — watching an LLM pipeline replace 40% of manual work in three weeks is genuinely exciting to her. She is building toward the intersection of AI automation, cloud infrastructure, and product. She has completed 2 internships, shipped 6+ projects, achieved 40% average efficiency gains, and maintains an 8.9 CGPA.",
  },
  {
    id: "contact-1",
    category: "contact",
    content:
      "Contact Sowmya via email: sowmyavankayalapati.1507@gmail.com. Phone: +91 6305837120. LinkedIn: www.linkedin.com/in/sowmyavankayalapati/. GitHub: github.com/sowmyavankayalapati1507-sketch. She responds within 24 hours.",
  },

  // ── SKILLS ───────────────────────────────────────────────────
  {
    id: "skills-ai",
    category: "skills",
    content:
      "AI and Machine Learning skills: LangChain & LLM Pipelines (88%), Prompt Engineering (92%), OpenAI / Groq APIs (85%), Scikit-Learn / NumPy / Pandas (78%). Sowmya specialises in building production LLM workflows and multi-step AI agent systems.",
  },
  {
    id: "skills-backend",
    category: "skills",
    content:
      "Backend skills: Python OOP & Automation (93%), FastAPI & REST APIs (84%), Flask (80%), SQL & Databases (72%). Sowmya builds scalable server-side applications and API integrations in Python.",
  },
  {
    id: "skills-cloud",
    category: "skills",
    content:
      "Cloud and DevOps skills: AWS — EC2, S3, IAM (80%), Docker & Containerisation (76%), CI/CD Pipelines (70%), Git & GitHub (88%). Experience deploying containerised applications to cloud platforms.",
  },
  {
    id: "skills-frontend",
    category: "skills",
    content:
      "Frontend and Data skills: HTML5 / CSS3 / JavaScript (87%), Responsive Web Design (85%), Data Analytics / Tableau (74%), Power BI / Excel (72%). Delivered 8+ responsive interfaces at ApexPlanet with 100% cross-device compatibility.",
  },

  // ── EXPERIENCE ───────────────────────────────────────────────
  {
    id: "exp-datavalley",
    category: "experience",
    content:
      "AI Automation Engineer Intern at Datavalley Inc (May 2026 – Present, Remote). Key achievements: Engineered 5+ production LLM workflows using LangChain + OpenAI API — manual task completion time dropped 40% across 3 departments within 4 weeks. Eliminated 6+ weekly staff hours by automating decision logic via prompt engineering. Architected multi-step AI agent systems saving 10+ weekly hours. Authored technical specs and onboarding guides adopted by 5+ teammates, cutting ramp-up time in half. Stack: Python, LangChain, OpenAI API, FastAPI, Prompt Engineering, Gen AI.",
  },
  {
    id: "exp-apexplanet",
    category: "experience",
    content:
      "Web Development Intern at ApexPlanet Software Pvt Ltd (December 2025 – March 2026, Remote). Key achievements: Shipped 8+ responsive interfaces — 100% cross-device compatibility across mobile, tablet, and desktop. Received intern completion certificate. Reduced user input errors by 30% through client-side form validation. Collaborated in a 4-developer Agile team with zero missed deadlines across 3 sprint cycles. Stack: HTML5, CSS3, JavaScript ES6+, DOM Manipulation, Git, REST APIs.",
  },
  {
    id: "exp-cloud-training",
    category: "experience",
    content:
      "Cloud Computing Training at Pursuit Future Technologies (2025). Completed industry-oriented Cloud Computing program covering infrastructure, deployment, networking, and storage on cloud platforms. Topics: Cloud Computing, Virtualisation, Networking, Storage Services.",
  },

  // ── PROJECTS ─────────────────────────────────────────────────
  {
    id: "project-ai-agent",
    category: "projects",
    content:
      "Project 1: Dynamic AI Agent Platform — Scalable AI agent platform that dynamically invokes tools based on user queries: web search, email automation, database retrieval, and conversation history management. Automated tool execution reduced manual task handling significantly. Stack: Python, FastAPI, Groq LLM, OpenAI SDK, JavaScript. GitHub: github.com/sowmyavankayalapati1507-sketch",
  },
  {
    id: "project-automation",
    category: "projects",
    content:
      "Project 2: AI-Powered Automation System — End-to-end workflow automation platform for education-domain tasks. LLM decision logic with task-routing for data classification and response generation. Impact: 60% reduction in manual processing time across 5+ task categories. Stack: Python, LangChain, OpenAI API, Gen AI.",
  },
  {
    id: "project-flask-shop",
    category: "projects",
    content:
      "Project 3: Flask Docker Flower Shop — Full-stack e-commerce platform with product catalog and shopping functionality. Containerised with Docker and deployed to cloud. Production-deployed with Docker for full portability and scalability. Stack: Python, Flask, Docker, Render, HTML/CSS/JS.",
  },
  {
    id: "project-aws-s3",
    category: "projects",
    content:
      "Project 4: AWS S3 Image Hosting Platform — Cloud-based image hosting with upload, management, and secure sharing. AWS S3 integration for scalable storage with access control and secure file management. Stack: AWS S3, HTML, CSS, Cloud Storage.",
  },
  {
    id: "project-support-triage",
    category: "projects",
    content:
      "Project 5: AI Support Triage System — Support ticket classification system for automated issue categorisation and routing. Rule-based processing combined with AI-assisted decision-making workflows. Eliminated manual ticket sorting and improved routing efficiency. Stack: Python, NLP, CSV Processing, Data Analysis.",
  },
  {
    id: "project-dashboard",
    category: "projects",
    content:
      "Project 6: Adidas US Sales Dashboard — Interactive Power BI dashboard analysing Adidas US sales performance, profitability, and regional trends with KPIs designed for real business decision-making. Identified top-performing regions and visualised monthly profit trends. Stack: Power BI, Excel, Data Analytics, Data Visualisation.",
  },

  // ── EDUCATION ────────────────────────────────────────────────
  {
    id: "education-btech",
    category: "education",
    content:
      "B.Tech in Computer Science Engineering at Sri Padmavati Mahila Visvavidyalayam (SPMVV), Tirupati, Andhra Pradesh. Expected graduation: 2027. CGPA: 8.9. Strong academic performance alongside active internship and project work.",
  },

  // ── CERTIFICATIONS ───────────────────────────────────────────
  {
    id: "certs",
    category: "certifications",
    content:
      "Certifications: (1) AWS Cloud Foundations — Amazon Web Services, 2025 (EC2, S3, IAM, Cloud Security). (2) Oracle Cloud Infrastructure Badge — Oracle, 2025 (OCI, Cloud Architecture, Networking). (3) Web Development Internship Certificate — ApexPlanet Software, March 2026. (4) Data Analytics Job Simulation — Deloitte Australia via Forage, 2025 (Excel, Tableau, EDA, BI). (5) NPTEL Certification — IITs & IISc, 2025 (Engineering Fundamentals, Problem Solving). (6) Cloud Computing Training — Pursuit Future Technologies, 2025.",
  },

  // ── FAQ ──────────────────────────────────────────────────────
  {
    id: "faq-available",
    category: "faq",
    content:
      "Sowmya is currently available for internships, freelance projects, and entry-level full-time roles. She is open to remote work and opportunities in AI automation, full-stack development, and cloud engineering. She is based in Tirupati, Andhra Pradesh, and open to relocation.",
  },
  {
    id: "faq-strengths",
    category: "faq",
    content:
      "Sowmya's top strengths: (1) AI automation — builds real LangChain/LLM pipelines that cut 40%+ manual work in production. (2) Python expertise — 93% proficiency, used across AI, backend, and automation. (3) Full-stack capability — from responsive frontend (8+ interfaces shipped) to FastAPI backends. (4) Impact-driven — every project has measurable results (40% efficiency gain, 30% error reduction, 60% time saved). (5) 8.9 CGPA showing strong fundamentals alongside real-world work.",
  },
  {
    id: "faq-why-hire",
    category: "faq",
    content:
      "Hire Sowmya because she combines exceptional AI/ML engineering skills with full-stack development experience. She has 2 internships with proven impact metrics — not just tasks completed, but hours saved and efficiency gained. She shipped 6 real projects with measurable results. Her CGPA of 8.9 shows strong fundamentals. She is a fast learner who delivers production-quality work.",
  },
  {
    id: "faq-services",
    category: "faq",
    content:
      "Sowmya is open to freelance projects in Web Development, AI Automation, and Cloud & DevOps. For project inquiries, contact her at sowmyavankayalapati.1507@gmail.com.",
  },
  {
    id: "faq-tech",
    category: "faq",
    content:
      "Sowmya's primary technology stack: Python (primary language at 93%), LangChain + OpenAI API (AI pipelines), FastAPI + Flask (backend APIs), HTML/CSS/JavaScript (frontend), AWS EC2/S3/IAM (cloud), Docker (containerisation), Power BI + Tableau (data visualisation), Git/GitHub (version control).",
  },
];

export const systemPrompt = `You are NOVA — Sowmya Vankatalapati's personal AI portfolio assistant. You help recruiters, hiring managers, founders, and visitors learn about Sowmya — her skills, projects, experience, certifications, and availability.

Be friendly, professional, and enthusiastic about her work. Answer questions based only on the provided context. If something isn't covered, suggest contacting Sowmya directly at sowmyavankayalapati.1507@gmail.com. Keep responses concise (2-4 sentences). Highlight specific impact metrics when relevant (40% efficiency gain, 6+ hours saved per week, 8.9 CGPA, etc.). Never fabricate information.`;
