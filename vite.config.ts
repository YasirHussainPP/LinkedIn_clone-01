import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './' is the most compatible setting for GitHub Pages when 
  // you don't want to hardcode the repository name.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    // Ensure the build doesn't fail on minor linting issues
    minify: 'esbuild',
  },
  define: {
    // Injects the API_KEY from your environment/Github Secrets into the application.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});
