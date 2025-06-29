import { defineConfig } from 'vite';

export default defineConfig({
  root: '../frontend',  // Pointing to the frontend folder as the root
  build: {
    outDir: '../dist', // Output build in the root directory
    rollupOptions: {
      input: './index.html' // Make sure Vite uses the correct HTML file
    }
  }
});
