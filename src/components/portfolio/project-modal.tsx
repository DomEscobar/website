"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { X } from 'lucide-react';
import { type Project } from '@/lib/projects-data';
import { getImageById } from '@/lib/placeholder-images';
import { useLanguage } from '@/hooks/use-language';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const proofAnimationRef = useRef<gsap.Context | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const modal = modalRef.current;
    const content = contentContainerRef.current;

    if (isOpen && project && modal && content) {
      const innerContent = content.querySelector('#modal-inner-content');
      if (!innerContent) return;

      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.set(modal, { visibility: 'visible' })
        .to(modal, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
        .fromTo(
          innerContent,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.2'
        );
    } else if (!isOpen && modal) {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(modal, { visibility: 'hidden' });
          document.body.style.overflow = 'auto';
          if (proofAnimationRef.current) {
            proofAnimationRef.current.revert();
            proofAnimationRef.current = null;
          }
        },
      });
      const innerContent = content?.querySelector('#modal-inner-content');
      if (innerContent) {
        tl.to(innerContent, {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: 'power3.in',
        });
      }
      tl.to(modal, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.2');
    }
  }, [isOpen, project]);

  if (!project) return null;

  const detailImage = project.detailImagePlaceholderId ? getImageById(project.detailImagePlaceholderId) : undefined;
  const ProofComponent = project.proof?.component;

  return (
    <div
      ref={modalRef}
      id="project-modal"
      className="fixed inset-0 bg-background z-[100] overflow-y-auto invisible opacity-0"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`.project-modal::-webkit-scrollbar { display: none; }`}</style>
      <button
        id="modal-close-btn"
        onClick={onClose}
        className="fixed top-8 right-8 w-10 h-10 cursor-pointer z-[110] text-foreground hover:text-accent transition-colors"
        aria-label={t('project_modal.close_button_label')}
      >
        <X className="w-full h-full" />
      </button>

      <div ref={contentContainerRef} className="w-full h-full">
        {isOpen && (
          <div id="modal-inner-content" className="p-6 md:p-12 lg:p-24 max-w-7xl mx-auto">
            <div className="h-16 md:h-24"></div>
            <p className="text-muted-foreground uppercase tracking-widest font-medium">{project.subtitle}</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter my-4">{project.title}</h1>
            <div className="my-12 aspect-[16/9] overflow-hidden rounded-md relative">
              {detailImage && (
                <Image
                  src={detailImage.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={detailImage.imageHint}
                />
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 text-lg font-light text-foreground/80 leading-relaxed space-y-4">
                <p>{project.description}</p>
              </div>
              <div className="lg:col-span-1">
                <h4 className="text-muted-foreground uppercase tracking-widest font-medium mb-4">{t('project_modal.tech_stack')}</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="bg-card text-foreground/80 text-sm font-medium px-3 py-1 rounded-full border border-border">
                      {t}
                    </span>
                  ))}
                </div>
                <h4 className="text-muted-foreground uppercase tracking-widest font-medium mt-8 mb-4">{t('project_modal.proof_of_work')}</h4>
                <div className="bg-black/20 aspect-[4/2] rounded-lg overflow-hidden border border-border">
                  {ProofComponent && <ProofComponent />}
                </div>
              </div>
            </div>
            <div className="h-24"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
