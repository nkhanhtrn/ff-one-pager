import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const isSingleFile = process.env.VITE_SINGLEFILE === 'true';
const targetBrowser = process.env.TARGET_BROWSER || 'firefox';

export default defineConfig({
  plugins: [
    vue(),
    ...(isSingleFile ? [viteSingleFile()] : []),
    // Copy only the selected manifest to avoid accidental overwrites
    viteStaticCopy({
      targets: (() => {
        if (targetBrowser === 'chrome') return [{ src: 'manifest.chrome.json', dest: '.', rename: 'manifest.json' }];
        return [{ src: 'manifest.firefox.json', dest: '.', rename: 'manifest.json' }];
      })()
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
