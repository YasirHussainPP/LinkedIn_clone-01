
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'repo-name' with your actual GitHub repository name
  // If your URL is https://username.github.io/my-linkedin-clone/, base should be '/my-linkedin-clone/'
  base: './', 
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});
