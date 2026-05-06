import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const body = await request.json()
  if (!body.email || !body.password) {
    return NextResponse.json({ message: 'Email e senha obrigatórios' }, { status: 400 })
  }
  // Mock: set cookie and return success
  const response = NextResponse.json({ message: 'Login successful' })
  response.cookies.set('access_token', 'mock-jwt-token', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return response
}
