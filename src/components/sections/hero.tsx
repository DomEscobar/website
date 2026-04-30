"use client";

import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { useEffect } from 'react';

const Hero = () => {
  const { t, language } = useLanguage();
  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <header
      id="home"
      className="h-screen flex flex-col justify-center items-start p-6 md:p-12 lg:p-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/dominic-h.png"
          alt="Hücki"
          className="absolute inset-0 h-full w-full object-contain object-right-top opacity-20 md:opacity-40"
          style={{
            maskImage:
              'radial-gradient(circle at 80% 40%, white 25%, transparent 55%)',
            WebkitMaskImage:
              'radial-gradient(circle at 80% 40%, white 25%, transparent 55%)',
          }}
        />
      </div>
      <div className="max-w-4xl relative z-10">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          id="main-headline"
        >
          Hücki
        </h1>
        <h2
          className="text-xl md:text-2xl lg:text-3xl font-light text-foreground/70 mt-4"
          id="sub-headline"
        >
          {t('hero.subtitle')}
        </h2>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="smooth-scroll"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="w-6 h-6 text-muted animate-bounce" />
        </a>
      </div>
    </header>
  );
};

export default Hero;
