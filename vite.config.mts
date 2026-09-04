import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const projectRoot = process.cwd();

/**
 * Development-only browser preview of the React Native UI.
 *
 * Nothing here is part of the Android build — Metro only ever follows imports
 * from `index.js`. Native-only modules are aliased to browser stubs in `web/stubs`.
 *
 * The `.mts` extension keeps this loaded as ESM; as plain `.ts` Vite reads it as
 * CommonJS and warns about the `import` statements above.
 */
export default defineConfig({
  root: path.resolve(projectRoot, 'web'),
  plugins: [react()],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
      '.json',
    ],
    alias: [
      {
        find: /[/\\]src[/\\]services[/\\]locationService$/,
        replacement: path.resolve(
          projectRoot,
          'src/services/locationService.web.ts',
        ),
      },
      { find: 'react-native', replacement: 'react-native-web' },
      {
        find: '@notifee/react-native',
        replacement: path.resolve(projectRoot, 'web/stubs/notifee.ts'),
      },
      {
        find: '@react-native-async-storage/async-storage',
        replacement: path.resolve(projectRoot, 'web/stubs/asyncStorage.ts'),
      },
      {
        find: '@react-native-community/geolocation',
        replacement: path.resolve(projectRoot, 'web/stubs/geolocation.ts'),
      },
      {
        find: 'react-native-safe-area-context',
        replacement: path.resolve(
          projectRoot,
          'web/stubs/safeAreaContext.tsx',
        ),
      },
    ],
  },
  define: {
    __DEV__: 'true',
    global: 'globalThis',
  },
  server: {
    port: 5173,
  },
});
