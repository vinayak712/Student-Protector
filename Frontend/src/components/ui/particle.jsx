import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
};

const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Particles = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors = ["#4f46e5", "#6366f1", "#8b5cf6"],
  moveParticlesOnHover = true,
  particleHoverFactor = 1.5,
  alphaParticles = true,
  particleBaseSize = 3,
  sizeRandomness = 1.2,
  className,
  enableGlow = true,
  enableConnections = true,
  connectionOpacity = 0.15,
  connectionThreshold = 8,
  glowSize = 10,
  glowColor = "rgba(99, 102, 241, 0.15)",
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Resize handler with debounce
  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const { width, height } = canvas.getBoundingClientRect();
          canvas.width = width * window.devicePixelRatio;
          canvas.height = height * window.devicePixelRatio;
          setDimensions({ width: canvas.width, height: canvas.height });
        }
      }, 100);
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const dpr = window.devicePixelRatio;
    
    // Track mouse position
    const handleMouseMove = (e) => {
      if (!moveParticlesOnHover) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr
      };
    };
    
    // Initialize particles
    const initParticles = () => {
      const palette = particleColors.map(color => hexToRgb(color));
      const particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const colorIndex = Math.floor(Math.random() * palette.length);
        const size = particleBaseSize * (1 + sizeRandomness * (Math.random() - 0.5));
        
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * speed * 2 * dpr,
          vy: (Math.random() - 0.5) * speed * 2 * dpr,
          size: size * dpr,
          color: palette[colorIndex],
          alpha: alphaParticles ? Math.random() * 0.5 + 0.3 : 1,
          // New properties for modern effects
          pulse: Math.random() * 0.1,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulseCycle: Math.random() * Math.PI * 2,
          z: Math.random() * 0.5 + 0.5, // Z depth for parallax effect
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw connections first (behind particles)
      if (enableConnections) {
        ctx.lineWidth = 0.5 * dpr;
        
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < particleSpread * connectionThreshold * dpr) {
              const opacity = (1 - dist / (particleSpread * connectionThreshold * dpr)) * connectionOpacity;
              // Use gradient for connections for modern look
              const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              gradient.addColorStop(0, `rgba(${p1.color[0]}, ${p1.color[1]}, ${p1.color[2]}, ${opacity})`);
              gradient.addColorStop(1, `rgba(${p2.color[0]}, ${p2.color[1]}, ${p2.color[2]}, ${opacity})`);
              
              ctx.strokeStyle = gradient;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }
      
      // Draw particles
      particlesRef.current.forEach(p => {
        // Update pulse cycle
        p.pulseCycle += p.pulseSpeed;
        const pulseFactor = 1 + Math.sin(p.pulseCycle) * p.pulse;
        
        // Update position
        p.x += p.vx * p.z; // Parallax effect - faster particles appear closer
        p.y += p.vy * p.z;
        
        // Wrap around edges
        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;
        
        // Mouse interaction
        if (moveParticlesOnHover && mouseRef.current.x > 0) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150 * dpr) {
            const angle = Math.atan2(dy, dx);
            const force = (150 * dpr - dist) / (800 * dpr) * particleHoverFactor;
            p.vx -= Math.cos(angle) * force;
            p.vy -= Math.sin(angle) * force;
          }
        }
        
        // Add glow effect for particles
        if (enableGlow) {
          const glowRadius = p.size * glowSize * pulseFactor;
          const radialGradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, glowRadius
          );
          
          // Custom glow color based on the particle's color
          const particleGlowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0.08)`;
          
          radialGradient.addColorStop(0, particleGlowColor);
          radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = radialGradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw actual particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * pulseFactor, 0, Math.PI * 2);
        
        // Create gradient fill for better looking particles
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * pulseFactor
        );
        
        gradient.addColorStop(0, `rgba(${p.color[0] + 30}, ${p.color[1] + 30}, ${p.color[2] + 30}, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha * 0.8})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    canvas.addEventListener("mousemove", handleMouseMove);
    
    initParticles();
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    dimensions,
    particleCount,
    particleSpread,
    speed,
    particleColors,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    enableGlow,
    enableConnections,
    connectionOpacity,
    connectionThreshold,
    glowSize,
    glowColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className || ""}`}
      style={{ 
        pointerEvents: "none",
        width: '100%', 
        height: '100%'
      }}
    />
  );
};

Particles.propTypes = {
  particleCount: PropTypes.number,
  particleSpread: PropTypes.number,
  speed: PropTypes.number,
  particleColors: PropTypes.arrayOf(PropTypes.string),
  moveParticlesOnHover: PropTypes.bool,
  particleHoverFactor: PropTypes.number,
  alphaParticles: PropTypes.bool,
  particleBaseSize: PropTypes.number,
  sizeRandomness: PropTypes.number,
  className: PropTypes.string,
  enableGlow: PropTypes.bool,
  enableConnections: PropTypes.bool,
  connectionOpacity: PropTypes.number,
  connectionThreshold: PropTypes.number,
  glowSize: PropTypes.number,
  glowColor: PropTypes.string,
};

export default Particles;