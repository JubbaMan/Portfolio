import React from "react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.css";
import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/dist/locomotive-scroll.css";

/* ===== PROJECT CARD COMPONENT ===== */
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="cursor-target project-card"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 20px 40px rgba(79,70,229,0.4)",
      }}
    >
      {/* Preview with overlay */}
      <div className="project-preview">
        <img
          src={project.preview}
          alt={project.title}
          loading="lazy"
        />
        <div className="preview-overlay">
          <span>Download to See!</span>
        </div>
      </div>

      {/* Content */}
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {/* Tech Stack */}
      <div className="tech-tags">
        {project.tech?.map((tech, i) => (
          <span className="tech-tag" key={i}>
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="project-actions">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer">
            Live Demo
          </a>
        )}
        {project.source && (
          <a className="code" href={project.source} target="_blank" rel="noreferrer">
            Source Code
          </a>
        )}
        {project.files && (
          <a className="files" href={project.files} download>
            Download
          </a>
        )}
      </div>
    </motion.div>
  );
};

/* ===== HOME COMPONENT ===== */
const Home = () => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  // Initialize Locomotive Scroll
  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.8,
      lerp: 0.08,
      smartphone: {
        smooth: true,
        multiplier: 0.5
      },
      tablet: {
        smooth: true,
        multiplier: 0.6
      }
    });

    // Store scroll instance in ref
    locomotiveScrollRef.current = scroll;

    // Update scroll after a short delay to ensure content is loaded
    setTimeout(() => {
      if (scroll) {
        scroll.update();
      }
    }, 500);

    // Update on window resize
    const handleResize = () => {
      if (scroll) {
        scroll.update();
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (scroll) {
        scroll.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects = [
    {
      title: "Personal Portfolio",
      description: "You're already feeling it:) A modern, animated portfolio showcasing my work.",
      tech: ["React", "CSS", "Framer Motion"],
      preview: "/previews/Screenshot 2026-01-23 202141.png",
      live: "https://jobayer-me.vercel.app",
      source: "https://github.com/JubbaMan/Portfolio",
    },
    {
      title: "To Do App",
      description: "A basic To Do App for basic task tracking with smooth animations",
      tech: ["React", "CSS", "Framer Motion"],
      preview: "/previews/Screenshot 2026-01-23 203607.png",
      live: "https://todo-app-of-the-elite.vercel.app/",
      source: "https://github.com/JubbaMan/TodoApp",
    },
    {
      title: "JBL Post Recreation",
      description: "I tried my best to recreate an existing post with precision.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/boombox (5).jpg",
      files: "/previews/boombox (5).jpg",
    },
    {
      title: "Concept Ad for JBL Headphones",
      description: "I made a concept post for JBL Tunes 510BT headphones.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/Tune (4).png",
      files: "/previews/Tune (4).png",
    },
    {
      title: "Cute Bunny Lamp",
      description: "A bunny lamp? I need it rn!!! Whimsical design with charm.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/Lamppost (2).jpg",
      files: "/previews/Lamppost (2).jpg",
    },
    {
      title: "Cool Laptop Ad",
      description: "First time I tried this type of post idea.. and it worked!",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/lappy.jpg",
      files: "/previews/lappy.jpg",
    },
    {
      title: "Jeep Car Ad",
      description: "A concept ad for a Jeep car with rugged aesthetics.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/JeepInsta.jpg",
      files: "/previews/JeepInsta.jpg",
    },
    {
      title: "Stapler Ad",
      description: "Expect the unexpected - a cool ad for a stapler also exists!",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/SocialMediaDesign (1).jpg",
      files: "/previews/SocialMediaDesign (1).jpg",
    },
    {
      title: "Demo Brand Logo",
      description: "Minimal and modern Logo Design for small brands.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/S (2).png",
      files: "/previews/S (2).png",
    },
    {
      title: "Demo Brand Logo (Dark)",
      description: "Minimal and modern Logo Design for small brands, but in dark.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/S (6).png",
      files: "/previews/S (6).png",
    },
    {
      title: "School Club Logo",
      description: "Minimal and modern Logo Design for a School Club.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/Motijheel Model IT Club (8).png",
      files: "/previews/Motijheel Model IT Club (8).png",
    },
    {
      title: "School Club Logo (Dark)",
      description: "Minimal and modern Logo Design for a School Club, also in dark.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/Motijheel Model IT Club (11).png",
      files: "/previews/Motijheel Model IT Club (11).png",
    },
  ];

  return (
    <>
      <div className="scroll" ref={scrollRef} data-scroll-container>
        {/* Background with dynamic gradient */}
        <div className="bg" />
        <div className="gradient-overlay" />
        
        {/* Parallax wrapper */}
        <div className="parallax-wrapper">
          {/* Moon with glow effect */}
          <img
            src="/moon.png"
            className="moon glow-pulse"
            data-scroll
            data-scroll-speed="-0.5"
            data-scroll-direction="vertical"
            alt="moon"
          />

          {/* Planets with unique animations */}
          <img
            src="/planet1.png"
            className="planet planet1 rotate-slow"
            data-scroll
            data-scroll-speed="0.4"
            data-scroll-direction="vertical"
            alt="planet"
          />

          <img
            src="/planet2.png"
            className="planet planet2 rotate-medium"
            data-scroll
            data-scroll-speed="-0.3"
            data-scroll-direction="vertical"
            alt="planet"
          />

          <img
            src="/planet3.png"
            className="planet planet3 rotate-fast"
            data-scroll
            data-scroll-speed="0.2"
            data-scroll-direction="vertical"
            alt="planet"
          />

          {/* Floating clouds */}
          <img
            src="/cloud.png"
            className="cloud cloud1 float-drift"
            data-scroll
            data-scroll-speed="0.3"
            data-scroll-direction="horizontal"
            alt="cloud"
          />

          <img
            src="/cloud.png"
            className="cloud cloud2 float-drift-reverse"
            data-scroll
            data-scroll-speed="-0.35"
            data-scroll-direction="horizontal"
            alt="cloud"
          />
          
          <img
            src="/cloud.png"
            className="cloud cloud3 float-soft"
            data-scroll
            data-scroll-speed="0.2"
            data-scroll-direction="horizontal"
            alt="cloud"
          />
          
          <img
            src="/cloud.png"
            className="cloud cloud4 float-medium"
            data-scroll
            data-scroll-speed="-0.5"
            data-scroll-direction="vertical"
            alt="cloud"
          />
          
          <img
            src="/cloud.png"
            className="cloud cloud5 float-fast"
            data-scroll
            data-scroll-speed="0.4"
            data-scroll-direction="horizontal"
            alt="cloud"
          />
          
          <img
            src="/cloud.png"
            className="cloud cloud6 float-gentle"
            data-scroll
            data-scroll-speed="-0.2"
            data-scroll-direction="horizontal"
            alt="cloud"
          />

          {/* Additional planets for depth */}
          <img
            src="/planet3.png"
            className="planet planet4 rotate-very-slow"
            data-scroll
            data-scroll-speed="0.45"
            data-scroll-direction="vertical"
            alt="planet"
          />

          {/* <img
            src="/planet2.png"
            className="planet planet5 rotate-medium"
            data-scroll
            data-scroll-speed="-0.15"
            data-scroll-direction="vertical"
            alt="planet"
          /> */}

          {/* Additional clouds */}
          {/* <img
            src="/cloud.png"
            className="cloud cloud7 float-smooth"
            data-scroll
            data-scroll-speed="-0.25"
            data-scroll-direction="horizontal"
            alt="cloud"
          /> */}

          {/* <img
            src="/cloud.png"
            className="cloud cloud8 float-smooth-reverse"
            data-scroll
            data-scroll-speed="0.3"
            data-scroll-direction="horizontal"
            alt="cloud"
          /> */}

          {/* Shooting star effect */}
          <div className="shooting-star" />
          <div className="shooting-star-2" />
        </div>

        {/* ===== HERO SECTION ===== */}
        <section className="hero" id="home" data-scroll-section>
          <motion.div
            className="hero-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.h1 
                className="name"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(79,70,229,0.3)",
                    "0 0 40px rgba(79,70,229,0.6)",
                    "0 0 20px rgba(79,70,229,0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Md. Jobayer Patwary
              </motion.h1>
              <h2 className="role">
                Graphics Designer <span className="glow-text">&</span> Front-End Developer
              </h2>
              <p className="intro">
                I blend creativity and technology to craft visually striking
                designs and smooth user experiences.
              </p>
              <div className="hero-buttons">
                <a href="#projects" className="cursor-target btn btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="cursor-target btn btn-outline">
                  Contact Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== ABOUT SECTION ===== */}
        <motion.section
          className="about"
          id="about"
          data-scroll-section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title">About Me</h2>

          <motion.p
            className="about-intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi! I'm <span className="gradient-text">Jobayer Patwary</span>, a passionate creative and
            front-end developer based in <span className="gradient-text">Bangladesh</span>.
          </motion.p>

          <motion.div
            className="about-details"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              I'm <span className="highlight">Md. Jobayer Patwary</span>, a creative <span className="highlight">graphics designer</span> and <span className="highlight">front-end developer</span> from <span className="highlight">Bangladesh</span>. My life revolves around <span className="highlight">learning</span>, <span className="highlight">creating</span>, and <span className="highlight">improving my craft</span> every day. Most of my time is spent exploring <span className="highlight">new design ideas</span>, experimenting with <span className="highlight">layouts</span>, refining <span className="highlight">color palettes</span>, and writing <span className="highlight">clean, responsive code</span> that brings visuals to life on the web.
            </p>

            <p>
              I was drawn to design because I love <span className="highlight">visual expression</span>—creating <span className="highlight">logos</span>, <span className="highlight">posters</span>, <span className="highlight">brand identities</span>, and <span className="highlight">modern UI layouts</span>—but over time I realized I wanted more control over how my designs <span className="highlight">function in real projects</span>. That curiosity led me to <span className="highlight">front-end development</span>, and now I enjoy combining <span className="highlight">design thinking</span> with <span className="highlight">technical execution</span> using <span className="highlight">HTML</span>, <span className="highlight">CSS</span>, <span className="highlight">JavaScript</span>, and <span className="highlight">React</span>.
            </p>

            <p>
              I approach my work with <span className="highlight">attention to detail</span> and <span className="highlight">intention</span>. <span className="highlight">Typography</span>, <span className="highlight">spacing</span>, <span className="highlight">color harmony</span>, and <span className="highlight">motion</span> matter to me because these small things shape how users feel when interacting with a product. Whether I'm designing a logo, crafting a poster, or building a <span className="highlight">responsive website</span>, I focus on <span className="highlight">clarity</span>, <span className="highlight">balance</span>, and <span className="highlight">usability</span>.
            </p>

            <p>
              I like creating interfaces that feel <span className="highlight">smooth</span> and <span className="highlight">intuitive</span>, where <span className="highlight">animations enhance the experience</span> rather than distract from it. Tools like <span className="highlight">Adobe Photoshop</span>, <span className="highlight">Illustrator</span>, <span className="highlight">Figma</span>, and <span className="highlight">Canva</span> are a big part of my daily workflow, and I often switch between design tools and code editors to refine both the <span className="highlight">visuals</span> and <span className="highlight">functionality</span> of my projects.
            </p>
          </motion.div>

          <motion.div
            className="tech-skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>My Toolkit</h3>
            <div className="cursor-target tech-list">
              {[
                "Adobe Photoshop",
                "Illustrator",
                "Figma",
                "Canva",
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Python",
                "C/C++",
              ].map((tech, index) => (
                <motion.span 
                  key={index}
                  whileHover={{ scale: 1.1, y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ===== SKILLS SECTION ===== */}
        <motion.section
          className="skills"
          id="skills"
          data-scroll-section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <div className="skills-grid">
            {[
              "Adobe Photoshop",
              "Illustrator",
              "Figma",
              "HTML / CSS / JS",
              "React",
              "Canva",
              "Python",
              "UI/UX Design",
              "React Native",
              "Photopea",
              "Inkscape",
              "Sketching",
              "Speed Cubing",
              "Painting",
              "Brand Identity",
            ].map((skill, index) => (
              <motion.div
                className="cursor-target skill-card"
                key={index}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(79,70,229,0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="skill-name">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ===== PROJECTS SECTION ===== */}
        <section
          className="projects"
          id="projects"
          data-scroll-section
        >
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">A collection of my creative work and development projects</p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ===== CONTACT SECTION ===== */}
        <motion.section
          className="contact"
          id="contact"
          data-scroll-section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-text">Follow me on my social accounts or reach out directly!</p>
          <div className="cursor-target social-links">
            <motion.a
              href="https://github.com/JubbaMan"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
            <motion.a
              href="https://www.instagram.com/f1_jubba/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Instagram
            </motion.a>
            <motion.a
              href="mailto:jubbathegreat@gmail.com"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Email
            </motion.a>
          </div>
        </motion.section>

        {/* ===== FOOTER ===== */}
        <footer data-scroll-section>
          <p>
            © {new Date().getFullYear()} Md. Jobayer Patwary — All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;