import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FallingLeaves from "@/components/FallingLeaves";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [showIntro, setShowIntro] = useState(() => {
    const seen = sessionStorage.getItem("intro-seen");
    return !seen;
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem("intro-seen", "1");
  };

  return (
    <>
      <IntroAnimation isVisible={showIntro} onComplete={handleIntroComplete} />
      <div className={`min-h-screen bg-background relative overflow-x-hidden ${showIntro ? "overflow-hidden h-screen" : ""}`}>
        <FallingLeaves />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
