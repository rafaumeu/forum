import swc from 'unplugin-swc'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.e2e.spec.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    globals: true,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
  },
  plugins: [
    tsConfigPaths(),

    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
