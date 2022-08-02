import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig((env) => {
  const isDev = env.mode === 'development';

  return {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'SoundcloudEmbedReact',
        fileName: 'index',
        formats: ['cjs', 'es', 'umd', 'iife'],
      },
      rollupOptions: {
        external: 'soundcloud-embed',
        output: {
          globals: {
            'soundcloud-embed': 'SoundcloudEmbed',
          },
        },
      },
    },
    resolve: {
      alias: isDev
        ? {
            'soundcloud-embed': 'soundcloud-embed/src/index.ts',
          }
        : {},
    },
  };
});
