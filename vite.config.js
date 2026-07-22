import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + HashRouter => works on GitHub Pages at any path
export default defineConfig({
  base: './',
  plugins: [react()],
});
