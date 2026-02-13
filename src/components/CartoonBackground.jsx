import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CartoonBackground.css';

const CartoonBackground = ({ theme = 'dark' }) => {  // New prop for theme switching
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const backgroundRef = useRef(null);

  // Smooth mouse tracking with throttling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100, mass: 0.2 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Throttle mouse moves for performance
  let throttleTimer;
  const throttleMouseMove = (e) => {
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        if (backgroundRef.current) {
          mouseX.set(e.clientX);
          mouseY.set(e.clientY);
          const rect = backgroundRef.current.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          setMousePosition({ x, y });
        }
        throttleTimer = null;
      }, 16); // ~60fps
    }
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    setTimeout(() => setIsLoaded(true), 100);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', throttleMouseMove);
    return () => window.removeEventListener('mousemove', throttleMouseMove);
  }, []);

  // Memoized elements for performance
  const elements = useMemo(() => ({
    codeElements: [
      { id: 'code-1', x: 15, y: 30, size: 32, snippet: 'function()', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'code-2', x: 85, y: 70, size: 36, snippet: 'const =', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'code-3', x: 45, y: 85, size: 28, snippet: 'useEffect', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
      { id: 'code-4', x: 75, y: 25, size: 34, snippet: '<div />', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'code-5', x: 25, y: 65, size: 30, snippet: 'import', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'code-6', x: 55, y: 15, size: 32, snippet: 'export', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
    ],
    bracketElements: [
      { id: 'bracket-1', x: 10, y: 80, size: 48, symbol: '{ }', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'bracket-2', x: 90, y: 20, size: 52, symbol: '[ ]', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'bracket-3', x: 35, y: 45, size: 44, symbol: '( )', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
    ],
    shapeElements: [  // New: Floating geometric shapes
      { id: 'shape-1', x: 60, y: 40, size: 40, type: 'circle', color: theme === 'light' ? '#10b981' : '#34d399' },
      { id: 'shape-2', x: 5, y: 50, size: 35, type: 'triangle', color: theme === 'light' ? '#f59e0b' : '#fbbf24' },
      { id: 'shape-3', x: 95, y: 75, size: 38, type: 'square', color: theme === 'light' ? '#ef4444' : '#f87171' },
    ],
    terminalElements: [
      { id: 'term-1', x: 70, y: 60, command: 'npm start' },
      { id: 'term-2', x: 20, y: 15, command: 'git push' },
    ]
  }), [theme]);

  const getMagneticPull = (elementX, elementY, strength = 0.3) => {
    if (!dimensions.width || !dimensions.height) return { x: 0, y: 0 };
    
    const elementPixelX = (elementX / 100) * dimensions.width;
    const elementPixelY = (elementY / 100) * dimensions.height;
    const mousePixelX = mouseX.get();
    const mousePixelY = mouseY.get();
    
    const dx = mousePixelX - elementPixelX;
    const dy = mousePixelY - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const radius = 200;
    const maxPull = 30;
    
    if (distance < radius) {
      const falloff = Math.pow(1 - distance / radius, 1.5);
      let pull = falloff * maxPull * strength;
      if (distance < 50) pull *= -0.5; // Slight repulsion when very close
      const angle = Math.atan2(dy, dx);
      return {
        x: Math.cos(angle) * pull,
        y: Math.sin(angle) * pull,
      };
    }
    return { x: 0, y: 0 };
  };

  const getParallaxOffset = (elementX, elementY, factor = 0.1) => {
    const offsetX = mousePosition.x * factor * 50;
    const offsetY = mousePosition.y * factor * 50;
    return { x: offsetX, y: offsetY };
  };

  return (
    <motion.div 
      className={`cartoon-background ${theme}`}
      ref={backgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* Base gradient with animation */}
      <motion.div 
        className="base-gradient"
        animate={{
          background: theme === 'light' 
            ? ['linear-gradient(135deg, #f3f4f6, #e5e7eb)', 'linear-gradient(135deg, #e5e7eb, #f3f4f6)']
            : ['linear-gradient(135deg, #0f0f10, #1a1a1a)', 'linear-gradient(135deg, #1a1a1a, #0f0f10)']
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Subtle grid */}
      <div className="subtle-grid" />
      
      {/* Code elements */}
      {isLoaded && elements.codeElements.map((el) => {
        const pull = getMagneticPull(el.x, el.y, 0.4);
        const parallax = getParallaxOffset(el.x, el.y, 0.05);
        
        return (
          <motion.div
            key={el.id}
            className="code-float"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.4, 
              scale: 1,
              y: [0, -10, 0, 10, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: Math.random() * 0.5 },
              scale: { duration: 1.2, delay: Math.random() * 0.5 },
              y: {
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.size}px`,
              color: el.color,
              x: pull.x + parallax.x,
              y: pull.y + parallax.y,
              position: 'absolute',
              fontFamily: 'Fira Code, monospace',
              fontWeight: 500,
              textShadow: `0 0 10px ${el.color}`,
              whiteSpace: 'nowrap',
              zIndex: 2,
            }}
          >
            {el.snippet}
          </motion.div>
        );
      })}

      {/* Bracket elements */}
      {isLoaded && elements.bracketElements.map((el) => {
        const pull = getMagneticPull(el.x, el.y, 0.5);
        const parallax = getParallaxOffset(el.x, el.y, 0.03);
        
        return (
          <motion.div
            key={el.id}
            className="bracket-float"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 0.35, 
              scale: 1,
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              opacity: { duration: 1.2, delay: 0.2 + Math.random() * 0.3 },
              scale: { duration: 1.2, delay: 0.2 + Math.random() * 0.3 },
              rotate: {
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              fontSize: `${el.size}px`,
              color: el.color,
              x: pull.x + parallax.x,
              y: pull.y + parallax.y,
              position: 'absolute',
              fontFamily: 'Fira Code, monospace',
              fontWeight: 600,
              textShadow: `0 0 15px ${el.color}`,
              whiteSpace: 'nowrap',
              zIndex: 3,
            }}
          >
            {el.symbol}
          </motion.div>
        );
      })}

      {/* Shape elements */}
      {isLoaded && elements.shapeElements.map((el) => {
        const pull = getMagneticPull(el.x, el.y, 0.3);
        const parallax = getParallaxOffset(el.x, el.y, 0.02);
        
        return (
          <motion.div
            key={el.id}
            className={`shape-float ${el.type}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 0.3, 
              scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 1.5, delay: 0.5 + Math.random() * 0.5 },
              scale: { duration: 1.5, delay: 0.5 + Math.random() * 0.5 },
              rotate: {
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }
            }}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              width: `${el.size}px`,
              height: `${el.size}px`,
              backgroundColor: el.color,
              x: pull.x + parallax.x,
              y: pull.y + parallax.y,
              position: 'absolute',
              zIndex: 1,
            }}
          />
        );
      })}

      {/* Terminal elements */}
      {isLoaded && elements.terminalElements.map((el) => {
        const pull = getMagneticPull(el.x, el.y, 0.25);
        const parallax = getParallaxOffset(el.x, el.y, 0.01);
        
        return (
          <motion.div
            key={el.id}
            className="terminal-float"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 + Math.random() * 0.3 }}
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              x: pull.x + parallax.x,
              y: pull.y + parallax.y,
              position: 'absolute',
              zIndex: 4,
            }}
          >
            <div className="terminal-mini">
              <span className="terminal-prompt">$</span>
              {el.command}
            </div>
          </motion.div>
        );
      })}

      {/* Enhanced stars */}
      <div className="stars-subtle">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="star-mini"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Enhanced mouse glow with pulse */}
      <motion.div
        className="mouse-glow"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default CartoonBackground;