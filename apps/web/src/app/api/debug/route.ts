export const dynamic = 'force-dynamic'

export async function GET() {
  const results: Record<string, string> = {}

  // Test 1: Can we import the API bundle?
  try {
    const api = await import('@forum/api/vercel')
    results['api_import'] = 'OK - keys: ' + Object.keys(api).join(', ')
  } catch (e: any) {
    results['api_import'] = 'FAIL: ' + e.message?.substring(0, 200)
  }

  // Test 2: Can we connect to Prisma?
  try {
    const { PrismaClient } = await import('@prisma/client')
    const prisma = new PrismaClient()
    await prisma.$queryRaw`SELECT 1`
    await prisma.$disconnect()
    results['prisma'] = 'OK'
  } catch (e: any) {
    results['prisma'] = 'FAIL: ' + e.message?.substring(0, 200)
  }

  // Test 3: Can we use bcryptjs?
  try {
    const bcrypt = await import('bcryptjs')
    const hash = await bcrypt.hash('test', 4)
    results['bcryptjs'] = 'OK - hash: ' + hash.substring(0, 20)
  } catch (e: any) {
    results['bcryptjs'] = 'FAIL: ' + e.message?.substring(0, 200)
  }

  // Test 4: DATABASE_URL env var
  results['DATABASE_URL'] = process.env.DATABASE_URL ? 'SET (' + process.env.DATABASE_URL.substring(0, 30) + '...)' : 'NOT SET'

  return Response.json(results)
}
