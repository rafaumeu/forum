import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (process.env.NEXT_PUBLIC_MOCK_API !== 'true') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  const body = await request.json()
  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ message: 'Todos os campos são obrigatórios' }, { status: 400 })
  }
  return NextResponse.json({ message: 'User registered successfully' })
}
