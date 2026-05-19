# Huecki AI Radar System

Purpose: monitor arXiv + emerging AI sources daily, but publish only original, practical Huecki field notes.

Positioning:

> AI field notes for builders and normal people: what changed, what you can steal, and what will probably break.

## Cadence

### Daily private radar

Run once per day:

```bash
npm run radar:ai
```

Output:

```txt
content-research/radar/YYYY-MM-DD.md
```

This is not a public post. It is a private candidate list.

### Public publishing rhythm

- **2 short posts/week**: practical field notes, 500-900 words.
- **1 optional weekly radar**: only if there are at least 3 strong items.
- **1 deeper synthesis/month**: when the same pattern appears across multiple papers/tools.

Avoid daily public posts unless quality remains high. Daily public AI news turns into slop fast.

## Source lanes

### Lane 1 — primary paper feeds

- arXiv RSS/API: `cs.AI`, `cs.CL`, `cs.LG`, `cs.SE`, `cs.CR`, `cs.HC`
- Hugging Face Papers
- Semantic Scholar enrichment
- Papers with Code / GitHub links

### Lane 2 — practical engineering signal

- GitHub trending / repos
- Hacker News
- Reddit: LocalLLaMA, ClaudeAI, ChatGPT, productivity, learnprogramming
- Product Hunt / Indie Hackers

### Lane 3 — meta-curators to learn from

- AlphaSignal: daily short engineer curation
- TLDR AI: daily short format
- Latent Space / AINews: weekday builder roundups
- The Batch: weekly synthesis
- Import AI: opinionated research taste
- Ahead of AI: durable deep explainers

## Scoring

Base score:

- +2 practical workflow today
- +2 unusual / not already everywhere
- +2 relevant to agents, dev workflows, personal automation, or small teams
- +1 has code/demo/repo
- +1 has visual workflow potential
- +1 has safety/failure-mode angle
- +1 useful to normal people too
- -2 pure benchmark/SOTA with no practical consequence
- -2 generic hype topic
- -2 too academic/no implementation handle
- -3 extraordinary claims without source/code

Thresholds:

- **7+ and stealable workflow** → draft candidate
- **5-6** → maybe weekly radar item
- **<5** → archive only
- **same pattern across 3+ sources** → monthly deep synthesis candidate

## Post formats

### Paper to workflow

1. Short answer
2. What changed
3. Workflow diagram
4. Prompt/checklist to steal
5. Where it fails
6. Sources

### Failure-mode field note

1. What looks useful
2. What breaks in production
3. Safe version
4. Do/don't list
5. Tiny test/checklist
6. Sources

### Weekly radar

Max 5 items. Each item:

```txt
signal → why it matters → what to try
```

### Monthly trend synthesis

1. Pattern across papers/tools
2. Why now
3. Practical stack/workflow
4. What small teams should change
5. Watchlist

## Manual approval rule

Radar items may be generated automatically. Public posts still require manual approval before `draft: false` or publish/push.

## Quality bar

Every public post needs:

- a concrete workflow, checklist, prompt, or implementation take
- sources
- a failure mode / caveat
- visual structure using blog components when it becomes an MDX post
- SEO publish check from `content-research/README.md`
