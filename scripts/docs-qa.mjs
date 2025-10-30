#!/usr/bin/env node
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { resolve, join } from 'path';

const DOCS_DIR = resolve('docs');
const SKIP_DIR = resolve('docs/archived');
const VERSION = readFileSync(resolve('VERSION'), 'utf8').trim();

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (full.startsWith(SKIP_DIR)) continue;
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

function updateVersionLines(md, version, date) {
  const lines = md.split(/\r?\n/);
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\*\*Version:?\*\*/.test(lines[i])) {
      lines[i] = `**Version:** ${version}  `;
      changed = true;
    }
    if (/^\*\*Last Updated:?\*\*/.test(lines[i])) {
      lines[i] = `**Last Updated:** ${date}  `;
      changed = true;
    }
  }
  return { content: lines.join('\n'), changed };
}

function updateApiPaths(md) {
  let content = md;
  // Replace common endpoint examples if missing /v1
  const pairs = [
    ['/api/gems', '/api/v1/gems'],
    ['/api/krawls', '/api/v1/krawls'],
    ['/api/users', '/api/v1/users'],
    ['/api/auth', '/api/v1/auth'],
    ['/api/storage', '/api/v1/storage'],
  ];
  for (const [from, to] of pairs) {
    // Avoid double-replacing already-correct paths
    const safeFrom = new RegExp(`(?!${to.replace(/[/.]/g, r => `\\${r}`)})${from.replace(/[/.]/g, r => `\\${r}`)}`, 'g');
    content = content.replace(safeFrom, to);
  }
  return content;
}

const date = todayISO();
const files = walk(DOCS_DIR);
let updated = 0;

for (const file of files) {
  let text = readFileSync(file, 'utf8');

  const before = text;
  // Version/Date sync where present
  const v = updateVersionLines(text, VERSION, date);
  text = v.content;

  // Endpoint path normalization in docs
  text = updateApiPaths(text);

  if (text !== before) {
    writeFileSync(file, text, 'utf8');
    updated++;
  }
}

console.log(`Docs QA: scanned ${files.length} files, updated ${updated}.`);


