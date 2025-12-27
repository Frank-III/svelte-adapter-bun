import type { Adapter } from '@sveltejs/kit';
import type { Plugin } from 'vite';
import './ambient.js';

interface AdapterOptions {
  out?: string;
  precompress?: boolean;
  envPrefix?: string;
  /**
   * If enabled, the adapter will serve static assets.
   * @default true
   */
  serveAssets?: boolean;
}

export default function adapter(options?: AdapterOptions): Adapter;

/**
 * Vite plugin to handle Bun-specific modules during development and build.
 * Add this to your vite.config.ts plugins array.
 *
 * @example
 * ```ts
 * import { sveltekit } from '@sveltejs/kit/vite';
 * import { bunVitePlugin } from 'svelte-adapter-bun';
 *
 * export default {
 *   plugins: [sveltekit(), bunVitePlugin()]
 * };
 * ```
 */
export function bunVitePlugin(): Plugin;
