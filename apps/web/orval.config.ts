import { defineConfig } from 'orval'

export default defineConfig({
  forum: {
    input: 'http://localhost:3333/docs/json',
    output: {
      target: 'src/lib/api/generated.ts',
      client: 'react-query',
      httpClient: 'axios',
      override: {
        mutator: {
          path: 'src/lib/api/client.ts',
          name: 'customInstance',
        },
      },
    },
  },
})
