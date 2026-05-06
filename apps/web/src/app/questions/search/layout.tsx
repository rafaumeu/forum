import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buscar Perguntas',
  description: 'Pesquise perguntas na comunidade. Encontre respostas para suas dúvidas.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
