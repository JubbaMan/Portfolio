import React from "react";
import { motion } from "framer-motion";
import portrait from "./assets/portrait.png";
import "./Home.css";

const Home = () => {
  const projects = [
    {
      title: "Personal Portfolio",
      description: "A React-based portfolio website to showcase my works.",
      tech: ["React", "CSS", "Framer Motion"],
    },
    {
      title: "Brand Logo Collection",
      description: "Minimal and modern logo designs for small brands.",
      tech: ["Illustrator", "Photoshop"],
    },
    {
      title: "Poster Series",
      description: "Creative poster designs with bold colors and typography.",
      tech: ["Figma", "Canva"],
    },
    {
      title: "Landing Page Design",
      description: "Responsive landing pages with modern UI/UX concepts.",
      tech: ["HTML", "CSS", "JS"],
    },
  ];

  return (
    <>
     

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <motion.div
          className="hero-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="name">Md. Jobayer Patwary</h1>
            <h2 className="role">
              Graphics Designer <span>&</span> Front-End Developer
            </h2>
            <p className="intro">
              I blend creativity and technology to craft visually striking
              designs and smooth user experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn">View My Work</a>
              <a href="#contact" className="btn-outline">Contact Me</a>
            </div>
          </motion.div>

         
        </motion.div>
      </section>

     {/* ===== ABOUT SECTION ===== */}
<motion.section
  className="about"
  id="about"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2>About Me</h2>
  <motion.p
    className="about-intro"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  >
    Hi! I’m <strong>Jobayer Patwary</strong>, a passionate creative and front-end developer based in <strong>Bangladesh</strong>. 
    I love blending <span className="highlight">creativity</span> and <span className="highlight">technology</span> to craft visually striking designs and smooth user experiences.
  </motion.p>

  <motion.p
    className="about-details"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
  >
    Over the years, I’ve worked on a variety of projects including personal portfolios, 
    brand identities, posters, and responsive websites. My goal is to combine <span className="highlight">elegance</span>, <span className="highlight">clarity</span>, 
    and <span className="highlight">emotion</span> in every design, ensuring both visual appeal and user engagement.
  </motion.p>

  <motion.div
    className="tech-skills"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
  >
    <h3>My Tools & Skills:</h3>
    <div className="tech-list">
      {["Adobe Photoshop", "Illustrator", "Figma", "Canva", "HTML", "CSS", "JavaScript", "React"].map((tech, index) => (
        <span key={index}>{tech}</span>
      ))}
    </div>
  </motion.div>

  <motion.div
    className="cta-about"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    <p>Curious to see my work? Check out my projects below!</p>
  </motion.div>
</motion.section>

      {/* ===== SKILLS SECTION ===== */}
      <motion.section
        className="skills"
        id="skills"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Skills</h2>
        <div className="skills-grid">
          {[
            "Adobe Photoshop",
            "Illustrator",
            "Figma",
            "HTML / CSS / JS",
            "React",
            "Canva",
          ].map((skill, index) => (
            <motion.div
              className="skill-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== PROJECTS SECTION ===== */}
      <motion.section
        className="projects"
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              className="project-card"
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(79,70,229,0.3)",
              }}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((tech, i) => (
                  <span className="tech-tag" key={i}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== CONTACT SECTION ===== */}
      <motion.section
  className="contact"
  id="contact"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2>Let’s Connect</h2>
  <p>Follow me on my social accounts or reach out directly!</p>
  <div className="social-links">
    <a href="https://github.com/JubbaMan" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://www.instagram.com/j.u.b.b.a_/" target="_blank" rel="noopener noreferrer">Instagram</a>
  </div>
</motion.section>


      {/* ===== FOOTER ===== */}
      <footer>
        <p>© {new Date().getFullYear()} Md. Jobayer Patwary — All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
