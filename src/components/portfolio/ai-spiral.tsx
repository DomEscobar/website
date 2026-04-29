"use client";

import { useEffect, useRef } from 'react';
import Vivus from 'vivus';

const AiSpiral = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const vivusRef = useRef<Vivus | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (svgRef.current) {
        vivusRef.current = new Vivus(svgRef.current, { 
            duration: 150, 
            type: 'delayed',
            animTimingFunction: Vivus.EASE_OUT,
            start: 'manual'
        });

        observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting && vivusRef.current) {
                vivusRef.current.play();
                observer.disconnect();
            }
        }, { rootMargin: '0px', threshold: 0.8 });
    
        observer.observe(svgRef.current);
    }
    
    return () => {
        if (observer) observer.disconnect();
        vivusRef.current?.destroy();
    }
  }, []);

  return (
    <svg ref={svgRef} id="ai-spiral-svg" className="w-20 h-20 -ml-4" viewBox="0 0 100 100">
        <path d="M50,50 m0,-45 a45,45 0 1,1 0,90 a45,45 0 1,1 0,-90" stroke="hsl(var(--muted))" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M50,50 m0,-35 a35,35 0 1,1 0,70 a35,35 0 1,1 0,-70" stroke="hsl(var(--secondary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M50,50 m0,-25 a25,25 0 1,1 0,50 a25,25 0 1,1 0,-50" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
};

export default AiSpiral;
