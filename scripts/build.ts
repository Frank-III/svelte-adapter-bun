import { build } from 'bun';
import { version } from '../package.json';

console.log(`Building svelte-adapter-bun v${version}...`);

console.time('Build: adapter');
await build({
  entrypoints: ['./index.ts'],
  outdir: 'dist',
  packages: 'external',
  target: 'node',
  format: 'esm',
  minify: true,
});
console.timeEnd('Build: adapter');

console.time('Build: vite plugin');
await build({
  entrypoints: ['./vite.ts'],
  outdir: 'dist',
  packages: 'external',
  target: 'node',
  format: 'esm',
  minify: true,
});
console.timeEnd('Build: vite plugin');

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
