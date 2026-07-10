"use client";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import TriviaQuiz from "./components/TriviaQuiz";
import SporeEffect from "./components/SporeEffect";

export default function Home() {
  const navItems = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "playlist", label: "Playlist" },
    { id: "contact", label: "Contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });
  const aboutImageSrc = theme === "light" ? "/1005.webp" : "/1018.webp";

  useEffect(() => {
    setSiteTheme("dark");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation for smoother movement (easing factor of 0.1)
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setDisplayPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const setSiteTheme = (nextTheme: "light" | "dark") => {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle("light-mode", nextTheme === "light");
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  const handleThemePress = (nextTheme: "light" | "dark") => {
    return () => setSiteTheme(nextTheme);
  };

  const ThemeToggle = ({ className = "" }: { className?: string }) => (
    <div
      className={`theme-switch inline-flex items-center rounded-full border p-1 ${className}`}
      role="radiogroup"
      aria-label="Color theme"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        data-theme-choice="light"
        onPointerDown={handleThemePress("light")}
        onMouseDown={handleThemePress("light")}
        onTouchStart={handleThemePress("light")}
        onClick={handleThemePress("light")}
        className="theme-switch-option"
      >
        Light
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        data-theme-choice="dark"
        onPointerDown={handleThemePress("dark")}
        onMouseDown={handleThemePress("dark")}
        onTouchStart={handleThemePress("dark")}
        onClick={handleThemePress("dark")}
        className="theme-switch-option"
      >
        Dark
      </button>
    </div>
  );

  return (
    <>
      {/* Spore effect */}
      <SporeEffect />
      
      {/* Cursor light effect */}
      <div
        className="cursor-light fixed pointer-events-none"
        style={{
          left: `${displayPosition.x}px`,
          top: `${displayPosition.y}px`,
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          willChange: "transform",
        }}
      />
    <div className="site-shell tracking-wider font-light mx-auto min-h-screen max-w-screen-xl px-5 py-2 sm:px-7 md:px-10 md:py-12 lg:px-12 lg:py-0 relative">

      <div className="theme-border text-white lg:grid lg:min-h-screen lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.15fr)] lg:gap-10 xl:gap-16 lg:border-r">

          {/* Mobile Nav */}
        <div className="theme-mobile-nav lg:hidden fixed top-0 left-0 w-full backdrop-blur-md z-50">
          <nav className="mobile-nav-inner flex justify-between items-center px-4 py-3 sm:px-5">
            <a className="text-lg font-semibold text-secondary" href="#home" >Gerald</a>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Hamburger button */}
              <button
                onClick={() => setIsOpen(true)}
                className="text-white text-2xl"
                aria-label="Open menu"
              >
                <FiMenu />
              </button>
            </div>
          </nav>

          {/* Fullscreen overlay menu with animation */}
          {isOpen && (
            <div
              className="theme-mobile-menu mobile-menu fixed inset-0 w-full z-80 flex flex-col justify-center items-center
                        animate-fadeIn"
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white text-3xl"
                aria-label="Close menu"
              >
                <FiX />
              </button>

              <ul className="flex flex-col gap-6 sm:gap-8 text-center animate-slideIn">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setIsOpen(false)} // close after click
                      className="text-2xl sm:text-3xl font-light tracking-widest text-white hover:text-secondary transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mobile-menu-note text-secondary text-xs sm:text-sm font-extralight tracking-[0.16em] text-center mt-10 px-6">Loosely designed by Gerald</p>
            </div>
          )}
        </div>

        
        <header className="pt-24 pb-10 sm:pt-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:min-h-[680px] lg:flex-col lg:justify-between lg:pt-14 lg:pb-20">
          
          <div> 
            <div className="mb-8 hidden lg:block">
              <ThemeToggle />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-200 sm:text-3xl lg:text-4xl">
              <a href="#home" className="hover:text-secondary font-bold tracking-wide max-w-prose ">Gerald Obuseh</a>
            </h1>
            <h2 className="theme-copy text-lg font-semibold tracking-wide mt-3 opacity-80 leading-loose max-w-prose">
              Software Engineer
            </h2>
            <p className="theme-copy text-sm font-semibold tracking-[0.14em] sm:tracking-[0.22em] mt-3 opacity-80">
              Building backend systems at enterprise scale.
            </p>
            <nav className="nav hidden lg:block" aria-label="In-page jump links">
              <ul className="mt-12 w-max">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a className="group flex items-center py-2.5 active" href={`#${item.id}`}>
                      <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                      <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>  
          </div>

          <ul className="theme-copy mt-8 flex flex-wrap gap-5" aria-label="Social media">
            {/* GitHub */}
            <li>
              <a
                className="block hover:text-secondary transition-colors"
                href="https://github.com/geraldobuseh"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="h-7 w-7">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 
                  5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94
                  -.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
                  1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07
                  -1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                  -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 
                  018 4.84c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 
                  2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 
                  1.27.82 2.15 0 3.07-1.87 3.75-3.65 
                  3.95.29.25.54.73.54 1.48 0 1.07-.01 
                  1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 
                  0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
            </li>

            {/* LinkedIn */}
            <li>
              <a
                className="block hover:text-secondary transition-colors"
                href="https://www.linkedin.com/in/gerald-obuseh-22074724a/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="h-7 w-7">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
                </svg>
              </a>
            </li>

            {/* Instagram */}
            <li>
              <a
                className="block hover:text-secondary transition-colors"
                href="https://www.instagram.com/geraldinhogram/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-7 w-7">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 
                  1.366.062 2.633.35 3.608 1.325.975.975 
                  1.262 2.242 1.324 3.608.058 1.266.069 
                  1.646.069 4.85s-.011 3.584-.069 
                  4.85c-.062 1.366-.349 2.633-1.324 
                  3.608-.975.975-2.242 1.262-3.608 
                  1.324-1.266.058-1.646.069-4.85.069s-3.584-.011-4.85-.069c-1.366-.062-2.633-.349-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 
                  15.747 2.163 15.367 2.163 
                  12s.012-3.584.07-4.85c.062-1.366.349-2.633 
                  1.324-3.608C4.532 2.583 5.799 2.296 7.165 
                  2.234 8.431 2.176 8.811 2.163 12 
                  2.163zm0 1.687c-3.17 0-3.548.012-4.796.07-1.046.048-1.613.218-1.985.362-.5.194-.857.427-1.232.802-.375.375-.608.732-.802 
                  1.232-.144.372-.314.939-.362 
                  1.985-.058 1.248-.07 1.626-.07 
                  4.796s.012 3.548.07 4.796c.048 1.046.218 1.613.362 
                  1.985.194.5.427.857.802 
                  1.232.375.375.732.608 1.232.802.372.144.939.314 
                  1.985.362 1.248.058 1.626.07 
                  4.796.07s3.548-.012 4.796-.07c1.046-.048 
                  1.613-.218 1.985-.362.5-.194.857-.427 
                  1.232-.802.375-.375.608-.732.802-1.232.144-.372.314-.939.362-1.985.058-1.248.07-1.626.07-4.796s-.012-3.548-.07-4.796c-.048-1.046-.218-1.613-.362-1.985-.194-.5-.427-.857-.802-1.232-.375-.375-.732-.608-1.232-.802-.372-.144-.939-.314-1.985-.362-1.248-.058-1.626-.07-4.796-.07zm0 3.905a5.932 
                  5.932 0 100 11.864 5.932 5.932 0 000-11.864zm0 9.78a3.849 
                  3.849 0 110-7.698 3.849 3.849 0 010 7.698zm6.406-10.845a1.44 
                  1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z"/>
                </svg>
              </a>
            </li>

            <li>
              <a
                className="block hover:text-secondary transition-colors"
                href="https://www.facebook.com/people/Gerald-Obuseh/pfbid02tsBCNNumU3fL5JshLqbCJKDwGVKevEhA6odg9CUP2Wn7rdbYwC8q5azdkQuNbToLl/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 
                  1.326v21.348C0 23.407.593 24 1.325 
                  24h11.495v-9.294H9.692V11.08h3.128V8.413c0-3.1 
                  1.894-4.788 4.659-4.788 1.325 0 
                  2.464.099 2.796.143v3.24l-1.92.001c-1.505 
                  0-1.796.716-1.796 1.765v2.312h3.587l-.467 
                  3.626h-3.12V24h6.116C23.407 24 24 
                  23.407 24 22.674V1.326C24 
                  .593 23.407 0 22.675 0z"/>
                </svg>
              </a>
            </li>

            {/* X (Twitter) */}
            <li>
              <a
                className="block hover:text-secondary transition-colors"
                href="https://x.com/gerald_obuseh"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X"
                title="X (Twitter)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 1200 1227" className="h-7 w-7">
                  <path d="M714.163 519.284L1160.89 0H1052.9L668.11 
                  450.887 356.178 0H0L468.776 681.821 0 
                  1226.9H108.038L515.354 750.639 843.822 
                  1226.9H1200L714.137 519.284H714.163ZM566.09 
                  692.964L520.77 628.505 147.114 79.694H308.291L607.054 
                  510.173 652.373 574.632 1058.01 1147.79H896.833L566.09 
                  692.99V692.964Z"/>
                </svg>
              </a>
            </li>
          </ul>

        </header>
    

        {/* Main Content */}
        <main className="w-full max-w-3xl min-w-0 mx-auto lg:mx-0 lg:py-0">
          {/* Hero Section */}
          <section id="home" className="hero-section min-h-[calc(100svh-5rem)] lg:min-h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-0">
            <h2 className="text-base sm:text-lg font-semibold tracking-[0.12em] sm:tracking-[0.2em] mb-4 opacity-80">A little context: most people know me as <span className="text-secondary">Geraldinho.</span></h2>
            <h2 className="theme-copy text-sm sm:text-base font-semibold tracking-[0.22em] sm:tracking-[0.6em] lg:tracking-[1.1em] opacity-50">I focus on getting a little better every day.</h2>
            <p className="theme-copy text-md font-semibold tracking-[0.1em] mt-4 opacity-80">
            Computer Science and Mathematics at Texas State University. Software Engineering intern at JPMorganChase. I enjoy designing backend systems that prioritize performance, reliability, and maintainability.
            </p>
            <a
              href="#projects"
              className="theme-button mt-8 inline-block font-semibold border px-6 py-3 rounded transition"
            >
              See work
            </a>
          </section>

          {/* About */}
          <section id="about" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-8">About <span className="text-secondary">Me</span></h2>
            <div className="relative">
              {/* Mobile: Stack vertically */}
              <div className="md:hidden mb-6">
                <Image 
                  src={aboutImageSrc} 
                  alt="Gerald Obuseh" 
                  width={500} 
                  height={500} 
                  className="rounded-lg w-full aspect-square object-cover shadow-lg" 
                />
              </div>
              
              {/* Desktop: Float left with proper spacing */}
              <div className="hidden md:block float-left mr-6 mb-4 w-72 h-96 flex-shrink-0">
                <Image 
                  src={aboutImageSrc} 
                  alt="Gerald Obuseh" 
                  width={288} 
                  height={384} 
                  className="rounded-lg w-full h-full object-cover shadow-lg" 
                />
              </div>
              
              <div className="theme-copy max-w-3xl text-sm font-semibold tracking-[0.06em] opacity-80">
                <p className="mb-3">
                  I&apos;m a software engineer focused on backend engineering, distributed systems, and developer infrastructure. Over the past few years, I&apos;ve worked across enterprise fintech, cloud platforms, and applied computer vision research, building software that solves real operational problems.
                </p>
                <p className="mb-3">
                  Most recently, I started a Software Engineering internship with JPMorganChase&apos;s Payments Technology team, where I developed an internal tool for tracking API deployments across environments. The platform aggregates deployment metadata from AWS, integrates with internal artifact repositories, and gives engineers a centralized view of deployed services.
                </p>
              </div>
              <div className="clear-both"></div>
            </div>
          </section>

          {/* Education */}
          <section id="education" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Education</h2>
            <div className="space-y-6">
              <div>
                <h3 className="theme-copy text-xl font-bold mb-2">Texas State University, USA</h3>
                <p className="theme-muted text-sm font-semibold">Bachelor of Science in Computer Science </p>
                <p className="theme-muted text-sm font-semibold">Minor in Mathematics</p>
                <p className="theme-muted text-sm font-semibold">Expected December 2026</p>
                <ul className="mt-3 ml-4 space-y-2" aria-label="Texas State honors">
                  <li className="theme-muted custom-bullet text-sm font-bold">President&apos;s List, Spring 2026 - 4.0 GPA</li>
                </ul>
              </div>
              <div>
                <h3 className="theme-copy text-xl font-bold mb-2">University of Lagos, Nigeria</h3>
                <p className="theme-muted text-sm font-semibold">Bachelor of Engineering in Systems Engineering</p>
                <p className="theme-muted text-sm font-semibold">Visiting Undergraduate, 2021-2022</p>
              </div>
              <div className="theme-card border rounded p-5">
                <h3 className="theme-copy text-md font-bold uppercase tracking-[0.16em] mb-2">Relevant Coursework</h3>
                <p className="theme-muted text-sm font-semibold">
                  Data Structures &amp; Algorithms, Software Engineering, Database Systems, Artificial Intelligence, Computer Security, Advanced Numerical Analysis, Linear Algebra, Probability &amp; Statistics.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section id="certifications" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="theme-card p-6 border rounded transition">
                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="text-xl font-semibold">AWS Certified Cloud Practitioner</h3>
                  <p className="theme-copy text-sm font-semibold">Amazon Web Services</p>
                  <p className="theme-muted text-sm font-semibold">2026</p>
                </div>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.08em]">
                  Cloud fundamentals, AWS services, security, architecture, pricing, and operational best practices.
                </p>
              </div>
              <div className="theme-card p-6 border rounded transition">
                <div className="flex flex-col gap-1 mb-4">
                  <h3 className="text-xl font-semibold">JPMorganChase SWE Simulation</h3>
                  <p className="theme-copy text-sm font-semibold">Forage</p>
                  <p className="theme-muted text-sm font-semibold">January 2026</p>
                </div>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.08em]">
                  Completed backend engineering simulation using Spring Boot, Kafka, REST APIs, Spring Data JPA, and event-driven transaction processing.
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Professional Experience</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-secondary pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-semibold">Software Engineering Intern</h3>
                  <span className="theme-muted italic text-sm mt-1 md:mt-0">JPMorganChase, Payments Technology</span>
                </div>
                <p className="theme-muted text-sm mb-2">Summer 2026</p>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.12em] mb-4">
                  Currently a Software Engineering Intern on the Payments Technology team, building internal developer tooling to improve API deployment visibility across environments.
                  Delivered the initial platform ahead of schedule and was subsequently entrusted with developing an AI-powered Pull Request Bot to review, govern, and recommend fixes for API specifications, mocks, and test suites, improving code quality and deployment reliability.
                  Also a member of JPMC ATX Soccer
                </p>
              </div>
              
              <div className="border-l-2 border-secondary pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-semibold tracking-[0.20em]">Engineering Student Assistant</h3>
                  <span className="theme-muted italic text-sm mt-1 md:mt-0">Bruce and Ingram School of Engineering, Texas State University</span>
                </div>
                <p className="theme-muted text-sm mb-2">September 2025 - May 2026</p>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.12em]">
                  Developed backend tooling in Python to extend Raspberry Pi–powered 3D printing infrastructure,
                  building a webhook ingestion pipeline that captures print lifecycle events and persists them to PostgreSQL, enabling centralized reporting, operational analytics, and improved visibility into manufacturing workflows.                </p>
              </div>
              
              <div className="border-l-2 border-secondary pl-6 pb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-semibold">Software Engineering Intern</h3>
                  <span className="theme-muted italic text-sm mt-1 md:mt-0">Paystrait</span>
                </div>
                <p className="theme-muted text-sm mb-2">May 2025 - August 2025</p>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.12em]">
                Maintained 13+ production payment microservices processing more than 20,000 monthly transactions with 99.9% availability.
                Refactored a large React/TypeScript administration platform into reusable components, reducing code duplication by 35% and improving maintainability.
                </p>
              </div>
              
              <div className="border-l-2 border-secondary pl-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                  <h3 className="text-xl font-semibold">Computer Vision Research Intern</h3>
                  <span className="theme-muted italic text-sm mt-1 md:mt-0">Purdue University, School of Industrial Engineering</span>
                </div>
                <p className="theme-muted text-sm mb-2">May 2023 - August 2023</p>
                <p className="theme-muted max-w-xl text-sm font-semibold tracking-[0.12em]">
                Contributed to a Python/OpenCV ergonomic risk detection system for an Amazon-sponsored research project by testing pose-estimation pipelines, running simulations, and supporting a 20% accuracy improvement.
                </p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Selected Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="theme-card p-6 border rounded transition">
                <h3 className="text-xl font-semibold mb-3">Mock Deployment Dashboard</h3>
                <p className="theme-copy text-xs font-semibold uppercase tracking-[0.16em] mb-3">Java, Spring Boot, AWS Lambda, React, Node.js, AWS S3</p>
                <p className="theme-muted max-w-xl text-md font-semibold tracking-[0.05em] mb-4">Designed and developed an internal deployment platform that aggregates API deployment metadata from AWS S3, enabling engineers to track deployed versions, build history, and environment status from a unified dashboard.</p>
                <span className="theme-muted text-sm font-semibold">Private internal project</span>
              </div>
              <div className="theme-card p-6 border rounded transition">
                <h3 className="text-xl font-semibold mb-3">TickerStats</h3>
                <p className="theme-copy text-xs font-semibold uppercase tracking-[0.16em] mb-3">React, Flask, MongoDB, Auth0</p>
                <p className="theme-muted max-w-xl text-md font-semibold tracking-[0.05em] mb-4">Developed a financial analytics platform that automates comparable company analysis, DCF valuation, and AI-generated investment pitch decks, leveraging Flask APIs, data processing pipelines, and intelligent caching to achieve 110 ms p95 latency and a 45% reduction in database reads.</p>
                <div className="flex gap-3">
                  <a href="https://www.tickerstats.app/" className="text-secondary hover:underline text-sm font-semibold">View Project</a>
                  <a href="https://github.com/geraldobuseh/tickerstats" className="theme-muted hover:text-secondary text-sm font-semibold">GitHub</a>
                </div>
              </div>
              <div className="theme-card p-6 border rounded transition">
                <h3 className="text-xl font-semibold mb-3">EaseAccess</h3>
                <p className="theme-copy text-xs font-semibold uppercase tracking-[0.16em] mb-3">Python, Flask, HTML/CSS/JavaScript, Gemini API</p>
                <p className="theme-muted max-w-xl text-md font-semibold tracking-[0.05em] mb-4">Built a full-stack accessibility platform with Flask, JavaScript, and Gemini API, delivering intelligent building search, accessibility recommendations, and computer vision–powered color detection. Recognized with the Devpost 2024 Best Accessibility Hack award.</p>
                <div className="flex gap-3">
                  <a href="https://devpost.com/software/easeaccess" className="text-secondary hover:underline text-sm font-semibold">View Project</a>
                  <a href="https://github.com/geraldobuseh/Building-With-AI" className="theme-muted hover:text-secondary text-sm font-semibold">GitHub</a>
                </div>
              </div>
              <div className="theme-card p-6 border rounded transition">
                <h3 className="text-xl font-semibold mb-3">International Girls Academy LMS</h3>
                <p className="theme-copy text-xs font-semibold uppercase tracking-[0.16em] mb-3">Flask, Node.js, React, Clerk</p>
                <p className="theme-muted max-w-xl text-md font-semibold tracking-[0.05em] mb-4">Built a mentorship learning management system during JPMorganChase Code for Good, implementing secure authentication, relational data modeling, and a containerized MVP for a zero-failure demo to engineering leadership.</p>
                <div className="flex gap-3">
                  <a href="https://www.theinternationalgirlsacademy.com/" className="text-secondary hover:underline text-sm font-semibold">View Project</a>
                  <a href="https://github.com/cfgtexas25/Team-37" className="theme-muted hover:text-secondary text-sm font-semibold">GitHub</a>
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Skills</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="theme-card p-5 border rounded transition">
                <h3 className="theme-copy text-sm font-bold uppercase tracking-[0.16em] mb-2">Languages</h3>
                <p className="theme-muted text-sm font-semibold">Python, Java, TypeScript, JavaScript, C/C++, SQL, Go</p>
              </div>
              <div className="theme-card p-5 border rounded transition">
                <h3 className="theme-copy text-sm font-bold uppercase tracking-[0.16em] mb-2">Backend</h3>
                <p className="theme-muted text-sm font-semibold">Spring Boot, Flask, REST APIs, Node.js, Kafka, JWT, SQLAlchemy, Spring Data JPA</p>
              </div>
              <div className="theme-card p-5 border rounded transition">
                <h3 className="theme-copy text-sm font-bold uppercase tracking-[0.16em] mb-2">Cloud &amp; DevOps</h3>
                <p className="theme-muted text-sm font-semibold">AWS, AWS Lambda, Amazon S3, Docker, Git, CI/CD, Jenkins, Linux, Terraform</p>
              </div>
              <div className="theme-card p-5 border rounded transition">
                <h3 className="theme-copy text-sm font-bold uppercase tracking-[0.16em] mb-2">Databases</h3>
                <p className="theme-muted text-sm font-semibold">PostgreSQL, MongoDB</p>
              </div>
            </div>
          </section>

          {/* Playlist */}
          <section id="playlist" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Gerald&apos;s Playlist</h2>
            <div className="max-w-xxl">
              <p className="theme-muted mb-4 font-light text-sm tracking-[0.09em]">
                A personally curated selection of tracks I&apos;m currently listening to                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
              </p>
              <div className="theme-card border rounded-lg p-3 sm:p-5 md:p-6 transition w-full max-w-[648px] overflow-hidden">
                <iframe
                  className="playlist-frame rounded block w-full"
                  src="https://embed.music.apple.com/us/playlist/summer-26/pl.u-kv9lbZVFJ3jgWvb"
                  height="450"
                  width="100%"
                  allow="autoplay *; encrypted-media *; fullscreen *;"
                  frameBorder="2px solid transparent"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                />
              </div>
            </div>
          </section>

          {/* Trivia */}
          <section id="trivia" className="section-block py-16 sm:py-20 lg:py-24">
            <h2 className="text-3xl font-bold mb-6 text-secondary">Trivia</h2>
            <div className="max-w-2xl">
              <TriviaQuiz />
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="section-block py-16 sm:py-20 lg:py-24 text-center">
            <h2 className="text-3xl font-bold mb-6">Contact <span className="text-secondary">Me</span></h2>
            <p className="theme-muted mb-6">
                I love meeting new people, hearing different perspectives, and learning from interesting conversations.
                Feel free to reach out, even if it&apos;s just to say hello.
            </p>
            <a
              href="mailto:geraldobuseh81@gmail.com"
              className="theme-button inline-block border px-6 py-3 rounded transition font-semibold"
            >
              Email Me
            </a>
          </section>
          <p className="theme-muted mt-5 font-semibold text-xs tracking-[0.25em] mx-auto text-center max-w-prose">Loosely designed by <span className="text-secondary">Gerald</span></p>
        </main>
      </div>
    </div>
    </>
  );
}





