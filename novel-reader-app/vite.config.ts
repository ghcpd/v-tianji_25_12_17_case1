import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vitest config (cast to any to avoid Vite type mismatch in some envs)
  test: ({
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  } as any),
} as any)
