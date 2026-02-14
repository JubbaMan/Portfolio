import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './CartoonBackground.css';

// Custom hook for optimized mouse tracking
const useOptimizedMouse = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rafRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        rafRef.current = null;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [mouseX, mouseY]);
  
  return { mouseX, mouseY };
};

// Optimized Code Element
const CodeElement = React.memo(({ el, mouseX, mouseY, dimensions }) => {
  // Create transforms inside component to avoid hook issues
  const elementPixelX = (el.x / 100) * dimensions.width;
  const elementPixelY = (el.y / 100) * dimensions.height;
  
  const pullX = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 15;
      return distance === 0 ? 0 : (dx / distance) * strength;
    }
    return 0;
  });
  
  const pullY = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 15;
      return distance === 0 ? 0 : (dy / distance) * strength;
    }
    return 0;
  });
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(pullX, springConfig);
  const springY = useSpring(pullY, springConfig);
  
  return (
    <motion.div
      className="code-float"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.3,
        y: [0, -6, 0, 6, 0]
      }}
      transition={{
        opacity: { duration: 0.8 },
        y: {
          duration: 6 + (el.x % 4),
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }}
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        fontSize: `${el.size}px`,
        color: el.color,
        x: springX,
        y: springY,
        position: 'absolute',
        fontFamily: 'Fira Code, monospace',
        fontWeight: 500,
        textShadow: `0 0 8px ${el.color}`,
        whiteSpace: 'nowrap',
        zIndex: 2,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {el.snippet}
    </motion.div>
  );
});

// Optimized Bracket Element
const BracketElement = React.memo(({ el, mouseX, mouseY, dimensions }) => {
  const elementPixelX = (el.x / 100) * dimensions.width;
  const elementPixelY = (el.y / 100) * dimensions.height;
  
  const pullX = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 15;
      return distance === 0 ? 0 : (dx / distance) * strength;
    }
    return 0;
  });
  
  const pullY = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 15;
      return distance === 0 ? 0 : (dy / distance) * strength;
    }
    return 0;
  });
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(pullX, springConfig);
  const springY = useSpring(pullY, springConfig);
  
  return (
    <motion.div
      className="bracket-float"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.3,
        rotate: [0, 3, 0, -3, 0]
      }}
      transition={{
        opacity: { duration: 0.8 },
        rotate: {
          duration: 8 + (el.y % 5),
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "mirror"
        }
      }}
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        fontSize: `${el.size}px`,
        color: el.color,
        x: springX,
        y: springY,
        position: 'absolute',
        fontFamily: 'Fira Code, monospace',
        fontWeight: 600,
        textShadow: `0 0 12px ${el.color}`,
        whiteSpace: 'nowrap',
        zIndex: 3,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {el.symbol}
    </motion.div>
  );
});

// Optimized Shape Element
const ShapeElement = React.memo(({ el, mouseX, mouseY, dimensions }) => {
  const elementPixelX = (el.x / 100) * dimensions.width;
  const elementPixelY = (el.y / 100) * dimensions.height;
  
  const pullX = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 12;
      return distance === 0 ? 0 : (dx / distance) * strength;
    }
    return 0;
  });
  
  const pullY = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 12;
      return distance === 0 ? 0 : (dy / distance) * strength;
    }
    return 0;
  });
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(pullX, springConfig);
  const springY = useSpring(pullY, springConfig);
  
  return (
    <motion.div
      className={`shape-float ${el.type}`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 0.2,
        rotate: [0, 360]
      }}
      transition={{
        opacity: { duration: 1 },
        rotate: {
          duration: 15 + (el.size % 10),
          repeat: Infinity,
          ease: "linear",
        }
      }}
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        width: `${el.size}px`,
        height: `${el.size}px`,
        backgroundColor: el.type === 'triangle' ? 'transparent' : el.color,
        borderBottomColor: el.type === 'triangle' ? el.color : undefined,
        x: springX,
        y: springY,
        position: 'absolute',
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
});

// Optimized Terminal Element
const TerminalElement = React.memo(({ el, mouseX, mouseY, dimensions }) => {
  const elementPixelX = (el.x / 100) * dimensions.width;
  const elementPixelY = (el.y / 100) * dimensions.height;
  
  const pullX = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 12;
      return distance === 0 ? 0 : (dx / distance) * strength;
    }
    return 0;
  });
  
  const pullY = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!dimensions.width || !dimensions.height) return 0;
    const dx = mx - elementPixelX;
    const dy = my - elementPixelY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 180) {
      const strength = Math.max(0, 1 - distance / 180) * 12;
      return distance === 0 ? 0 : (dy / distance) * strength;
    }
    return 0;
  });
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.1 };
  const springX = useSpring(pullX, springConfig);
  const springY = useSpring(pullY, springConfig);
  
  return (
    <motion.div
      className="terminal-float"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.35 }}
      transition={{ opacity: { duration: 0.8 } }}
      style={{
        left: `${el.x}%`,
        top: `${el.y}%`,
        x: springX,
        y: springY,
        position: 'absolute',
        zIndex: 4,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <div className="terminal-mini">
        <span className="terminal-prompt">$</span>
        {el.command}
      </div>
    </motion.div>
  );
});

const CartoonBackground = ({ theme = 'dark' }) => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isLoaded, setIsLoaded] = useState(false);
  const { mouseX, mouseY } = useOptimizedMouse();
  
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 100, mass: 0.1 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 100, mass: 0.1 });
  
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    
    const loadTimer = setTimeout(() => setIsLoaded(true), 200);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadTimer);
      clearTimeout(resizeTimer);
    };
  }, []);
  
  // Memoized elements
  const elements = useMemo(() => ({
    codeElements: [
      { id: 'c1', x: 15, y: 30, size: 24, snippet: 'fn()', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'c2', x: 85, y: 70, size: 28, snippet: 'const', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'c3', x: 45, y: 85, size: 22, snippet: 'effect', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
      { id: 'c4', x: 75, y: 25, size: 26, snippet: '<div>', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'c5', x: 25, y: 65, size: 24, snippet: 'import', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'c6', x: 55, y: 15, size: 26, snippet: 'export', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
    ],
    bracketElements: [
      { id: 'b1', x: 10, y: 80, size: 38, symbol: '{ }', color: theme === 'light' ? '#be185d' : '#ec4899' },
      { id: 'b2', x: 90, y: 20, size: 42, symbol: '[ ]', color: theme === 'light' ? '#1e40af' : '#4f46e5' },
      { id: 'b3', x: 35, y: 45, size: 36, symbol: '( )', color: theme === 'light' ? '#6366f1' : '#a5b4fc' },
    ],
    shapeElements: [
      { id: 's1', x: 60, y: 40, size: 32, type: 'circle', color: theme === 'light' ? '#10b981' : '#34d399' },
      { id: 's2', x: 5, y: 50, size: 28, type: 'triangle', color: theme === 'light' ? '#f59e0b' : '#fbbf24' },
      { id: 's3', x: 95, y: 75, size: 30, type: 'square', color: theme === 'light' ? '#ef4444' : '#f87171' },
    ],
    terminalElements: [
      { id: 't1', x: 70, y: 60, command: 'npm start' },
      { id: 't2', x: 20, y: 15, command: 'git push' },
    ]
  }), [theme]);
  
  return (
    <motion.div 
      className={`cartoon-background ${theme}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <div className={`base-gradient ${theme}`} />
      <div className="subtle-grid" />
      
      {isLoaded && dimensions.width > 0 && dimensions.height > 0 && (
        <>
          {elements.codeElements.map((el) => (
            <CodeElement 
              key={el.id} 
              el={el} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              dimensions={dimensions} 
            />
          ))}
          
          {elements.bracketElements.map((el) => (
            <BracketElement 
              key={el.id} 
              el={el} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              dimensions={dimensions} 
            />
          ))}
          
          {elements.shapeElements.map((el) => (
            <ShapeElement 
              key={el.id} 
              el={el} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              dimensions={dimensions} 
            />
          ))}
          
          {elements.terminalElements.map((el) => (
            <TerminalElement 
              key={el.id} 
              el={el} 
              mouseX={mouseX} 
              mouseY={mouseY} 
              dimensions={dimensions} 
            />
          ))}
        </>
      )}
      
      <motion.div
        className="mouse-glow"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </motion.div>
  );
};

export default React.memo(CartoonBackground);