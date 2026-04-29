import AiNetworkProof from '@/components/portfolio/proofs/ai-network-proof';
import EcommerceProof from '@/components/portfolio/proofs/ecommerce-proof';
import ApiGatewayProof from '@/components/portfolio/proofs/api-gateway-proof';
import CicdProof from '@/components/portfolio/proofs/cicd-proof';
import type { ComponentType } from 'react';
import { translations } from '@/locales/translations';
import type { Language } from '@/hooks/use-language';
import { Github } from 'lucide-react';

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  imagePlaceholderId: string;
  detailImagePlaceholderId?: string;
  description?: string;
  tech: string[];
  proof?: {
    component: ComponentType;
  };
  url?: string;
  githubUrl?: string;
};

const baseProjectData: Omit<Project, 'title' | 'subtitle' | 'description'>[] = [
  {
      id: 'derplanner-ai',
      imagePlaceholderId: 'project-derplanner-ai',
      detailImagePlaceholderId: 'project-derplanner-ai-detail',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Genkit AI', 'Firebase'],
      proof: { component: AiNetworkProof },
      url: 'https://derplanner.space/',
      githubUrl: 'https://github.com/DomEscobar/DerPlanner'
  },
  {
      id: '1000-prototypes',
      imagePlaceholderId: 'project-1000-prototypes',
      detailImagePlaceholderId: 'project-1000-prototypes-detail',
      tech: ['Next.js', 'Genkit AI', 'Firebase', 'Vercel'],
      proof: { component: AiNetworkProof },
      url: 'https://1000prototypes.space/',
      githubUrl: 'https://github.com/DomEscobar/1000prototypes'
  },
  {
    id: 'pdf-editor',
    imagePlaceholderId: 'project-pdf-editor',
    detailImagePlaceholderId: 'project-pdf-editor-detail',
    tech: ['React', 'TypeScript', 'PDF-lib', 'Tailwind CSS'],
    proof: { component: EcommerceProof },
    url: 'https://annotate-draw-sign.lovable.app/',
    githubUrl: 'https://github.com/DomEscobar/PDF_Simple'
  },
  {
    id: 'crm-board',
    imagePlaceholderId: 'project-crm-board',
    detailImagePlaceholderId: 'project-crm-board-detail',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'dnd-kit'],
    proof: { component: EcommerceProof },
    url: 'https://canvas-flow-insights.lovable.app/',
    githubUrl: 'https://github.com/DomEscobar/CRM_Canva_Board'
  },
  {
    id: 'more-on-github',
    imagePlaceholderId: 'project-github-more',
    tech: ['Various Technologies'],
    url: 'https://github.com/DomEscobar',
  },
];

export const getProjects = (lang: Language): Project[] => {
  return baseProjectData.map(p => {
    const t = translations[lang].projects.project_items[p.id as keyof typeof translations[typeof lang]['projects']['project_items']];
    return {
      ...p,
      title: t.title,
      subtitle: t.subtitle,
      description: t.description,
    };
  });
};
