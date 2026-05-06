// Build script for Vercel serverless handler
// Bundles API + Domain into a single ESM file with all aliases resolved
const esbuild = require(require('path').resolve('../../node_modules/.pnpm/esbuild@0.27.7/node_modules/esbuild'))
const path = require('path')
const fs = require('fs')

const apiSrc = path.resolve(__dirname, 'src')
const domainSrc = path.resolve(__dirname, '../../packages/domain/src')

function resolveWithExt(resolvedPath) {
  if (fs.existsSync(resolvedPath)) return resolvedPath
  if (fs.existsSync(resolvedPath + '.ts')) return resolvedPath + '.ts'
  if (fs.existsSync(resolvedPath + '.tsx')) return resolvedPath + '.tsx'
  if (fs.existsSync(path.join(resolvedPath, 'index.ts'))) return path.join(resolvedPath, 'index.ts')
  if (fs.existsSync(path.join(resolvedPath, 'index.tsx'))) return path.join(resolvedPath, 'index.tsx')
  return resolvedPath
}

esbuild.build({
  entryPoints: ['src/infra/http/vercel-handler.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/vercel-handler.js',
  platform: 'node',
  target: 'es2022',
  external: ['@prisma/client', '@prisma/engines', 'prisma', 'bcryptjs'],
  plugins: [{
    name: 'resolve-aliases',
    setup(build) {
      build.onResolve({ filter: /^@forum\/domain\/src\// }, (args) => {
        const subpath = args.path.replace('@forum/domain/src/', '')
        return { path: resolveWithExt(path.resolve(domainSrc, subpath)) }
      })
      build.onResolve({ filter: /^@forum\/domain$/ }, () => {
        return { path: path.resolve(domainSrc, 'index.ts') }
      })
      build.onResolve({ filter: /^@\// }, (args) => {
        const isDomain = args.importer && args.importer.includes('packages/domain')
        const base = isDomain ? domainSrc : apiSrc
        return { path: resolveWithExt(path.resolve(base, args.path.slice(2))) }
      })
    }
  }],
  logLevel: 'warning',
}).then(() => console.log('vercel-handler.js built successfully')).catch(e => { console.error('Build failed:', e.message); process.exit(1) })
