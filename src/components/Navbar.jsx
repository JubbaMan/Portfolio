import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => scrollToSection("home")}>
        <span className="Logo">J</span>
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {["home", "about", "projects", "contact"].map((section) => (
          <li key={section}>
            <span
              className="nav-link"
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </span>
          </li>
        ))}
      </ul>

      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
