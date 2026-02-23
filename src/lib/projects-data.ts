import chempImg from "@/assets/projects/chemp.png";
import gaiaImg from "@/assets/projects/gaia.png";
import marsadImg from "@/assets/projects/marsad.png";
import narsaImg from "@/assets/projects/narsa.png";
import ftTranscendenceImg from "@/assets/projects/ft_transcendence.png";
import portfolioLight from "@/assets/projects/portfolio-light.png";
import portfolioProjects from "@/assets/projects/portfolio-projects.png";
import portfolioModal from "@/assets/projects/portfolio-modal.png";
import portfolioDark from "@/assets/projects/portfolio-dark.png";

export interface Project {
  title: string;
  subtitle: string;
  organization: string;
  role: string;
  description: string;
  highlights: string[];
  tags: string[];
  images: string[];
  color: string;
  link: string | null;
}

export const projects: Project[] = [
  {
    title: "Portfolio",
    subtitle: "Personal Portfolio & Digital Identity",
    organization: "Personal Project",
    role: "Full-Stack Developer & Designer",
    description:
      "A meticulously crafted personal portfolio showcasing a Japanese samurai-inspired aesthetic with dark/light themes, smooth animations, and a curated project gallery. Built with React, TypeScript, and Framer Motion, featuring interactive modals, falling leaves particles, and a fully responsive design.",
    highlights: [
      "Designed a unique Japanese samurai-inspired UI with custom theme tokens & dual mode",
      "Built interactive project gallery with animated modals & image carousels",
      "Implemented smooth scroll-triggered animations using Framer Motion",
      "Created custom particle effects (falling leaves) & sword page transitions",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    images: [portfolioDark, portfolioLight, portfolioProjects, portfolioModal],
    color: "from-red-500/20 to-rose-600/20",
    link: null,
  },
  {
    title: "Chemp.AI",
    subtitle: "AI-Powered Communication & Wellbeing Platform",
    organization: "Startup — Spain",
    role: "Backend Architect & Full-Stack Developer",
    description:
      "An innovative platform leveraging AI to provide professional communication coaching and wellbeing support. Combines conversational AI, emotional intelligence assessment, and health tracking into a comprehensive solution.",
    highlights: [
      "Architected complete NestJS backend with 17-table PostgreSQL schema",
      "Integrated 3 specialized AI assistants (GPT-4o) with token optimization",
      "Built 9 feature modules: AI messaging, role-play coaching, wellbeing tracker",
      "Implemented Stripe subscriptions, push notifications & OAuth2 auth",
    ],
    tags: ["NestJS", "TypeScript", "PostgreSQL", "OpenAI", "Stripe", "Redis", "Docker"],
    images: [chempImg],
    color: "from-emerald-500/20 to-teal-600/20",
    link: null,
  },
  {
    title: "NARSA",
    subtitle: "Digital Driving Exam Platform",
    organization: "DICE — UM6P",
    role: "Full-Stack Developer",
    description:
      "A national digital platform modernizing Morocco's practical driving exam process. Integrates advanced digital systems into test vehicles with a comprehensive admin platform connected to all driving centers nationwide.",
    highlights: [
      "Developed real-time exam monitoring dashboard across all driving centers",
      "Built digital evaluation system with standardized scoring & e-signatures",
      "Implemented center management, vehicle fleet tracking & examiner scheduling",
      "Created analytics dashboards with data visualization & reporting exports",
    ],
    tags: ["React", "REST API", "WebSocket", "PostgreSQL", "Real-time"],
    images: [narsaImg],
    color: "from-blue-500/20 to-indigo-600/20",
    link: null,
  },
  {
    title: "GAIA",
    subtitle: "AI Assistant for Industrial Design",
    organization: "DICE — UM6P",
    role: "Backend Architect",
    description:
      "An AI-powered platform revolutionizing industrial schema design and simulation. Enables users to create, design, and simulate complex industrial systems through an intuitive digital workspace with AI-generated configurations.",
    highlights: [
      "Designed scalable microservices architecture with API Gateway pattern",
      "Built AI integration layer for automated schema generation & optimization",
      "Implemented polyglot persistence with relational & document databases",
      "Developed async job processing for compute-intensive AI operations",
    ],
    tags: ["Microservices", "API Gateway", "AI/ML", "Docker", "Message Queues"],
    images: [gaiaImg],
    color: "from-purple-500/20 to-pink-600/20",
    link: null,
  },
  {
    title: "MARSSAD",
    subtitle: "Labor Market Intelligence Platform",
    organization: "DICE — UM6P",
    role: "Full-Stack Developer",
    description:
      "A comprehensive digital platform providing intelligent analysis for Morocco's labor market. Delivers interactive dashboards, AI digital assistants, and real-time data insights for employment research and policy decisions.",
    highlights: [
      "Developed dynamic forms system with configurable builder & conditional logic",
      "Extended AI capabilities with sector-specific digital assistants",
      "Built ETL pipelines for real-time data integration from public institutions",
      "Modernized tech stack with library migrations & performance optimizations",
    ],
    tags: ["JavaScript", "REST API", "ETL", "Data Viz", "NLP", "WebSocket"],
    images: [marsadImg],
    color: "from-amber-500/20 to-orange-600/20",
    link: "https://marssad.ma",
  },
  {
    title: "ft_transcendence",
    subtitle: "Real-Time Multiplayer Ping Pong Web App",
    organization: "42 Network — Common Core",
    role: "Full-Stack Developer",
    description:
      "A collaborative capstone project building a real-time multiplayer ping pong application from design to production. Features live gameplay via WebSockets, user authentication, chat, and a fully containerized architecture with Docker.",
    highlights: [
      "Designed full UI/UX in Figma before implementation",
      "Built NestJS backend with Prisma ORM & PostgreSQL for type-safe data access",
      "Implemented real-time gameplay & chat using WebSocket servers",
      "Containerized the full stack (frontend, backend, database) with Docker Compose",
    ],
    tags: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "WebSocket", "Docker"],
    images: [ftTranscendenceImg],
    color: "from-cyan-500/20 to-green-600/20",
    link: null,
  },
];
