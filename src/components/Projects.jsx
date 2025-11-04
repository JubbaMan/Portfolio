import React from "react";
import { motion } from "framer-motion";
import "./Projects.css";

const projects = [
  {
    title: "Personal Portfolio",
    description: "React portfolio website showcasing my work.",
    tech: ["React", "CSS", "Framer Motion"],
  },
  {
    title: "Logo Collection",
    description: "Minimal and modern logo designs for brands.",
    tech: ["Illustrator", "Photoshop"],
  },
  {
    title: "Poster Series",
    description: "Creative poster designs with bold colors.",
    tech: ["Figma", "Canva"],
  },
  {
    title: "Landing Page Design",
    description: "Responsive landing pages with modern UI/UX.",
    tech: ["HTML", "CSS", "JS"],
  },
];

const Projects = () => {
  return (
    <motion.div
      className="projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(79,70,229,0.3)" }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-tags">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
