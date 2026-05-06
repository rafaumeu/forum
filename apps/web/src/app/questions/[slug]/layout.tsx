import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333'
    const res = await fetch(`${baseUrl}/questions/${slug}`, {
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return {
        title: 'Pergunta não encontrada',
        description: 'A pergunta que você procura não foi encontrada.',
      }
    }

    const data = await res.json()
    const question = data.question ?? data
    const title = question.title ?? 'Pergunta'
    const description = (question.content ?? '').slice(0, 160)

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
  } catch {
    return {
      title: 'Pergunta',
      description: 'Veja esta pergunta e suas respostas no Fórum.',
    }
  }
}

export default function QuestionSlugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
