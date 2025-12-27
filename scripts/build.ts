import { build } from 'bun';
import { rolldown } from 'rolldown';
import { version } from '../package.json';

console.log(`Building svelte-adapter-bun v${version}...`);

// Use rolldown for adapter and vite plugin (Node.js compatible)
console.time('Build: adapter');
const adapterBundle = await rolldown({
  input: './index.ts',
  external: [/^node:/, /^@sveltejs/, 'rolldown'],
});
await adapterBundle.write({
  dir: 'dist',
  format: 'esm',
});
console.timeEnd('Build: adapter');

console.time('Build: vite plugin');
const viteBundle = await rolldown({
  input: './vite.ts',
  external: [/^node:/, 'vite'],
});
await viteBundle.write({
  dir: 'dist',
  format: 'esm',
});
console.timeEnd('Build: vite plugin');

// Use Bun.build for server files (Bun runtime only)
console.time('Build: server');
await build({
  entrypoints: ['./src/index.ts', './src/handler.ts', './src/env.ts'],
  outdir: 'dist/files',
  target: 'bun',
  minify: false,
  external: ['ENV', 'MANIFEST', 'SERVER', 'HANDLER'],
  format: 'esm',
});
console.timeEnd('Build: server');
