import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type Lang = "en" | "fr";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.about": { en: "About", fr: "À propos" },
  "nav.projects": { en: "Projects", fr: "Projets" },
  "nav.skills": { en: "Skills", fr: "Compétences" },
  "nav.education": { en: "Education", fr: "Formation" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.settings": { en: "Settings", fr: "Paramètres" },

  // Hero
  "hero.welcome": { en: "Welcome to my portfolio", fr: "Bienvenue sur mon portfolio" },
  "hero.title1": { en: "Software", fr: "Développeur" },
  "hero.title2": { en: "Developer", fr: "Logiciel" },
  "hero.title3": { en: "& Engineer", fr: "& Ingénieur" },
  "hero.subtitle": {
    en: "I craft digital experiences that blend stunning visuals with seamless functionality. Let's build something extraordinary together.",
    fr: "Je crée des expériences numériques qui allient esthétique et fonctionnalité. Construisons ensemble quelque chose d'extraordinaire.",
  },
  "hero.cta1": { en: "View My Work", fr: "Voir mes projets" },
  "hero.cta2": { en: "Get In Touch", fr: "Me contacter" },

  // About
  "about.label": { en: "About Me", fr: "À propos" },
  "about.title1": { en: "Passionate about creating", fr: "Passionné par la création de" },
  "about.title2": { en: "impactful", fr: "solutions" },
  "about.title3": { en: "digital solutions", fr: "numériques impactantes" },
  "about.p1": {
    en: "I'm a creative developer with a keen eye for creativity and a passion for building seamless user experiences. With years of experience in web development, I specialize in turning complex ideas into elegant, functional applications.",
    fr: "Je suis un développeur créatif avec un sens aigu du design et une passion pour la création d'expériences utilisateur fluides. Fort de plusieurs années d'expérience en développement web, je me spécialise dans la transformation d'idées complexes en applications élégantes et fonctionnelles.",
  },
  "about.p2": {
    en: "My approach combines technical expertise with creative thinking, ensuring every project not only works flawlessly but also tells a compelling story.",
    fr: "Mon approche combine expertise technique et pensée créative, garantissant que chaque projet fonctionne parfaitement tout en racontant une histoire captivante.",
  },
  "about.years": { en: "Years Experience", fr: "Années d'expérience" },
  "about.projects": { en: "Projects Completed", fr: "Projets réalisés" },
  "about.clients": { en: "Happy Clients", fr: "Clients satisfaits" },

  // Projects
  "projects.label": { en: "Featured Work", fr: "Travaux en vedette" },
  "projects.title1": { en: "Selected", fr: "Projets" },
  "projects.title2": { en: "Projects", fr: "sélectionnés" },
  "projects.contributions": { en: "Key Contributions", fr: "Contributions clés" },
  "projects.visit": { en: "Visit", fr: "Visiter" },
  "projects.showMore": { en: "Show More", fr: "Voir plus" },
  "projects.showLess": { en: "Show Less", fr: "Voir moins" },
  "projects.all": { en: "All", fr: "Tous" },

  // Skills
  "skills.label": { en: "What I Do", fr: "Ce que je fais" },
  "skills.title1": { en: "Skills &", fr: "Compétences &" },
  "skills.title2": { en: "Expertise", fr: "Expertise" },
  "skills.backend.title": { en: "Backend Development", fr: "Développement Backend" },
  "skills.backend.desc": { en: "Building robust APIs and database architectures", fr: "Construction d'APIs robustes et d'architectures de bases de données" },
  "skills.frontend.title": { en: "Frontend Development", fr: "Développement Frontend" },
  "skills.frontend.desc": { en: "React, Next.js, TypeScript, and modern JavaScript frameworks", fr: "React, Next.js, TypeScript et frameworks JavaScript modernes" },
  "skills.fullstack.title": { en: "Full Stack Solutions", fr: "Solutions Full Stack" },
  "skills.fullstack.desc": { en: "End-to-end development from concept to deployment", fr: "Développement de bout en bout, du concept au déploiement" },
  "skills.ai.title": { en: "AI & LLMS Integration", fr: "Intégration IA & LLMs" },
  "skills.ai.desc": { en: "Integrating AI models to enhance user experiences", fr: "Intégration de modèles d'IA pour améliorer l'expérience utilisateur" },
  "skills.perf.title": { en: "Performance Optimization", fr: "Optimisation des performances" },
  "skills.perf.desc": { en: "Ensuring fast load times and smooth experiences", fr: "Garantir des temps de chargement rapides et des expériences fluides" },

  // Education
  "education.label": { en: "Learning Journey", fr: "Parcours de formation" },
  "education.title1": { en: "Education &", fr: "Formation &" },
  "education.title2": { en: "Training", fr: "Parcours" },
  "education.42badge": { en: "Part of the global", fr: "Membre du réseau mondial" },

  "education.arch.title": { en: "Architect in Digital Technologies", fr: "Architecte en Technologies Numériques" },
  "education.arch.subtitle": { en: "Advanced Common Core", fr: "Tronc Commun Avancé" },
  "education.arch.desc": {
    en: "Advanced specialization in scalable architecture, distributed systems, and enterprise-grade application design. Focused on microservices patterns, DevOps practices, and AI integration.",
    fr: "Spécialisation avancée en architecture évolutive, systèmes distribués et conception d'applications d'entreprise. Focus sur les patterns microservices, les pratiques DevOps et l'intégration de l'IA.",
  },
  "education.arch.a1": { en: "Scalable microservices architecture design", fr: "Conception d'architectures microservices évolutives" },
  "education.arch.a2": { en: "AI & LLM integration specialist", fr: "Spécialiste en intégration IA & LLM" },
  "education.arch.a3": { en: "Enterprise backend development with NestJS", fr: "Développement backend d'entreprise avec NestJS" },
  "education.arch.a4": { en: "DevOps & containerization with Docker/Kafka", fr: "DevOps & conteneurisation avec Docker/Kafka" },

  "education.pfe.title": { en: "PFE Internship", fr: "Stage PFE" },
  "education.pfe.subtitle": { en: "DICE, Mohammed VI Polytechnic University", fr: "DICE, Université Mohammed VI Polytechnique" },
  "education.pfe.desc": {
    en: "End-of-studies internship working on national-scale digital platforms including NARSA and industrial automation systems, applying full-stack expertise in production environments.",
    fr: "Stage de fin d'études sur des plateformes numériques à l'échelle nationale, y compris NARSA et des systèmes d'automatisation industrielle, appliquant une expertise full-stack en environnement de production.",
  },
  "education.pfe.a1": { en: "Built national driving exam digital platform (NARSA)", fr: "Construction de la plateforme numérique nationale d'examen de conduite (NARSA)" },
  "education.pfe.a2": { en: "Architected industrial automation microservices", fr: "Architecture de microservices d'automatisation industrielle" },
  "education.pfe.a3": { en: "Kafka event streaming & real-time systems", fr: "Streaming d'événements Kafka & systèmes temps réel" },
  "education.pfe.a4": { en: "Cross-functional team collaboration", fr: "Collaboration en équipe pluridisciplinaire" },

  "education.soft.title": { en: "Software Engineering", fr: "Ingénierie Logicielle" },
  "education.soft.subtitle": { en: "Common Core", fr: "Tronc Commun" },
  "education.soft.desc": {
    en: "Intensive, peer-to-peer programming curriculum emphasizing algorithms, memory management, networking, and system design. Mastery-based evaluation with no traditional lectures, learning through real-world projects and collaboration.",
    fr: "Programme intensif de programmation pair-à-pair axé sur les algorithmes, la gestion de la mémoire, le réseau et la conception de systèmes. Évaluation basée sur la maîtrise sans cours traditionnels, apprentissage par projets concrets et collaboration.",
  },
  "education.soft.a1": { en: "C/C++ systems programming & memory management", fr: "Programmation système C/C++ & gestion de la mémoire" },
  "education.soft.a2": { en: "Networking protocols & socket programming", fr: "Protocoles réseau & programmation socket" },
  "education.soft.a3": { en: "Full-stack web development (capstone: ft_transcendence)", fr: "Développement web full-stack (projet final : ft_transcendence)" },
  "education.soft.a4": { en: "Peer-to-peer learning & autonomous problem-solving", fr: "Apprentissage pair-à-pair & résolution autonome de problèmes" },

  // Contact
  "contact.available": { en: "Available for work", fr: "Disponible pour travailler" },
  "contact.title1": { en: "Let's Work", fr: "Travaillons" },
  "contact.title2": { en: "Together", fr: "ensemble" },
  "contact.subtitle": { en: "Have a project in mind? I'd love to hear about it.", fr: "Vous avez un projet en tête ? J'aimerais en savoir plus." },
  "contact.getintouch": { en: "Get in touch", fr: "Me contacter" },
  "contact.desc": {
    en: "Whether it's a new project, collaboration, or just saying hi, I'm always open to meaningful conversations.",
    fr: "Qu'il s'agisse d'un nouveau projet, d'une collaboration ou simplement d'un bonjour, je suis toujours ouvert aux échanges enrichissants.",
  },
  "contact.email": { en: "Email", fr: "E-mail" },
  "contact.location": { en: "Location", fr: "Localisation" },
  "contact.connect": { en: "Connect", fr: "Réseaux" },
  "contact.name": { en: "Name", fr: "Nom" },
  "contact.name.placeholder": { en: "Your name", fr: "Votre nom" },
  "contact.email.label": { en: "Email", fr: "E-mail" },
  "contact.email.placeholder": { en: "your@email.com", fr: "votre@email.com" },
  "contact.message": { en: "Message", fr: "Message" },
  "contact.message.placeholder": { en: "Tell me about your project...", fr: "Parlez-moi de votre projet..." },
  "contact.send": { en: "Send Message", fr: "Envoyer le message" },
  "contact.sending": { en: "Sending...", fr: "Envoi en cours..." },
  "contact.response": { en: "I typically respond within 24 hours", fr: "Je réponds généralement sous 24 heures" },
  "contact.success": { en: "Message sent! I'll get back to you soon.", fr: "Message envoyé ! Je vous répondrai bientôt." },
  "contact.error": { en: "Failed to send message. Please try again.", fr: "Échec de l'envoi. Veuillez réessayer." },

  // Footer
  "footer.rights": { en: "All rights reserved.", fr: "Tous droits réservés." },
  "footer.explore": { en: "Explore", fr: "Explorer" },
  "footer.connect": { en: "Connect", fr: "Réseaux" },
  "footer.status": { en: "Status", fr: "Statut" },
  "footer.location": { en: "Rabat, Morocco", fr: "Rabat, Maroc" },
  "footer.description": {
    en: "Software Engineer · Full-Stack Developer. 42 Network graduate.",
    fr: "Ingénieur Logiciel · Développeur Full-Stack. Diplômé du réseau 42.",
  },
  "footer.resume": { en: "Download Resume", fr: "Télécharger le CV" },
  "footer.blog": { en: "Blog", fr: "Blog" },
  "footer.language": { en: "Language", fr: "Langue" },

  // Projects data translations
  "project.portfolio.subtitle": { en: "Personal Portfolio & Digital Identity", fr: "Portfolio Personnel & Identité Numérique" },
  "project.portfolio.desc": {
    en: "A modern, fully responsive personal portfolio built with React, TypeScript, and Framer Motion. Features a clean dual-theme design (dark/light), interactive project gallery with animated modals and image carousels, a blog section with curated articles, smooth scroll-triggered animations, custom particle effects, and comprehensive sections including About, Skills, Education, and Contact with integrated email functionality.",
    fr: "Un portfolio personnel moderne et entièrement responsive, construit avec React, TypeScript et Framer Motion. Il propose un design épuré double thème (sombre/clair), une galerie de projets interactive avec modales animées et carrousels d'images, une section blog avec articles sélectionnés, des animations fluides déclenchées au défilement, des effets de particules personnalisés, et des sections complètes incluant À propos, Compétences, Formation et Contact avec fonctionnalité d'e-mail intégrée.",
  },
  "project.portfolio.h1": { en: "Dual-theme design system with custom CSS tokens & seamless light/dark mode switching", fr: "Système de design double thème avec tokens CSS personnalisés et basculement fluide mode clair/sombre" },
  "project.portfolio.h2": { en: "Interactive project gallery with animated modals, image carousels & hover effects", fr: "Galerie de projets interactive avec modales animées, carrousels d'images et effets au survol" },
  "project.portfolio.h3": { en: "Blog section with article management, reading views & tag-based filtering", fr: "Section blog avec gestion d'articles, vues de lecture et filtrage par tags" },
  "project.portfolio.h4": { en: "Custom particle effects, page transitions & scroll-triggered animations with Framer Motion", fr: "Effets de particules personnalisés, transitions de pages et animations déclenchées au défilement avec Framer Motion" },

  "project.chemp.subtitle": { en: "AI-Powered Communication & Wellbeing Platform", fr: "Plateforme de communication et bien-être propulsée par l'IA" },
  "project.chemp.desc": {
    en: "An innovative platform leveraging AI to provide professional communication coaching and wellbeing support. Combines conversational AI, emotional intelligence assessment, and health tracking into a comprehensive solution.",
    fr: "Une plateforme innovante utilisant l'IA pour offrir du coaching en communication professionnelle et du soutien au bien-être. Combine l'IA conversationnelle, l'évaluation de l'intelligence émotionnelle et le suivi santé.",
  },

  "project.narsa.subtitle": { en: "Digital Driving Exam Platform", fr: "Plateforme numérique d'examen de conduite" },
  "project.narsa.desc": {
    en: "A national digital platform modernizing Morocco's practical driving exam process. Integrates advanced digital systems into test vehicles with a comprehensive admin platform connected to all driving centers nationwide.",
    fr: "Une plateforme numérique nationale modernisant le processus d'examen de conduite pratique au Maroc. Intègre des systèmes numériques avancés dans les véhicules d'examen avec une plateforme d'administration connectée à tous les centres de conduite du pays.",
  },

  "project.gaia.subtitle": { en: "AI Assistant for Industrial Design", fr: "Assistant IA pour la conception industrielle" },
  "project.gaia.desc": {
    en: "An AI-powered platform revolutionizing industrial schema design and simulation. Enables users to create, design, and simulate complex industrial systems through an intuitive digital workspace with AI-generated configurations.",
    fr: "Une plateforme propulsée par l'IA révolutionnant la conception et la simulation de schémas industriels. Permet aux utilisateurs de créer, concevoir et simuler des systèmes industriels complexes via un espace de travail numérique intuitif.",
  },

  "project.marsad.subtitle": { en: "Labor Market Intelligence Platform", fr: "Plateforme d'intelligence du marché du travail" },
  "project.marsad.desc": {
    en: "A comprehensive digital platform providing intelligent analysis for Morocco's labor market. Delivers interactive dashboards, AI digital assistants, and real-time data insights for employment research and policy decisions.",
    fr: "Une plateforme numérique complète fournissant une analyse intelligente du marché du travail marocain. Propose des tableaux de bord interactifs, des assistants numériques IA et des données en temps réel pour la recherche sur l'emploi.",
  },

  "project.ft.subtitle": { en: "Real-Time Multiplayer Ping Pong Web App", fr: "Application Web de Ping Pong Multijoueur en Temps Réel" },
  "project.ft.desc": {
    en: "A collaborative capstone project building a real-time multiplayer ping pong application from design to production. Features live gameplay via WebSockets, user authentication, chat, and a fully containerized architecture with Docker.",
    fr: "Un projet final collaboratif construisant une application de ping pong multijoueur en temps réel, de la conception à la production. Propose du gameplay en direct via WebSockets, authentification, chat et architecture conteneurisée avec Docker.",
  },

  // Blog
  "blog.back": { en: "Back to Portfolio", fr: "Retour au portfolio" },
  "blog.label": { en: "Thoughts & Writings", fr: "Réflexions & Écrits" },
  "blog.title": { en: "My", fr: "Mes" },
  "blog.title2": { en: "Articles", fr: "Articles" },
  "blog.subtitle": {
    en: "Sharing insights from my journey in software development, architecture, and the art of building great products.",
    fr: "Partage d'idées issues de mon parcours en développement logiciel, architecture et l'art de créer d'excellents produits.",
  },
  "blog.backToArticles": { en: "Back to Articles", fr: "Retour aux articles" },
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem("portfolio-lang");
    return (saved === "fr" ? "fr" : "en") as Lang;
  });

  const handleSetLang = useCallback((newLang: Lang) => {
    setLang(newLang);
    localStorage.setItem("portfolio-lang", newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[lang] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
