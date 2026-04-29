"use client";

import { useLanguage } from "@/hooks/use-language";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Custom Animated SVGs
const MoonAnimated = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      className="moon-glow"
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      style={{ transformOrigin: 'center' }}
    />
  </svg>
);

const CoffeeAnimated = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <path className="steam steam-1" d="M6 2v2" />
    <path className="steam steam-2" d="M10 2v2" />
    <path className="steam steam-3" d="M14 2v2" />
  </svg>
);

const SparklesAnimated = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path 
        className="sparkle-star"
        d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" 
        style={{ transformOrigin: 'center' }}
    />
    <path className="sparkle-small" d="M5 3v4" style={{ transformOrigin: 'center' }} />
    <path className="sparkle-small" d="M19 17v4" style={{ transformOrigin: 'center' }} />
    <path className="sparkle-small" d="M3 5h4" style={{ transformOrigin: 'center' }} />
    <path className="sparkle-small" d="M17 19h4" style={{ transformOrigin: 'center' }} />
  </svg>
);


const funFactsData = [
  {
    key: "darkmode",
    icon: MoonAnimated,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    borderColor: "hover:border-indigo-500/50",
  },
  {
    key: "coffee",
    icon: CoffeeAnimated,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    borderColor: "hover:border-amber-600/50",
  },
  {
    key: "ai_whisperer",
    icon: SparklesAnimated,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    borderColor: "hover:border-sky-500/50",
  },
];

const FunFactCard = ({ fact }: { fact: typeof funFactsData[0] }) => {
    const { t } = useLanguage();
    const factText = t(`fun_facts.facts.${fact.key}`);
    const Icon = fact.icon;
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        // Initial setup
        gsap.set(el, { autoAlpha: 0, y: 30 });
        
        // Main entrance animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
            },
        });

        tl.to(el, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
        });

        // Hover animations setup
        const moonGlow = el.querySelector('.moon-glow');
        const steamParticles = el.querySelectorAll('.steam');
        const sparkles = el.querySelectorAll('.sparkle-small');
        const sparkleStar = el.querySelector('.sparkle-star');

        // Continuous animations or hover effects
        if (fact.key === 'darkmode' && moonGlow) {
             gsap.to(moonGlow, {
                rotate: 15,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
             });
        }

        if (fact.key === 'coffee' && steamParticles.length > 0) {
            gsap.to(steamParticles, {
                y: -5,
                opacity: 0.2,
                duration: 1.5,
                stagger: 0.3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
         
        if (fact.key === 'ai_whisperer') {
             if (sparkles.length > 0) {
                 gsap.to(sparkles, {
                     scale: 1.2,
                     opacity: 0.5,
                     duration: 0.8,
                     stagger: 0.2,
                     yoyo: true,
                     repeat: -1,
                     ease: "sine.inOut",
                 });
             }
             if (sparkleStar) {
                 gsap.to(sparkleStar, {
                     rotate: 180,
                     duration: 4,
                     repeat: -1,
                     ease: "linear",
                 });
             }
        }

    }, [fact.key]);

    return (
        <div 
          ref={cardRef} 
          className={cn(
            "p-8 rounded-xl flex flex-col items-center text-center border border-border/40 transition-all duration-500",
            "hover:shadow-lg hover:-translate-y-2 bg-card",
            fact.borderColor
          )}
        >
            <div className={cn("p-4 rounded-2xl mb-6 transition-transform duration-300 hover:scale-110", fact.bgColor)}>
                <Icon className={cn("w-10 h-10", fact.color)} />
            </div>
            <p className="text-foreground/90 font-medium leading-relaxed">{factText}</p>
        </div>
    );
};

const FunFacts = () => {
  const { t } = useLanguage();

  return (
    <section id="fun-facts" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 g-fade-up">
            <h3 className="uppercase text-primary font-bold tracking-widest text-sm mb-3">
                {t("fun_facts.title")}
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
               Bit more about me
            </h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("fun_facts.subtitle")}
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
            {funFactsData.map((fact) => (
                <FunFactCard key={fact.key} fact={fact} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FunFacts;
