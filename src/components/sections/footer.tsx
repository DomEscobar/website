"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';

const LinkAccent = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
              className="relative inline-block text-foreground transition-colors duration-300 ease-in-out hover:text-accent g-social-icon after:content-[''] after:absolute after:w-full after:h-px after:bottom-[-3px] after:left-0 after:bg-muted-foreground after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100"
  >
    {children}
  </a>
);

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'de' ? 'en' : 'de');
  };

  return (
    <footer id="contact" className="py-12 px-6 md:p-12 text-center text-muted-foreground">
      <div className="flex justify-center gap-8 mb-8">
        <LinkAccent href="https://www.linkedin.com/in/dominic-h%C3%BCckmann-2b9499173">LinkedIn</LinkAccent>
        <LinkAccent href="https://github.com/DomEscobar">GitHub</LinkAccent>
        <LinkAccent href="mailto:d.hueckmann@googlemail.com">{t('footer.contact')}</LinkAccent>
      </div>
      <div className="mb-8">
        <Button variant="outline" onClick={toggleLanguage} className="uppercase">
          {language === 'de' ? 'EN' : 'DE'}
        </Button>
      </div>
      <p className="text-sm g-copyright">&copy; {year} {t('footer.copyright')}</p>
    </footer>
  );
};

export default Footer;
