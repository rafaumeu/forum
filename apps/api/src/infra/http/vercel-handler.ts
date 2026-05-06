import { app } from './app'

let initialized = false

async function ensureReady() {
  if (!initialized) {
    await app.ready()
    initialized = true
  }
  return app
}

/**
 * Web API (fetch) compatible handler for Vercel Serverless Functions.
 * Uses Fastify's inject() to dispatch requests internally.
 */
export async function fetchHandler(request: Request): Promise<Response> {
  const fastify = await ensureReady()

  const url = new URL(request.url)
  const path = url.pathname + url.search

  // Read body
  let body: string | Buffer | undefined
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    body = Buffer.from(await request.arrayBuffer())
  }

  // Collect headers
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })

  // Use Fastify's inject() to dispatch the request
  const result = await fastify.inject({
    method: request.method || 'GET',
    url: path,
    headers,
    body,
  })

  // Build the Web API Response
  const responseHeaders = new Headers()
  for (const [key, value] of Object.entries(result.headers)) {
    if (key.toLowerCase() === 'transfer-encoding') continue
    if (typeof value === 'string') {
      responseHeaders.set(key, value)
    } else if (Array.isArray(value)) {
      for (const v of value) {
        responseHeaders.append(key, v)
      }
    }
  }

  return new Response(result.body, {
    status: result.statusCode,
    headers: responseHeaders,
  })
}
