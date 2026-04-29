"use client";

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { getProjects, type Project } from '@/lib/projects-data';
import { useLanguage } from '@/hooks/use-language';

import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Projects from '@/components/sections/projects';
import Skills from '@/components/sections/skills';
import Footer from '@/components/sections/footer';
import ProjectModal from './project-modal';
import { AIAdvisor } from './ai-advisor';
import Navbar from './navbar';
import Brands from '../sections/brands';
import FunFacts from '../sections/fun-facts';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PortfolioClient = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const projects = getProjects(language);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- UTILITIES ---
      const splitText = (selector: string, type: 'chars' | 'words' = 'chars') => {
        const element = document.querySelector(selector);
        if (!element) return [];
        const text = element.textContent?.trim() ?? '';
        const wrapperClass = type === 'chars' ? 'g-char' : 'g-word';
        const splitItems = type === 'chars' ? text.split('') : text.split(' ');
        
        element.innerHTML = splitItems.map(item => `<span class="${wrapperClass}">${item === ' ' ? '&nbsp;' : item}</span>`).join(type === 'chars' ? '' : ' ');
        return Array.from(element.querySelectorAll(`.${wrapperClass}`));
      };

      // --- SMOOTH SCROLL ---
      document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = (this as HTMLAnchorElement).getAttribute('href');
          if (targetId) {
            gsap.to(window, { duration: 1.5, scrollTo: { y: targetId, offsetY: 70 }, ease: 'power2.inOut' });
          }
        });
      });

      // --- ANIMATIONS ---
      const animateHero = () => {
        const mainHeadlineChars = splitText('#main-headline', 'chars');
        const subHeadlineWords = splitText('#sub-headline', 'words');

        const tl = gsap.timeline();
        tl.from(mainHeadlineChars, {
          y: 100,
          opacity: 0,
          stagger: 0.05,
          duration: 1,
          ease: 'power3.out',
        })
        .from(subHeadlineWords, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }, "-=0.5");

        const hero = document.getElementById('home');
        if (!hero) return;
        const mouseMoveHandler = (e: MouseEvent) => {
          if (window.innerWidth < 768) return;
          const { clientX, clientY } = e;
          const x = (clientX / window.innerWidth - 0.5) * 40;
          const y = (clientY / window.innerHeight - 0.5) * 40;
          gsap.to('#main-headline, #sub-headline', {
            x: -x,
            y: -y,
            duration: 1,
            ease: 'power3.out',
          });
        };
        hero.addEventListener('mousemove', mouseMoveHandler);

        return () => hero.removeEventListener('mousemove', mouseMoveHandler);
      };
      
      gsap.utils.toArray('.g-stagger-up').forEach(elem => {
        gsap.from(elem as HTMLElement, {
          scrollTrigger: { trigger: elem as HTMLElement, start: 'top 85%' },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      });
      
      gsap.utils.toArray('.g-fade-up').forEach(elem => {
        gsap.from(elem as HTMLElement, {
          scrollTrigger: { trigger: elem as HTMLElement, start: 'top 90%' },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        });
      });

      gsap.utils.toArray('.stat-value').forEach(stat => {
        const endValue = parseInt((stat as HTMLElement).dataset.value || '0');
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: 'power1.inOut',
          snap: { textContent: 1 },
          scrollTrigger: { trigger: stat as HTMLElement, start: 'top 85%' },
        });
      });

      gsap.from('.g-project-card', {
        scrollTrigger: { trigger: '#projects', start: 'top 70%' },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.from('.skill-pill', {
        scrollTrigger: { trigger: '#skills', start: 'top 70%' },
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      });
      
      const footer = document.querySelector('footer');
      if (footer) {
        gsap.from('.g-social-icon', { scrollTrigger: { trigger: footer, start: 'top 95%' }, opacity: 0, y: 20, stagger: 0.1, duration: 0.8 });
        gsap.from('.g-copyright', { scrollTrigger: { trigger: footer, start: 'top 95%' }, opacity: 0, duration: 1, delay: 0.3 });
      }

      const heroCleanup = animateHero();
      ScrollTrigger.refresh();

      return () => {
        heroCleanup();
      };
    }, mainRef);

    return () => ctx.revert();
  }, [language]);

  const handleOpenModal = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div ref={mainRef}>
      <Navbar />
      <Hero />
      <main className="w-full">
        <About />
        <Projects onProjectClick={handleOpenModal} />
        <Brands />
        <FunFacts />
        <Skills />
      </main>
      <Footer />
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
      <AIAdvisor />
    </div>
  );
};

export default PortfolioClient;
