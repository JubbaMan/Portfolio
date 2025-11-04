import React from "react";
import { motion } from "framer-motion";
import "./Details.css";

const Details = () => {
  return (
    <motion.div
      className="details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>About Me in Detail</h2>
      <p>
        Hi! I’m Jobayer, a passionate creative based in Bangladesh. I love
        turning ideas into visuals and interactive designs. I specialize in
        building portfolio websites, creating brand identities, and designing
        digital products with elegance and clarity.
      </p>
      <ul>
        <li>✅ Graphics Design (Photoshop, Illustrator, Figma, Canva)</li>
        <li>✅ Front-End Development (HTML, CSS, JS, React)</li>
        <li>✅ UI/UX Design and Modern Web Layouts</li>
        <li>✅ Logo, Poster, and Branding Design</li>
      </ul>
    </motion.div>
  );
};

export default Details;
