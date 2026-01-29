import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'library';

  return {
    plugins: [react()],
    server: {
      port: 1327,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    build: isLibraryBuild
      ? {
          // Library mode for Webflow component
          lib: {
            entry: resolve(__dirname, 'src/components/index.ts'),
            name: 'ChoquerContact',
            fileName: (format) => `choquer-contact.${format}.js`,
            formats: ['es', 'umd'],
          },
          rollupOptions: {
            // Externalize peer dependencies
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
              // Ensure CSS is bundled
              assetFileNames: 'choquer-contact.[ext]',
            },
          },
          outDir: 'dist-lib',
          cssCodeSplit: false, // Bundle CSS into single file
        }
      : {
          // Standard app build
          outDir: 'dist',
        },
  };
});
