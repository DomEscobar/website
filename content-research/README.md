# huecki content research system

Goal: turn fast-moving AI/arXiv/tooling signals into **clever AI field notes for developers and normal people who want leverage, not hype**.

The system has two layers:

1. **Private radar** — daily scanning and scoring.
2. **Public publishing** — fewer, sharper posts with workflows, visuals, sources, and manual approval.

## Quick commands

```bash
npm run radar:ai
```

Creates:

```txt
content-research/radar/YYYY-MM-DD.md
```

## Operating docs

- Main playbook: `content-research/playbooks/AI_RADAR_SYSTEM.md`
- Source config: `content-research/radar/sources.json`
- Daily radar template: `content-research/templates/radar-daily.md`
- Deep research artifact: `content-research/archive/deepresearch/arxiv-ai-monitoring-2026-05-19/report.md`

## Cadence

### Daily private scan

Run once per day. Save output to `content-research/radar/YYYY-MM-DD.md`.

Core sources:

- arXiv RSS/API: `cs.AI`, `cs.CL`, `cs.LG`, `cs.SE`, `cs.CR`, `cs.HC`
- Hugging Face Papers
- GitHub / Papers with Code / Semantic Scholar enrichment where useful
- Hacker News / Reddit / Product Hunt / Indie Hackers for practical signal
- Curator references: AlphaSignal, TLDR AI, Latent Space/AINews, The Batch, Import AI, Ahead of AI, Ben's Bites

### Public publishing rhythm

- **2 short posts/week**: 500-900 word visual field notes.
- **1 optional weekly radar**: max 5 items, only if there are strong signals.
- **1 monthly synthesis**: when a pattern appears across multiple papers/tools.

Do **not** publish daily just because the radar runs daily. Daily public AI news gets generic quickly.

## Capture format

For every promising idea:

```txt
Idea:
Source:
Why unusual:
Who it helps:
Workflow:
Prompt/tool:
Risk / when not to use:
Score:
Could become post: yes/no
Post format: Paper to workflow / Failure-mode field note / Weekly radar / Deep synthesis
```

## Scoring

- +2 practical workflow today
- +2 unusual / not already everywhere
- +2 relevant to agents, dev workflows, personal automation, or small teams
- +1 has code/demo/repo
- +1 has visual workflow potential
- +1 has safety/failure-mode angle
- +1 useful to normal people too
- -2 pure benchmark/SOTA with no practical consequence
- -2 generic AI hype
- -2 too academic/no implementation handle
- -3 extraordinary claims without source/code

Thresholds:

- **7+ and stealable workflow** → draft candidate
- **5-6** → maybe weekly radar item
- **<5** → archive only
- **same pattern across 3+ sources** → monthly deep synthesis candidate

## Post formats

### Paper to workflow

- short answer
- what changed
- visual workflow
- prompt/checklist to steal
- where it fails
- sources

### Failure-mode field note

- what looks useful
- what breaks in production
- safe version
- do/don't list
- tiny test/checklist
- sources

### Weekly radar

Max 5 items. Each item:

```txt
signal → why it matters → what to try
```

### Monthly synthesis

- pattern across papers/tools
- why now
- practical stack/workflow
- what small teams should change
- watchlist

## Publishing rule

Public publishing requires manual approval.

Before considering a post published:

1. Pick the highest-scoring idea with a practical workflow.
2. Turn it into a 500-900 word visual post.
3. Use components: `FlowGraphic`, `KeyPoints`, `CompareGrid`, `DoDont`, `MetricStrip`.
4. Include one prompt or tiny workflow people can steal.
5. Add sources.
6. Run SEO publish check:
   - post is non-draft and appears in the generated sitemap
   - title, description, canonical URL, hreflang alternates, robots, OG/Twitter tags are correct
   - BlogPosting JSON-LD, breadcrumbs, tags/keywords, dates, language, and FAQ schema are aligned
   - RSS/llms outputs still build cleanly
   - `npm run build` passes and generated HTML/sitemap are spot-checked

## Quality bar

Huecki should add taste, not volume:

- no raw abstract rewrites
- no “top 10 AI papers” slop
- no “this changes everything” hype
- every post needs a concrete workflow, prompt, checklist, caveat, or implementation take
