import { defineConfig } from 'orval'

export default defineConfig({
  forum: {
    input: {
      target: './src/lib/api/swagger.json',
    },
    output: {
      target: './src/lib/api/generated.ts',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/lib/api/client.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
