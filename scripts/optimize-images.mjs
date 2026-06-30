/**
 * static/img/ 以下の全 webp を長辺 1600px・品質 80 で最適化するスクリプト
 * 使い方: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const IMG_DIR = new URL('../static/img/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const MAX_SIZE = 1600;
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (extname(entry.name).toLowerCase() === '.webp') yield full;
  }
}

async function optimize(filePath) {
  const before = (await stat(filePath)).size;
  // ファイルをバッファとして読み込んでからsharpに渡す（ファイルロック回避）
  const inputBuffer = await readFile(filePath);
  const img = sharp(inputBuffer);
  const meta = await img.metadata();

  const needsResize = (meta.width ?? 0) > MAX_SIZE || (meta.height ?? 0) > MAX_SIZE;

  const buffer = await img
    .resize(needsResize ? { width: MAX_SIZE, height: MAX_SIZE, fit: 'inside', withoutEnlargement: true } : undefined)
    .webp({ quality: QUALITY })
    .toBuffer();

  await writeFile(filePath, buffer);

  const after = (await stat(filePath)).size;
  const saved = ((1 - after / before) * 100).toFixed(1);
  const flag = after < before ? '✓' : '~';
  console.log(`${flag} ${filePath.replace(IMG_DIR, '')}`
    + `  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${saved}%)`);
}

let total = 0;
let count = 0;
const failed = [];

for await (const file of walk(IMG_DIR)) {
  try {
    const before = (await stat(file)).size;
    await optimize(file);
    const after = (await stat(file)).size;
    total += before - after;
    count++;
  } catch (e) {
    console.error(`✗ スキップ: ${file.replace(IMG_DIR, '')} — ${e.message}`);
    failed.push(file.replace(IMG_DIR, ''));
  }
}

console.log(`\n合計 ${count} ファイル処理、${(total / 1024).toFixed(0)}KB 削減`);
if (failed.length) console.log(`\n失敗 (${failed.length}件):\n` + failed.join('\n'));
