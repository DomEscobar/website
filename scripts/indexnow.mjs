#!/usr/bin/env node
/**
 * Huecki IndexNow submission.
 *
 * Usage:
 *   node scripts/indexnow.mjs [--dry-run] [--auto] [<url-or-path> ...]
 *
 * Modes:
 *   explicit: pass URLs or paths (defaultPaths used when none provided)
 *   --auto:   auto-detect changed URLs from `git diff` against origin/main
 *             (added/moved/renamed/copied), then merge with defaultPaths
 *
 * Env:
 *   SITE_URL         default: https://huecki.com
 *   INDEXNOW_KEY     default: hardcoded public key
 *   INDEXNOW_ENDPOINT default: https://api.indexnow.org/indexnow
 *   GIT_BASE         default: origin/main
 *
 * Notes:
 *   The key file MUST be served at ${SITE_URL}/${INDEXNOW_KEY}.txt so
 *   IndexNow can verify ownership. Huecki serves it from public/.
 */

import { execSync } from 'node:child_process';

const siteUrl = (process.env.SITE_URL || 'https://huecki.com').replace(/\/+$/, '');
const key = process.env.INDEXNOW_KEY || '951a9d08f5894db3bce4cde927810171';
const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const gitBase = process.env.GIT_BASE || 'origin/main';

const defaultPaths = [
  '/',
  '/en/',
  '/sitemap-index.xml',
  '/rss.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/knowledge-map.json',
  '/en/topics/',
  '/en/topics/agent-security/',
  '/en/topics/agent-harnesses/',
  '/en/topics/context-engineering/',
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const auto = args.includes('--auto');
const explicit = args.filter((a) => !a.startsWith('--'));

const toAbsoluteUrl = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  return new URL(trimmed, `${siteUrl}/`).toString();
};

const detectChangedUrls = () => {
  let diff;
  try {
    diff = execSync(`git diff --name-status --diff-filter=ACMRT ${gitBase}...HEAD`, { encoding: 'utf8' });
  } catch {
    try {
      diff = execSync(`git diff --name-status --diff-filter=ACMRT ${gitBase}`, { encoding: 'utf8' });
    } catch (err) {
      console.warn(`Could not detect changed URLs via git diff: ${err.message}`);
      return [];
    }
  }
  const paths = [];
  for (const line of diff.split('\n')) {
    if (!line.trim()) continue;
    const parts = line.split(/\s+/);
    const status = parts[0];
    const from = parts[1];
    const to = parts[2] || parts[1];
    if (status.startsWith('R') || status.startsWith('C')) {
      if (from) paths.push(from);
      if (to) paths.push(to);
      continue;
    }
    if (to) paths.push(to);
  }
  return paths.map(toAbsoluteUrl).filter(Boolean);
};

const changedUrls = auto ? detectChangedUrls() : [];
const explicitUrls = explicit.length ? explicit.map(toAbsoluteUrl).filter(Boolean) : defaultPaths.map(toAbsoluteUrl).filter(Boolean);
const urls = [...new Set([...explicitUrls, ...changedUrls])];

if (!urls.length) {
  console.error('No URLs to submit to IndexNow.');
  process.exit(1);
}

const payload = {
  host: new URL(siteUrl).host,
  key,
  keyLocation: `${siteUrl}/${key}.txt`,
  urlList: urls,
};

console.log(`[indexnow] host=${payload.host} urls=${urls.length}${auto ? ` (auto-detected: ${changedUrls.length})` : ''}${dryRun ? ' [DRY-RUN]' : ''}`);

const submit = async () => {
  if (dryRun) {
    for (const u of urls) console.log(`  - ${u}`);
    return;
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  if (!response.ok) {
    console.error(`IndexNow failed: ${response.status} ${response.statusText}`);
    if (text) console.error(text);
    process.exit(1);
  }
  console.log(`IndexNow accepted: ${response.status} ${response.statusText}`);
  if (text) console.log(text);
};

await submit();