import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TargetCursor from './components/TargetCursor.jsx';
// Components
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Details from "./components/Details.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";



function App() {
  return (
    <Router>
      <Navbar />
            <TargetCursor 
        spinDuration={5}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
