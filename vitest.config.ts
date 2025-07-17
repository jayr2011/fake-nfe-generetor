import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/node_modules/**', '**/tests/**', '**/*.d.ts']
    },
    include: ['tests/**/*.spec.{ts,tsx}'],
    exclude: ['node_modules', 'dist']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
