"use client";

import { useLanguage } from '@/hooks/use-language';

const SkillPill = ({ children }: { children: React.ReactNode }) => (
  <span className="skill-pill bg-card border border-border text-foreground/80 text-sm font-medium px-4 py-2 rounded-full transition-colors hover:bg-primary hover:border-primary-foreground/20">
    {children}
  </span>
);

const Skills = () => {
  const { t } = useLanguage();
  
  const topSkills: string[] = t('skills.top_skills', { returnObjects: true });
  const additionalSkills: string[] = t('skills.additional_skills', { returnObjects: true });
  const industries: string[] = t('skills.industries', { returnObjects: true });

  return (
    <section id="skills" className="py-20 md:py-32 px-6 md:p-12 lg:p-24">
      <div className="max-w-7xl mx-auto">
        <h3 className="uppercase text-muted font-medium tracking-widest mb-16 text-center g-fade-up">{t('skills.title_top')}</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {topSkills.map(skill => <SkillPill key={skill}>{skill}</SkillPill>)}
        </div>
        
        <h3 className="uppercase text-muted font-medium tracking-widest mt-24 mb-16 text-center g-fade-up">{t('skills.title_additional')}</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {additionalSkills.map(skill => <SkillPill key={skill}>{skill}</SkillPill>)}
        </div>

        <h3 className="uppercase text-muted font-medium tracking-widest mt-24 mb-16 text-center g-fade-up">{t('skills.title_industries')}</h3>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {industries.map(industry => <SkillPill key={industry}>{industry}</SkillPill>)}
        </div>
      </div>
    </section>
  );
};

export default Skills;
