import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perguntas Populares',
  description: 'Veja as perguntas mais respondidas pela comunidade. As melhores discussões estão aqui.',
}

export default function PopularLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
