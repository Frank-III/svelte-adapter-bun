import type { Plugin } from 'vite';

/**
 * Vite plugin to handle Bun-specific modules during development and build.
 * Add this to your vite.config.ts plugins array.
 *
 * @example
 * ```ts
 * import { sveltekit } from '@sveltejs/kit/vite';
 * import { bunVitePlugin } from 'svelte-adapter-bun/vite';
 *
 * export default {
 *   plugins: [sveltekit(), bunVitePlugin()]
 * };
 * ```
 */
export function bunVitePlugin(): Plugin {
  return {
    name: 'vite-plugin-bun',
    config() {
      return {
        ssr: {
          external: ['bun'],
          noExternal: [],
        },
        optimizeDeps: {
          exclude: ['bun'],
        },
        build: {
          rollupOptions: {
            external: ['bun', /^bun:/],
          },
        },
        resolve: {
          conditions: ['bun', 'node'],
        },
      };
    },
  };
}
