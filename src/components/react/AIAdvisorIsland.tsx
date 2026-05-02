import { useEffect, useRef, useState } from 'react';
import { Bot, Loader2, X } from 'lucide-react';

type Labels = {
  button: string;
  title: string;
  description: string;
  suggestions: string;
  rationale: string;
  close: string;
  loading: string;
  errorTitle: string;
  errorDescription: string;
};

type AdvisorResult = {
  suggestedImprovements: string;
  rationale: string;
};

type Props = {
  labels: Labels;
  locale: 'de' | 'en';
  endpoint: string;
};

export default function AIAdvisorIsland({ labels, locale, endpoint }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  async function handleAnalysis() {
    setIsOpen(true);
    if (result || isPending) return;

    setIsPending(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ locale }),
      });

      if (!response.ok) {
        throw new Error(`Advisor request failed with ${response.status}`);
      }

      setResult((await response.json()) as AdvisorResult);
    } catch (requestError) {
      console.error(requestError);
      setError(labels.errorDescription);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={handleAnalysis}
          aria-label={labels.button}
        >
          <Bot className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-background/90 p-4 backdrop-blur-sm md:p-8">
          <div
            className="mx-auto mt-10 max-w-2xl rounded-md border border-border bg-card shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-advisor-title"
            aria-describedby="ai-advisor-description"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-6">
              <div>
                <h2 id="ai-advisor-title" className="text-xl font-semibold text-foreground">{labels.title}</h2>
                <p id="ai-advisor-description" className="mt-2 text-sm text-muted-foreground">{labels.description}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setIsOpen(false)}
                aria-label={labels.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {isPending && (
                <div className="flex min-h-56 flex-col items-center justify-center gap-3 text-muted-foreground">
                  <Loader2 className="h-10 w-10 animate-spin" aria-hidden="true" />
                  <span>{labels.loading}</span>
                </div>
              )}
              {error && (
                <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4">
                  <h3 className="font-semibold text-foreground">{labels.errorTitle}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{error}</p>
                </div>
              )}
              {result && (
                <div className="space-y-6">
                  <section>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{labels.suggestions}</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{result.suggestedImprovements}</p>
                  </section>
                  <section>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{labels.rationale}</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{result.rationale}</p>
                  </section>
                </div>
              )}
            </div>
            <div className="flex justify-end border-t border-border p-6">
              <button type="button" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={() => setIsOpen(false)}>
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
