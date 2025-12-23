import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures all assets are loaded relative to the index.html file,
  // which is required for GitHub Pages subfolder hosting.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  define: {
    // Injects the API_KEY from your environment/Github Secrets into the application.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
