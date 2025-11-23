import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// ...removed viteSingleFile import...
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { VitePWA } from 'vite-plugin-pwa';

// ...removed isPWA flag for single file build...
const targetBrowser = process.env.TARGET_BROWSER || 'firefox';
const isPWA = process.env.VITE_PWA === 'true';

export default defineConfig({
  plugins: [
    vue(),
    ...(isPWA
      ? [
          VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
              'favicon.svg',
              'icon-16.png',
              'icon-32.png',
              'icon-64.png',
              'icon-128.png',
              'icon-256.png',
              'index.pwa.html',
            ],
            workbox: {
              globPatterns: ['**/*.{js,css,html,png,svg,json}']
            },
            manifest: {
              name: 'One Pager',
              short_name: 'One Pager',
              description: 'Offline-capable one-pager application',
              theme_color: '#2d2d2d',
              background_color: '#2d2d2d',
              display: 'standalone',
              start_url: './index.pwa.html',
              icons: [
                { src: 'icon-128.png', sizes: '128x128', type: 'image/png' },
                { src: 'icon-256.png', sizes: '256x256', type: 'image/png' },
                { src: 'icon-48.png', sizes: '48x48', type: 'image/png' }
              ]
            }
          })
        ]
      : []),
    // Copy only the selected manifest to avoid accidental overwrites
    viteStaticCopy({
      targets: (() => {
        const targets = [];
        if (targetBrowser === 'chrome') {
          targets.push({ src: 'manifest.chrome.json', dest: '.', rename: 'manifest.json' });
        } else {
          targets.push({ src: 'manifest.firefox.json', dest: '.', rename: 'manifest.json' });
        }
        return targets;
      })()
    })
  ],
  base: '/one-pager/',
  server: {
    port: 3000,
    open: '/one-pager/'
  },
  build: {
    rollupOptions: {
      input: {
        main: isPWA ? 'index.pwa.html' : 'index.html'
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    outDir: 'dist'
  }
});
