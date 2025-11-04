import React from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Contact Me</h2>
      <p>Interested in working together? Drop me a message!</p>
      <a href="mailto:jobayer@example.com" className="btn">
        Say Hello
      </a>
      <div className="social-links">
        <a href="#">LinkedIn</a>
        <a href="#">GitHub</a>
        <a href="#">Instagram</a>
      </div>
    </motion.div>
  );
};

export default Contact;
