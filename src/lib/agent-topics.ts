import type { CollectionEntry } from 'astro:content';
import { absoluteUrl, localizedPath, type Locale } from '@/lib/site';

export type AgentTopic = {
  id: string;
  labels: Record<Locale, string>;
  descriptions: Record<Locale, string>;
  keywords: string[];
  startHere?: string;
};

export const agentTopics = [
  {
    id: 'agent-harnesses',
    labels: {
      de: 'Agent Harnesses',
      en: 'Agent Harnesses',
    },
    descriptions: {
      de: 'Kontrollschicht rund um Agenten: Phasen, erlaubte Aktionen, Evidenz, Exit-Bedingungen und Review-Regeln.',
      en: 'Control layer around agents: phases, allowed actions, evidence, exit conditions, and review rules.',
    },
    keywords: ['agent harness', 'harness', 'runtime contract', 'state machine', 'exit condition', 'evidence gate', 'agents.md'],
    startHere: 'natural-language-agent-harnesses',
  },
  {
    id: 'agent-security',
    labels: {
      de: 'Agent Security',
      en: 'Agent Security',
    },
    descriptions: {
      de: 'Sichere Agenten-Runtimes, Tool-Gates, Prompt-Injection-Kontrollen und auditierbare Berechtigungen.',
      en: 'Secure agent runtimes, tool gates, prompt-injection controls, and auditable permissions.',
    },
    keywords: ['security', 'sicherheit', 'risk', 'runtime audit', 'permission', 'tool gate', 'prompt injection', 'evidence before clicking'],
    startHere: 'local-llm-agent-runtime-audit',
  },
  {
    id: 'context-engineering',
    labels: {
      de: 'Context Engineering',
      en: 'Context Engineering',
    },
    descriptions: {
      de: 'Kontext, Quellen, Schemas, Skills und Aufgabenzerlegung statt nur laengere Prompts.',
      en: 'Context, sources, schemas, skills, and task decomposition instead of longer prompts.',
    },
    keywords: ['context', 'prompt', 'decomposition', 'skill', 'skills', 'workflow', 'task contract', 'spec-driven'],
    startHere: 'prompting-2026-context-engineering-en',
  },
  {
    id: 'agent-evals',
    labels: {
      de: 'Agent Evals',
      en: 'Agent Evals',
    },
    descriptions: {
      de: 'Messbare Agentenqualitaet: Benchmarks, Review-Schleifen, Playtests, Regressionen und Proof Gates.',
      en: 'Measurable agent quality: benchmarks, review loops, playtests, regressions, and proof gates.',
    },
    keywords: ['eval', 'benchmark', 'qa', 'test', 'playtester', 'review', 'self-check', 'measure'],
    startHere: 'agent-memory-tests-measure-wrong-thing',
  },
  {
    id: 'llm-native-engineering',
    labels: {
      de: 'LLM-native Engineering',
      en: 'LLM-native Engineering',
    },
    descriptions: {
      de: 'Produktionsreife LLM-Entwicklung mit Evals, Observability, UX-Vertrauen, Kosten und Ownership.',
      en: 'Production-grade LLM development with evals, observability, UX trust, cost, and ownership.',
    },
    keywords: ['llm-native', 'ai-native', 'ai first', 'production ai', 'observability', 'ops', 'architecture'],
    startHere: 'llm-native-developer-operational-maturity',
  },
  {
    id: 'buildprints',
    labels: {
      de: 'Buildprints',
      en: 'Buildprints',
    },
    descriptions: {
      de: 'Agentenlesbare Implementierungsvertraege mit Phasen, Prompts, Evidenzschemas und Validierungschecks.',
      en: 'Agent-readable implementation contracts with phases, prompts, evidence schemas, and validation checks.',
    },
    keywords: ['buildprint', 'manifest', 'implementation contract', 'phase-flow', 'proof gate'],
    startHere: 'superpowers-skill-methodology-harness',
  },
] satisfies AgentTopic[];

type BlogEntry = CollectionEntry<'blog'>;
type ToolEntry = CollectionEntry<'tools'>;
export type AgentReadableEntry = BlogEntry | ToolEntry;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const fallbackTopicId = (topic: string) =>
  normalize(topic)
    .replace(/\s+/g, '-')
    .replace(/^-|-$/g, '') || 'uncategorized';

const entryHaystack = (entry: AgentReadableEntry) =>
  normalize([
    entry.data.title,
    entry.data.description,
    entry.data.summary,
    'topic' in entry.data ? entry.data.topic : entry.data.category,
    ...entry.data.tags,
    ...(entry.data.concepts ?? []),
    entry.data.slug,
  ].join(' '));

export const getEntryTopicIds = (entry: AgentReadableEntry) => {
  const explicit = entry.data.concepts
    ?.map((concept) => {
      const normalized = normalize(concept);
      return agentTopics.find((topic) => normalize(topic.labels.en) === normalized || normalize(topic.labels.de) === normalized || topic.id === normalized.replace(/\s+/g, '-'))?.id;
    })
    .filter(Boolean) as string[] | undefined;

  const matched = agentTopics
    .filter((topic) => {
      const text = entryHaystack(entry);
      return topic.keywords.some((keyword) => text.includes(normalize(keyword)));
    })
    .map((topic) => topic.id);

  const ids = [...new Set([...(explicit ?? []), ...matched])];
  if (ids.length) return ids;
  if ('topic' in entry.data) return [fallbackTopicId(entry.data.topic)];
  return [fallbackTopicId(entry.data.category)];
};

export const getTopic = (id: string) => agentTopics.find((topic) => topic.id === id);

export const topicPath = (locale: Locale, topicId: string) => localizedPath(locale, `/topics/${topicId}/`);

export const topicUrl = (locale: Locale, topicId: string) => absoluteUrl(topicPath(locale, topicId));

export const markdownEscape = (value: string) =>
  value.replace(/\s+/g, ' ').replace(/\[/g, '(').replace(/\]/g, ')').trim();
