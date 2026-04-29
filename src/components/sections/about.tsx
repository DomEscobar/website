"use client";

import AiSpiral from "@/components/portfolio/ai-spiral";
import { useLanguage } from "@/hooks/use-language";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 px-6 md:p-12 lg:p-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
        <div className="lg:col-span-1">
          <h3 className="uppercase text-muted font-medium tracking-widest mb-8 g-fade-up">{t('about.title')}</h3>
          <div className="flex flex-col space-y-6">
            <div className="g-stagger-up">
              <p className="text-2xl font-semibold">
                <span className="stat-value" data-value="10">10</span>+
              </p>
              <p className="text-muted-foreground">{t('about.stat1')}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="g-stagger-up text-lg md:text-xl font-light text-foreground/80 space-y-6 leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <div className="pt-8 g-stagger-up">
              <p className="text-2xl md:text-3xl font-semibold mb-4 text-foreground g-ai-title">
                {t('about.ai_title')}
              </p>
              <div className="flex items-center gap-4">
                <AiSpiral />
                <p className="font-light text-foreground/70 flex-1 g-ai-text">
                  {t('about.ai_text')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
