"use client";

import Image from 'next/image';
import { gsap } from 'gsap';
import { getProjects, type Project } from '@/lib/projects-data';
import { getImageById } from '@/lib/placeholder-images';
import { useLanguage } from '@/hooks/use-language';
import { ArrowUpRight, Github, Play, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onClick: (id: string) => void;
}

const ProjectCard = ({ project, isActive, onClick }: ProjectCardProps) => {
  const image = getImageById(project.imagePlaceholderId);
  
  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-md border border-border/50 bg-card cursor-pointer transition-all duration-500 ease-in-out h-[300px] md:h-[450px] w-full",
        isActive ? "scale-100 opacity-100 z-10 shadow-2xl border-primary/50" : "scale-90 opacity-60 z-0 hover:opacity-80"
      )}
      onClick={() => onClick(project.id)}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {image && (
          <Image
            src={image.imageUrl}
            alt={project.title}
            fill
            className={cn(
                "object-cover transition-transform duration-700 ease-in-out",
                 isActive ? "scale-105" : "scale-100"
            )}
            priority={isActive}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className={cn(
          "absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
        <div className="transform transition-transform duration-300">
          <div className="flex items-center gap-2 text-green-400 font-bold mb-2 text-sm">
             <span>98% Match</span>
             <span className="text-gray-400 font-normal">2024</span>
             <span className="border border-gray-600 rounded px-1 text-[10px] text-gray-400 font-normal">HD</span>
           </div>

          <h3 className="font-bold text-white leading-tight mb-2 text-2xl md:text-4xl">
            {project.title}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.slice(0, 5).map((tech, i) => (
              <span key={i} className="text-xs text-gray-300 flex items-center">
                {i > 0 && <span className="mx-1.5 text-gray-600">•</span>}
                {tech}
              </span>
            ))}
          </div>

          <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-2 max-w-xl">
             {project.description}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-2">
             {(project.url) && (
               <a 
                 href={project.url} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()}
                 className="flex items-center gap-2 bg-white text-black hover:bg-white/90 px-4 py-2 rounded-md font-semibold text-sm transition-colors"
               >
                 <Play className="w-4 h-4 fill-black" />
                 <span>Visit</span>
               </a>
             )}
             {project.githubUrl && (
               <a 
                 href={project.githubUrl} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 onClick={(e) => e.stopPropagation()}
                 className="flex items-center gap-2 bg-gray-600/80 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors backdrop-blur-sm"
               >
                 <Github className="w-4 h-4" />
                 <span>GitHub</span>
               </a>
             )}
             <button className="ml-auto rounded-full border-2 border-gray-500 p-2 hover:border-white text-gray-300 hover:text-white transition-all">
                <Info className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  onProjectClick: (id: string) => void;
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
  const { language, t } = useLanguage();
  const projectData = getProjects(language);
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section id="projects" className="py-20 md:py-32 px-0 md:px-0 lg:px-0 bg-background overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between mb-8 px-4 md:px-0">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Open Source Spass Projekte</h2>
        </div>

        <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {projectData.map((project, index) => (
                <CarouselItem key={project.id} className="pl-4 md:pl-8 basis-[85%] md:basis-[60%] lg:basis-[50%]">
                  <ProjectCard
                    project={project}
                    isActive={index === current}
                    onClick={onProjectClick}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
