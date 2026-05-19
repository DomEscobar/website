#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, 'content-research/radar/sources.json');
const outDir = path.join(root, 'content-research/radar');
const today = new Date().toISOString().slice(0, 10);
const outPath = path.join(outDir, `${today}.md`);

const config = JSON.parse(await fs.readFile(configPath, 'utf8'));

function decodeXml(value = '') {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&apos;', "'")
    .trim();
}

function stripTags(value = '') {
  return decodeXml(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
}

function scoreItem(item) {
  const text = `${item.title} ${item.summary}`.toLowerCase();
  const matched = config.watchKeywords.filter((keyword) => text.includes(keyword.toLowerCase()));
  const blocked = config.blocklistKeywords.filter((keyword) => text.includes(keyword.toLowerCase()));

  let score = 0;
  if (matched.length) score += Math.min(4, matched.length);
  if (/agent|workflow|automation|tool use|coding|browser|rag|retrieval|memory|security|prompt injection/.test(text)) score += 2;
  if (/github|code|benchmark|evaluation|dataset|open-source|open source/.test(text)) score += 1;
  if (/human|user|developer|software|web|interface|productivity/.test(text)) score += 1;
  if (/risk|security|attack|failure|vulnerab|safety|privacy/.test(text)) score += 1;
  if (blocked.length) score -= Math.min(4, blocked.length * 2);
  if (/survey|comprehensive review|benchmarking/.test(text)) score -= 1;

  return { score, matched, blocked };
}

async function fetchArxivRss(category) {
  const url = `https://rss.arxiv.org/rss/${category}`;
  const res = await fetch(url, { headers: { 'user-agent': 'huecki-ai-radar/1.0' } });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 25).map((match) => {
    const block = match[1];
    const get = (tag) => (block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`)) || [])[1] || '';
    const title = stripTags(get('title'));
    const link = decodeXml(stripTags(get('link')));
    const description = stripTags(get('description'));
    const pubDate = stripTags(get('pubDate'));
    return { source: `arXiv ${category}`, category, title, url: link, summary: description, pubDate };
  });
  return items;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const errors = [];
  const all = [];

  for (const category of config.arxivCategories) {
    try {
      const items = await fetchArxivRss(category);
      all.push(...items);
    } catch (error) {
      errors.push(`${category}: ${error.message}`);
    }
  }

  const seen = new Set();
  const ranked = all
    .filter((item) => {
      const key = item.url || item.title;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((item) => ({ ...item, ...scoreItem(item) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  const strong = ranked.filter((item) => item.score >= 5).slice(0, 5);
  const maybe = ranked.filter((item) => item.score >= 3 && item.score < 5).slice(0, 5);

  const lines = [];
  lines.push(`# Huecki AI radar — ${today}`);
  lines.push('');
  lines.push('Private scan. Not a public post. Generated from arXiv RSS + Huecki scoring.');
  lines.push('');
  lines.push('## Publishing decision');
  lines.push('');
  lines.push(strong.length ? '- At least one candidate deserves human review.' : '- No obvious publish candidate yet; use this as archive signal.');
  lines.push('- Public cadence target: 2 field notes/week + optional weekly radar + monthly synthesis.');
  lines.push('');

  lines.push('## Top candidates');
  lines.push('');
  for (const [index, item] of strong.entries()) {
    lines.push(`### ${index + 1}. ${item.title}`);
    lines.push('');
    lines.push(`Source: ${item.source}`);
    lines.push(`URL: ${item.url}`);
    lines.push(`Score: ${item.score}`);
    lines.push(`Matched signals: ${item.matched.join(', ') || 'none'}`);
    if (item.blocked.length) lines.push(`Caution signals: ${item.blocked.join(', ')}`);
    lines.push('Why unusual: TODO — read paper/abstract and identify the non-obvious angle.');
    lines.push('Who it helps: TODO');
    lines.push('Workflow: TODO');
    lines.push('Prompt/tool: TODO');
    lines.push('Risk / when not to use: TODO');
    lines.push(`Could become post: ${item.score >= 7 ? 'yes, if workflow is concrete' : 'maybe, likely weekly radar item'}`);
    lines.push('');
    lines.push('Abstract excerpt:');
    lines.push(`> ${item.summary.slice(0, 700)}${item.summary.length > 700 ? '…' : ''}`);
    lines.push('');
  }

  lines.push('## Maybe / weekly radar items');
  lines.push('');
  for (const item of maybe) {
    lines.push(`- **${item.title}** (${item.source}, score ${item.score}) — ${item.url}`);
  }
  if (!maybe.length) lines.push('- None.');
  lines.push('');

  lines.push('## Pattern watch');
  lines.push('');
  const patternCounts = new Map();
  for (const item of ranked) for (const keyword of item.matched) patternCounts.set(keyword, (patternCounts.get(keyword) || 0) + 1);
  const patterns = [...patternCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  for (const [keyword, count] of patterns) lines.push(`- ${keyword}: ${count} matched items`);
  if (!patterns.length) lines.push('- No repeated pattern detected.');
  lines.push('');

  lines.push('## Errors / missing sources');
  lines.push('');
  if (errors.length) for (const error of errors) lines.push(`- ${error}`);
  else lines.push('- None.');
  lines.push('');

  lines.push('## Next action');
  lines.push('');
  lines.push('- [ ] Read the top 1-2 candidates manually.');
  lines.push('- [ ] Promote one to a visual field-note draft only if it has a stealable workflow.');
  lines.push('- [ ] Save weak items for weekly radar or discard.');
  lines.push('');

  await fs.writeFile(outPath, lines.join('\n'));
  console.log(`wrote ${outPath}`);
  console.log(`fetched ${all.length} items, ranked ${ranked.length}, strong ${strong.length}, errors ${errors.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
