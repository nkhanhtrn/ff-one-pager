import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const isSingleFile = process.env.VITE_SINGLEFILE === 'true';

export default defineConfig({
  plugins: [
    vue(),
    ...(isSingleFile ? [viteSingleFile()] : []),
    viteStaticCopy({
      targets: [
        {
          src: 'manifest.json',
          dest: '.'
        }
      ]
    })
  ],
  build: isSingleFile
    ? {
        cssCodeSplit: false,
        assetsInlineLimit: 100000000,
        rollupOptions: {
          inlineDynamicImports: true
        }
      }
    : {}
});
