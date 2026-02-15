import React, { useState, useEffect } from "react";
import { HiHome, HiUser, HiCode, HiMail } from "react-icons/hi";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 770);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect hero visibility
  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: "home", label: "Home", icon: <HiHome /> },
    { id: "about", label: "About", icon: <HiUser /> },
    { id: "projects", label: "Projects", icon: <HiCode /> },
    { id: "contact", label: "Contact", icon: <HiMail /> },
  ];

  // Only enable dock mode on desktop
  const dockMode = scrolled && isDesktop;

  return (
    <nav className={`navbar ${dockMode ? "scrolled" : ""}`}>
      
      <div
        className="cursor-target logo"
        onClick={() => scrollToSection("home")}
      >
        <span className="Logo">
          {!isDesktop || dockMode ? "J." : "Jobayer."}
        </span>
      </div>

      <ul className="nav-links open">
        {navItems.map((item) => (
          <li key={item.id}>
            <span
              className="cursor-target nav-link"
              onClick={() => scrollToSection(item.id)}
            >
              {!isDesktop || dockMode ? item.icon : item.label}
            </span>
          </li>
        ))}
      </ul>

    </nav>
  );
};

export default Navbar;