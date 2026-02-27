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
  subtitleKey: string;
  organization: string;
  role: string;
  descriptionKey: string;
  highlights: string[];
  highlightKeys: string[];
  tags: string[];
  images: string[];
  color: string;
  link: string | null;
  categories: string[];
}

export const projectCategories = [
  "Full Stack",
  "Frontend",
  "Backend",
  "AI Solutions",
  "DevOps",
];

export const projects: Project[] = [
  {
    title: "Portfolio",
    subtitleKey: "project.portfolio.subtitle",
    organization: "Personal Project",
    role: "Full-Stack Developer & Designer",
    descriptionKey: "project.portfolio.desc",
    highlights: [],
    highlightKeys: [
      "project.portfolio.h1",
      "project.portfolio.h2",
      "project.portfolio.h3",
      "project.portfolio.h4",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    images: [portfolioDark, portfolioLight, portfolioProjects, portfolioModal],
    color: "from-red-500/20 to-rose-600/20",
    link: "https://www.aissamhammoutane.me/",
    categories: ["Full Stack", "Frontend"],
  },
  {
    title: "Chemp.AI",
    subtitleKey: "project.chemp.subtitle",
    organization: "Startup, Spain",
    role: "Backend Architect & Full-Stack Developer",
    descriptionKey: "project.chemp.desc",
    highlights: [
      "Architected complete NestJS backend with 17-table PostgreSQL schema",
      "Integrated 3 specialized AI assistants (GPT-4o) with token optimization",
      "Built 9 feature modules: AI messaging, role-play coaching, wellbeing tracker",
      "Implemented Stripe subscriptions, push notifications & OAuth2 auth",
    ],
    highlightKeys: [],
    tags: ["NestJS", "TypeScript", "PostgreSQL", "OpenAI", "Stripe", "Redis", "Docker"],
    images: [chempImg],
    color: "from-emerald-500/20 to-teal-600/20",
    link: null,
    categories: ["Full Stack", "Backend", "AI Solutions"],
  },
  {
    title: "NARSA",
    subtitleKey: "project.narsa.subtitle",
    organization: "DICE, UM6P",
    role: "Full-Stack Developer",
    descriptionKey: "project.narsa.desc",
    highlights: [
      "Developed real-time exam monitoring dashboard across all driving centers",
      "Built digital evaluation system with standardized scoring & e-signatures",
      "Implemented center management, vehicle fleet tracking & examiner scheduling",
      "Created analytics dashboards with data visualization & reporting exports",
    ],
    highlightKeys: [],
    tags: ["React", "REST API", "WebSocket", "PostgreSQL", "Real-time"],
    images: [narsaImg],
    color: "from-blue-500/20 to-indigo-600/20",
    link: null,
    categories: ["Full Stack", "Frontend"],
  },
  {
    title: "GAIA",
    subtitleKey: "project.gaia.subtitle",
    organization: "DICE, UM6P",
    role: "Backend Architect",
    descriptionKey: "project.gaia.desc",
    highlights: [
      "Designed scalable microservices architecture with API Gateway pattern",
      "Built AI integration layer for automated schema generation & optimization",
      "Implemented polyglot persistence with relational & document databases",
      "Developed async job processing for compute-intensive AI operations",
    ],
    highlightKeys: [],
    tags: ["Microservices", "API Gateway", "AI/ML", "Docker", "Message Queues"],
    images: [gaiaImg],
    color: "from-purple-500/20 to-pink-600/20",
    link: null,
    categories: ["Backend", "AI Solutions", "DevOps"],
  },
  {
    title: "MARSSAD",
    subtitleKey: "project.marsad.subtitle",
    organization: "DICE, UM6P",
    role: "Full-Stack Developer",
    descriptionKey: "project.marsad.desc",
    highlights: [
      "Developed dynamic forms system with configurable builder & conditional logic",
      "Extended AI capabilities with sector-specific digital assistants",
      "Built ETL pipelines for real-time data integration from public institutions",
      "Modernized tech stack with library migrations & performance optimizations",
    ],
    highlightKeys: [],
    tags: ["JavaScript", "REST API", "ETL", "Data Viz", "NLP", "WebSocket"],
    images: [marsadImg],
    color: "from-amber-500/20 to-orange-600/20",
    link: "https://marssad.ma",
    categories: ["Full Stack", "AI Solutions"],
  },
  {
    title: "ft_transcendence",
    subtitleKey: "project.ft.subtitle",
    organization: "42 Network",
    role: "Full-Stack Developer",
    descriptionKey: "project.ft.desc",
    highlights: [
      "Designed full UI/UX in Figma before implementation",
      "Built NestJS backend with Prisma ORM & PostgreSQL for type-safe data access",
      "Implemented real-time gameplay & chat using WebSocket servers",
      "Containerized the full stack (frontend, backend, database) with Docker Compose",
    ],
    highlightKeys: [],
    tags: ["NestJS", "Next.js", "Prisma", "PostgreSQL", "WebSocket", "Docker"],
    images: [ftTranscendenceImg],
    color: "from-cyan-500/20 to-green-600/20",
    link: null,
    categories: ["Full Stack", "Backend", "DevOps"],
  },
];
