# huecki content research system

Goal: publish one unusual, useful AI-life/dev post every 3rd day.

Positioning: **clever AI field notes for developers and normal people who want leverage, not hype.**

## Daily scan

Run once per day and save to `content-research/YYYY-MM-DD.md`.

Sources to rotate:
- Hacker News / HN Algolia: AI workflows, agents, dev tools, productivity
- Reddit: r/LocalLLaMA, r/ClaudeAI, r/ChatGPT, r/productivity, r/learnprogramming
- GitHub Trending: AI tools, CLIs, agents, automation
- Product Hunt / Indie Hackers: practical new tools
- Weird personal experiments: sleep, calendar, memory, decisions, emails, code review

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
```

## Scoring

- +2 unusual
- +2 practical today
- +1 useful for developers
- +1 useful for normal people
- +1 has a visual workflow
- -2 generic AI hype
- -2 needs too much explanation

## Publishing rule

Every 3rd day:
1. Pick the highest-scoring idea with a practical workflow.
2. Turn it into a 500-800 word visual post.
3. Use components: `FlowGraphic`, `KeyPoints`, `CompareGrid`, `DoDont`, `MetricStrip`.
4. Include one prompt or tiny workflow people can steal.
5. Add sources.
