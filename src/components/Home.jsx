import React from "react";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CartoonBackground from "./CartoonBackground";
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
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(79,70,229,0.3)",
      }}
    >
      {/* Preview */}
      {project.preview && (
        <div className="project-preview">
          <img
            src={project.preview}
            alt={project.title}
            loading="lazy"
          />
        </div>
      )}

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
            Live
          </a>
        )}
        {project.source && (
          <a className="code" href={project.source} target="_blank" rel="noreferrer">
            Code
          </a>
        )}
        {project.files && (
          <a className="files" href={project.files} download>
            Files
          </a>
        )}
      </div>
    </motion.div>
  );
};


/* ===== HOME COMPONENT ===== */
const Home = () => {
  const scrollRef = React.createRef();

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true
    });

    // update scroll when images load
    const images = scrollRef.current.querySelectorAll("img");
    images.forEach((img) => {
      img.addEventListener("load", () => scroll.update());
    });

    // cleanup
    return () => scroll.destroy();
  }, []);

  const projects = [
    {
      title: "Personal Portfolio",
      description: "You're already feeling it:)",
      tech: ["React", "CSS", "Framer Motion"],
      preview: "/previews/Screenshot 2026-01-23 202141.png",
      live: "https://jobayer-me.vercel.app",
      source: "https://github.com/JubbaMan/Portfolio",
    },
    {
      title: "To Do App",
      description: "A basic To Do App for basic task tracking",
      tech: ["React", "CSS", "Framer Motion"],
      preview: "/previews/Screenshot 2026-01-23 203607.png",
      live: "https://todo-app-of-the-elite.vercel.app/",
      source: "https://github.com/JubbaMan/TodoApp",
    },
    {
      title: "JBL Post Recreation",
      description: "I tried my best to recreate an existing post.",
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
      description: "A bunny lamp? I need it rn!!!",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/Lamppost (2).jpg",
      files: "/previews/Lamppost (2).jpg",
    },
    {
      title: "Cool Laptop Ad",
      description: "First time i tried this type of post idea..",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/lappy.jpg",
      files: "/previews/lappy.jpg",
    },
    {
      title: "Jeep Car Ad",
      description: "A concept ad for a Jeep car.",
      tech: ["Illustrator", "Photoshop"],
      preview: "/previews/JeepInsta.jpg",
      files: "/previews/JeepInsta.jpg",
    },
    {
      title: "Stapler Ad",
      description: "Expect the unexpected, a cool ad for stapler also exists!",
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
      <div className="scroll" ref={scrollRef}  data-scroll-container>
        <div className="bg" />
        <div className="parallax-wrapper">
  {/* Moon - gentle floating animation + subtle parallax throughout */}
  <img
    src="/moon.png"
    className="moon float-animation"
    data-scroll
    data-scroll-speed="-0.2"
    data-scroll-direction="vertical"
    alt="moon"
  />

  {/* Planets - different floating animations + parallax throughout */}
  <img
    src="/planet1.png"
    className="planet planet1 float-slow"
    data-scroll
    data-scroll-speed="0.25"
    data-scroll-direction="vertical"
    alt="planet"
  />

  <img
    src="/planet2.png"
    className="planet planet2 float-medium"
    data-scroll
    data-scroll-speed="-0.2"
    data-scroll-direction="vertical"
    alt="planet"
  />

  <img
    src="/planet3.png"
    className="planet planet3 float-fast"
    data-scroll
    data-scroll-speed="0.15"
    data-scroll-direction="vertical"
    alt="planet"
  />

  {/* Clouds - drifting animations + horizontal parallax throughout */}
  <img
    src="/cloud.png"
    className="cloud cloud1 drift-left"
    data-scroll
    data-scroll-speed="0.2"
    data-scroll-direction="horizontal"
    alt="cloud"
  />

  <img
    src="/cloud.png"
    className="cloud cloud2 drift-right"
    data-scroll
    data-scroll-speed="-0.25"
    data-scroll-direction="horizontal"
    alt="cloud"
  />
  
  <img
    src="/cloud.png"
    className="cloud cloud3 drift-left-slow"
    data-scroll
    data-scroll-speed="0.15"
    data-scroll-direction="horizontal"
    alt="cloud"
  />
  
  <img
    src="/cloud.png"
    className="cloud cloud4 drift-right-medium"
    data-scroll
    data-scroll-speed="-0.2"
    data-scroll-direction="horizontal"
    alt="cloud"
  />
  
  <img
    src="/cloud.png"
    className="cloud cloud5 drift-left-fast"
    data-scroll
    data-scroll-speed="0.3"
    data-scroll-direction="horizontal"
    alt="cloud"
  />
  
  <img
    src="/cloud.png"
    className="cloud cloud6 drift-right-slow"
    data-scroll
    data-scroll-speed="-0.15"
    data-scroll-direction="horizontal"
    alt="cloud"
  />

  {/* Additional planets for lower sections */}
  <img
    src="/planet3.png"
    className="planet planet4 float-very-slow"
    data-scroll
    data-scroll-speed="0.35"
    data-scroll-direction="vertical"
    alt="planet"
  />

  <img
    src="/planet2.png"
    className="planet planet5 float-medium"
    data-scroll
    data-scroll-speed="-0.1"
    data-scroll-direction="vertical"
    alt="planet"
  />

  {/* Additional clouds for lower sections */}
  <img
    src="/cloud.png"
    className="cloud cloud7 drift-right"
    data-scroll
    data-scroll-speed="-0.2"
    data-scroll-direction="horizontal"
    alt="cloud"
  />

  <img
    src="/cloud.png"
    className="cloud cloud8 drift-left"
    data-scroll
    data-scroll-speed="0.25"
    data-scroll-direction="horizontal"
    alt="cloud"
  />
</div>

      {/* ===== HERO SECTION ===== */}

      <section className="hero" id="home" >
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
            <h1 className="name">Md. Jobayer Patwary</h1>
            <h2 className="role">
              Graphics Designer <span>&</span> Front-End Developer
            </h2>
            <p className="intro">
              I blend creativity and technology to craft visually striking
              designs and smooth user experiences.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="cursor-target btn">
                View My Work
              </a>
              <a href="#contact" className="cursor-target btn-outline">
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
          Hi! I’m <strong>Jobayer Patwary</strong>, a passionate creative and
          front-end developer based in <strong>Bangladesh</strong>.
        </motion.p>

        <motion.p
          className="about-details"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p>
            I’m <span className="highlight">Md. Jobayer Patwary</span>, a creative <span className="highlight">graphics designer</span> and <span className="highlight">front-end developer</span> from <span className="highlight">Bangladesh</span>. My life revolves around <span className="highlight">learning</span>, <span className="highlight">creating</span>, and <span className="highlight">improving my craft</span> every day. Most of my time is spent exploring <span className="highlight">new design ideas</span>, experimenting with <span className="highlight">layouts</span>, refining <span className="highlight">color palettes</span>, and writing <span className="highlight">clean, responsive code</span> that brings visuals to life on the web. I was drawn to design because I love <span className="highlight">visual expression</span>—creating <span className="highlight">logos</span>, <span className="highlight">posters</span>, <span className="highlight">brand identities</span>, and <span className="highlight">modern UI layouts</span>—but over time I realized I wanted more control over how my designs <span className="highlight">function in real projects</span>. That curiosity led me to <span className="highlight">front-end development</span>, and now I enjoy combining <span className="highlight">design thinking</span> with <span className="highlight">technical execution</span> using <span className="highlight">HTML</span>, <span className="highlight">CSS</span>, <span className="highlight">JavaScript</span>, and <span className="highlight">React</span>.
          </p>

          <p>
            I approach my work with <span className="highlight">attention to detail</span> and <span className="highlight">intention</span>. <span className="highlight">Typography</span>, <span className="highlight">spacing</span>, <span className="highlight">color harmony</span>, and <span className="highlight">motion</span> matter to me because these small things shape how users feel when interacting with a product. Whether I’m designing a logo, crafting a poster, or building a <span className="highlight">responsive website</span>, I focus on <span className="highlight">clarity</span>, <span className="highlight">balance</span>, and <span className="highlight">usability</span>. I like creating interfaces that feel <span className="highlight">smooth</span> and <span className="highlight">intuitive</span>, where <span className="highlight">animations enhance the experience</span> rather than distract from it. Tools like <span className="highlight">Adobe Photoshop</span>, <span className="highlight">Illustrator</span>, <span className="highlight">Figma</span>, and <span className="highlight">Canva</span> are a big part of my daily workflow, and I often switch between design tools and code editors to refine both the <span className="highlight">visuals</span> and <span className="highlight">functionality</span> of my projects.
          </p>

          <p>
            Beyond tools and technologies, my lifestyle is built around <span className="highlight">self-learning</span> and <span className="highlight">experimentation</span>. I constantly study <span className="highlight">modern design trends</span>, <span className="highlight">UI/UX principles</span>, and <span className="highlight">front-end best practices</span>, and I apply what I learn directly to <span className="highlight">personal projects</span> and <span className="highlight">creative experiments</span>. I enjoy <span className="highlight">breaking things down</span>, rebuilding them better, and understanding not just <span className="highlight">how</span> something works, but <span className="highlight">why</span> it works. This mindset helps me grow steadily and adapt quickly, whether I’m working on <span className="highlight">branding</span>, <span className="highlight">posters</span>, or <span className="highlight">interactive web experiences</span>.
          </p>

          <p>
            At the core, my goal is to create work that feels <span className="highlight">thoughtful</span>, <span className="highlight">modern</span>, and <span className="highlight">meaningful</span>. I want projects that <span className="highlight">communicate clearly</span>, look <span className="highlight">visually strong</span>, and <span className="highlight">perform smoothly</span> across devices. I see myself as a <span className="highlight">versatile creative</span> who values both <span className="highlight">aesthetics</span> and <span className="highlight">functionality</span>. I’m motivated by the idea of continuously <span className="highlight">evolving</span> as a designer and developer while creating work that leaves a <span className="highlight">lasting, positive impression</span>.
          </p>

        </motion.p>

        <motion.div
          className="tech-skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3>My Tools :</h3>
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
              <span key={index}>{tech}</span>
            ))}
          </div>
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
            "Python Automation",
            "Javascript DOM",
            "React Native",
            "Photopea",
            "Inkscape",
            "Sketching",
            "Speed Cubing",
            "Painting",
            "UI/UX designing",
          ].map((skill, index) => (
            <motion.div
              className="cursor-target skill-card"
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
      <section
        className="projects"
        id="projects"
      >
        <h2>Projects</h2>

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
        
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Let’s Connect</h2>
        <p>Follow me on my social accounts or reach out directly!</p>
        <div className="cursor-target social-links">
          <a
            href="https://github.com/JubbaMan"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/f1_jubba/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </motion.section>

      {/* ===== FOOTER ===== */}
      <footer>
        <p>
          © {new Date().getFullYear()} Md. Jobayer Patwary — All Rights Reserved.
        </p>
      </footer>
    </div >
    </>
  );
};

export default Home;