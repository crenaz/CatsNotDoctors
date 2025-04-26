import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'global': 'globalThis',
    'process.env': process.env,
  },
  build: {
    target: 'esnext',
  },
  ssr: {
    noExternal: true,
  },
  optimizeDeps: {
    include: ['cssesc'],
  },
});