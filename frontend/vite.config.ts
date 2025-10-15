import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@game': path.resolve(__dirname, './src/game'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@store': path.resolve(__dirname, './src/store'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@states': path.resolve(__dirname, './src/states'),
      '@magicblock': path.resolve(__dirname, './src/magicblock'),
    }
  },
  define: {
    'process.env': {}
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          solana: ['@solana/web3.js', '@solana/wallet-adapter-base'],
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
})

