import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nova Pergunta',
  description: 'Compartilhe sua dúvida com a comunidade. Faça uma pergunta e receba respostas.',
}

export default function NewQuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
