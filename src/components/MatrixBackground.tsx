import React, { useEffect, useRef } from 'react';
import { ThemeColor } from '../types';

interface MatrixBackgroundProps {
  effect: 'matrix' | 'particles' | 'grid_nodes' | 'cyber_scan';
  themeColor: ThemeColor;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ effect, themeColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Color mapping
  const getColorHex = (color: ThemeColor) => {
    switch (color) {
      case 'cyan': return '#06b6d4';
      case 'green': return '#22c55e';
      case 'purple': return '#a855f7';
      case 'amber': return '#f59e0b';
      case 'rose': return '#f43f5e';
      default: return '#06b6d4';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const activeColor = getColorHex(themeColor);

    // Mouse tracking
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    if (effect === 'matrix') {
      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops: number[] = Array(columns).fill(1);
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン$%#@!&<>{}[]=/\\';

      const renderMatrix = () => {
        ctx.fillStyle = 'rgba(5, 7, 15, 0.08)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = activeColor;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Bright lead character
          if (Math.random() > 0.92) {
            ctx.fillStyle = '#ffffff';
          } else {
            ctx.fillStyle = activeColor;
          }

          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }

        animationFrameId = requestAnimationFrame(renderMatrix);
      };

      renderMatrix();
    } else if (effect === 'particles' || effect === 'grid_nodes') {
      const numParticles = Math.min(Math.floor((width * height) / 12000), 80);
      const particles = Array.from({ length: numParticles }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      }));

      const renderNodes = () => {
        ctx.clearRect(0, 0, width, height);

        // Draw background gradient
        const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
        bgGrad.addColorStop(0, '#0a0e1a');
        bgGrad.addColorStop(1, '#03050a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Particle updates
        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          // Draw node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = activeColor;
          ctx.fill();

          // Connect to mouse
          const dxMouse = mouse.x - p.x;
          const dyMouse = mouse.y - p.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = activeColor;
            ctx.globalAlpha = (1 - distMouse / 150) * 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }

          // Connect nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p2.x - p.x;
            const dy = p2.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = activeColor;
              ctx.globalAlpha = (1 - dist / 120) * 0.2;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        });

        animationFrameId = requestAnimationFrame(renderNodes);
      };

      renderNodes();
    } else {
      // Cyber scan
      let scanY = 0;
      const renderScan = () => {
        ctx.fillStyle = '#03050a';
        ctx.fillRect(0, 0, width, height);

        scanY = (scanY + 2) % height;
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.moveTo(0, scanY);
        ctx.lineTo(width, scanY);
        ctx.stroke();
        ctx.globalAlpha = 1;

        animationFrameId = requestAnimationFrame(renderScan);
      };
      renderScan();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [effect, themeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-700"
    />
  );
};
