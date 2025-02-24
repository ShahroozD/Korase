import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: ['react', 'react-dom'], // Ensures these libraries are bundled correctly
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Pre-bundling for React
  },
});
