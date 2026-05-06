import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({
    user: { id: 'user-5', name: 'Rafael Zendron', email: 'rafael@forum.com', role: 'ADMIN' },
  })
}
