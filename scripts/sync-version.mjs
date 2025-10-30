#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve } from 'path';

function read(path) { return readFileSync(resolve(path), 'utf8'); }
function write(path, content) {
  const dir = resolve(path).replace(/\\/g, '/').split('/').slice(0, -1).join('/');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(path), content, 'utf8');
}

function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function replaceLine(md, re, replacement) {
  const lines = md.split(/\r?\n/);
  let changed = false;
  const out = lines.map((line) => {
    if (re.test(line)) { changed = true; return replacement; }
    return line;
  }).join('\n');
  return { out, changed };
}

const version = read('VERSION').trim();
const date = todayISO();

// Update root README badges and footer metadata
let readme = read('README.md');
({ out: readme } = replaceLine(
  readme,
  /\[!\[Version\]\([^)]*\)\]\([^)]*\)/,
  `[![Version](https://img.shields.io/badge/version-${version}-green.svg)](./CHANGELOG.md)`
));
({ out: readme } = replaceLine(
  readme,
  /\[!\[License.*\]\([^)]*\)\]\([^)]*\)/,
  `[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)`
));
({ out: readme } = replaceLine(
  readme,
  /^\*\*Last Updated\*\*:.*/,
  `**Last Updated**: ${date}  `
));
({ out: readme } = replaceLine(
  readme,
  /^\*\*Version\*\*:.*/,
  `**Version**: ${version}  `
));
write('README.md', readme);

// Update key docs headers
const docs = [
  'docs/api-documentation.md',
  'docs/system-architecture.md',
  'docs/system-design.md',
  'docs/tech-stack.md',
];

for (const docPath of docs) {
  if (!existsSync(docPath)) continue;
  let doc = read(docPath);
  ({ out: doc } = replaceLine(doc, /^\*\*Version\*\*:.*/, `**Version:** ${version}  `));
  ({ out: doc } = replaceLine(doc, /^\*\*Last Updated\*\*:.*/, `**Last Updated:** ${date}  `));
  write(docPath, doc);
}

console.log(`Synced version=${version}, date=${date} to README and key docs.`);


