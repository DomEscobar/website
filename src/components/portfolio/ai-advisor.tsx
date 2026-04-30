"use client";

import { useState } from "react";
import { Bot, Loader2 } from "lucide-react";
import { suggestPortfolioImprovements, SuggestPortfolioImprovementsOutput } from "@/ai/flows/ai-portfolio-improvement";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { ScrollArea } from "../ui/scroll-area";

export function AIAdvisor() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<SuggestPortfolioImprovementsOutput | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAnalysis = () => {
    setIsOpen(true);
    if (result) return; // Don't re-fetch if we have results

    const analyzePortfolio = async () => {
      setIsPending(true);
      try {
        const portfolioContent = `
          Hücki - Senior Software Developer | Architect | AI.
          About: 15 years of experience, 100% response rate, <1h response time. Experienced software architect and developer with a passion for elegant, efficient, and scalable solutions. 'AI first' approach.
          Projects: AI Analytics Platform, Luxury E-Commerce UX, High-Performance API-Gateway, Automated CI/CD Pipeline.
          Skills: AI Software Architecture, Cloud Native, System Design, Go, TypeScript, React, Kubernetes.
        `;
        const userEngagementMetrics = "Bounce Rate: 65%, Average Time on Page: 45s, Project Clicks: 15%, Contact Link Clicks: 5%";
        const designTrends = "Minimalism, dark mode, large typography, interactive micro-animations, bento grids, glassmorphism.";

        const response = await suggestPortfolioImprovements({
          portfolioContent,
          userEngagementMetrics,
          designTrends,
        });
        setResult(response);
      } catch (error) {
        console.error("AI analysis failed:", error);
        toast({
          variant: "destructive",
          title: t('ai_advisor.error_title'),
          description: t('ai_advisor.error_description'),
        });
        setIsOpen(false);
      } finally {
        setIsPending(false);
      }
    };

    void analyzePortfolio();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
          onClick={handleAnalysis}
          aria-label={t('ai_advisor.button_label')}
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('ai_advisor.dialog_title')}</DialogTitle>
            <DialogDescription>
              {t('ai_advisor.dialog_description')}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] p-1">
            {isPending ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-12 h-12 animate-spin text-muted-foreground" />
              </div>
            ) : (
              result && (
                <div className="space-y-6 pr-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{t('ai_advisor.suggestions_title')}</h3>
                    <div className="prose prose-invert text-muted-foreground whitespace-pre-wrap">{result.suggestedImprovements}</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{t('ai_advisor.rationale_title')}</h3>
                    <div className="prose prose-invert text-muted-foreground whitespace-pre-wrap">{result.rationale}</div>
                  </div>
                </div>
              )
            )}
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>{t('ai_advisor.close_button')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
