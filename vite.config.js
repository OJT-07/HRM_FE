/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import dotenv from 'dotenv';

dotenv.config();
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [pluginRewriteAll(), react()],
    resolve: {
      alias: { '@app': path.resolve('./src') }
    },

    server: {
      watch: {
        usePolling: true
      },
      host: true,
      strictPort: true,
      port: 3000
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    }
  });
};
