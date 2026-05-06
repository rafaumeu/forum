// This route handler proxies all /api/* requests to the Fastify API
// The API bundle is loaded dynamically at runtime to avoid build-time issues

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

async function handleRequest(request: Request): Promise<Response> {
  try {
    // Dynamic import to avoid bundling issues at build time
    const { fetchHandler } = await import('@forum/api/vercel')
    return await fetchHandler(request)
  } catch (error) {
    console.error('[API Proxy Error]', error)
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }
}

export async function GET(request: Request) {
  return handleRequest(request)
}

export async function POST(request: Request) {
  return handleRequest(request)
}

export async function PUT(request: Request) {
  return handleRequest(request)
}

export async function PATCH(request: Request) {
  return handleRequest(request)
}

export async function DELETE(request: Request) {
  return handleRequest(request)
}

export async function HEAD(request: Request) {
  return handleRequest(request)
}

export async function OPTIONS(request: Request) {
  return handleRequest(request)
}
