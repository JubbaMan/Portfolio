import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Smooth scroll to section
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false); // close mobile menu
    }
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => handleScroll("home")}>
        <span className="Logo">JOBAYER</span>
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        {["home", "about", "projects", "contact"].map((id, idx) => {
          const name = ["Home", "About", "Projects", "Contact"][idx];
          return (
            <li key={name}>
              <span
                className="nav-link"
                onClick={() => handleScroll(id)}
              >
                {name}
              </span>
            </li>
          );
        })}
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
