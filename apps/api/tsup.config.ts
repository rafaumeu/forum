import { defineConfig } from 'tsup'
import path from 'path'

const apiSrc = path.resolve(__dirname, 'src')
const domainSrc = path.resolve(__dirname, '../../packages/domain/src')

const aliasPlugin = {
  name: 'resolve-all-aliases',
  setup(build: any) {
    build.onResolve({ filter: /.*/, namespace: 'file' }, async (args: any) => {
      if (args.path.startsWith('@/')) {
        const isDomain = args.importer && args.importer.includes('packages/domain')
        const base = isDomain ? domainSrc : apiSrc
        return { path: path.resolve(base, args.path.slice(2)), external: false }
      }
      if (args.path.startsWith('@forum/domain/src/')) {
        const sub = args.path.replace('@forum/domain/src/', '')
        return { path: path.resolve(domainSrc, sub), external: false }
      }
      if (args.path === '@forum/domain') {
        return { path: path.resolve(domainSrc, 'index.ts'), external: false }
      }
      return null
    })
  }
}

export default defineConfig([
  {
    entry: ['src/infra/http/server.ts'],
    format: ['esm'],
    outDir: 'dist',
    dts: false,
    clean: true,
    splitting: false,
    sourcemap: false,
    platform: 'node',
    external: ['@prisma/client', '@prisma/engines', 'prisma', 'bcryptjs'],
    esbuildOptions(options) {
      options.plugins = options.plugins || []
      options.plugins.push(aliasPlugin)
    }
  },
  {
    entry: ['src/infra/http/vercel-handler.ts'],
    format: ['esm'],
    outDir: 'dist',
    dts: false,
    clean: false,
    splitting: false,
    sourcemap: false,
    bundle: true,
    platform: 'node',
    target: 'es2022',
    external: ['@prisma/client', '@prisma/engines', 'prisma', 'bcryptjs'],
    esbuildOptions(options) {
      options.plugins = options.plugins || []
      options.plugins.push(aliasPlugin)
    }
  }
])
