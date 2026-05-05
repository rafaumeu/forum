import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      exclude: [
        // Pure interfaces / types
        'src/core/entities/types/optional.ts',
        'src/core/errors/use-case-error.ts',
        'src/core/events/domain-event.ts',
        'src/core/events/event-handler.ts',
        'src/core/repositories/pagination-params.ts',
        'src/domain/forum/application/repositories/*.ts',
        'src/domain/notification/application/repositories/notification-repository.ts',
        // Empty / broken spec files
        'src/core/events/domain-events.espec.ts',
        'src/core/events/doamin-envents.spec.ts',
        // Test infrastructure
        'src/test/**',
        // Config
        'vite.config.ts',
      ],
    },
  },
  plugins: [tsConfigPaths()],
})
