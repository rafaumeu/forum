import { app } from './app'

async function start() {
  const port = Number(process.env.PORT) || 3333
  await app.listen({ port, host: '0.0.0.0' })
  console.log(`Forum API running on port ${port}`)
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
