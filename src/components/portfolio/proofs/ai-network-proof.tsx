"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AiNetworkProof = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const ctx = gsap.context(() => {
      const lines = svgRef.current!.querySelector('.lines');
      if (!lines) return;
      
      const nodes = Array.from(svgRef.current!.querySelectorAll('.node')) as SVGCircleElement[];
      gsap.from(nodes, { scale: 0, stagger: 0.05, duration: 1, ease: 'power2.out' });

      for (let i = 0; i < 15; i++) {
        const n1 = nodes[Math.floor(Math.random() * nodes.length)];
        const n2 = nodes[Math.floor(Math.random() * nodes.length)];
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const x1 = n1.getAttribute('cx') || '0';
        const y1 = n1.getAttribute('cy') || '0';
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', n2.getAttribute('cx') || '0');
        line.setAttribute('y2', n2.getAttribute('cy') || '0');
        line.setAttribute('stroke', 'hsl(var(--secondary))');
        line.setAttribute('stroke-width', '0.5');
        lines.appendChild(line);

        gsap.from(line, {
          attr: { x2: x1, y2: y1 },
          duration: 1.5,
          delay: 0.5 + Math.random() * 0.5,
          ease: 'power2.inOut',
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <svg ref={svgRef} viewBox="0 0 400 200" className="w-full h-full">
        {Array.from({ length: 40 }).map((_, i) => (
          <circle key={i} className="node" cx={Math.random() * 400} cy={Math.random() * 200} r="2" fill="hsl(var(--muted-foreground))" />
        ))}
        <g className="lines"></g>
      </svg>
    </div>
  );
};

export default AiNetworkProof;
