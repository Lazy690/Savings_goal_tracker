import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
    },
  },
});