"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const CicdProof = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      const particle = svgRef.current!.querySelector('#flow-particle');
      const stages = svgRef.current!.querySelectorAll('.stage');
      gsap.from(stages, { scale: 0, opacity: 0, stagger: 0.2, ease: 'back.out(1.7)' });

      const tl = gsap.timeline({ repeat: -1, delay: 1 });
      tl.set(particle, { attr: { cx: 50, cy: 100 }, opacity: 1 })
        .to(particle, {
          motionPath: {
            path: [{ x: 150, y: 100 }, { x: 250, y: 100 }, { x: 350, y: 100 }],
          },
          duration: 4,
          ease: 'power1.inOut',
        })
        .to(particle, { opacity: 0, duration: 0.5 });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 400 200" className="w-full h-full">
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--muted))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--muted-foreground))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g className="stage" transform="translate(50, 100)">
        <circle r="15" fill="hsl(var(--primary))" /><text fill="hsl(var(--foreground))" x="0" y="5" textAnchor="middle" fontSize="10">BUILD</text>
      </g>
      <g className="stage" transform="translate(150, 100)">
        <circle r="15" fill="hsl(var(--primary))" /><text fill="hsl(var(--foreground))" x="0" y="5" textAnchor="middle" fontSize="10">TEST</text>
      </g>
      <g className="stage" transform="translate(250, 100)">
        <circle r="15" fill="hsl(var(--primary))" /><text fill="hsl(var(--foreground))" x="0" y="5" textAnchor="middle" fontSize="10">DEPLOY</text>
      </g>
      <g className="stage" transform="translate(350, 100)">
        <circle r="15" fill="hsl(var(--primary))" /><text fill="hsl(var(--foreground))" x="0" y="5" textAnchor="middle" fontSize="10">DONE</text>
      </g>
      <circle id="flow-particle" r="4" fill="url(#flowGradient)" />
    </svg>
  );
};

export default CicdProof;
