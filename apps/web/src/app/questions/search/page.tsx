'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageSquare, Search, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface Question {
  id: string
  slug: string
  title: string
  content: string
  authorName: string
  authorId: string
  answersCount: number
  createdAt: string
}

interface QuestionsResponse {
  questions: Question[]
  total: number
  page: number
  perPage: number
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [questions, setQuestions] = useState<Question[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const perPage = 10
  const totalPages = Math.ceil(total / perPage)

  const fetchResults = useCallback(async () => {
    if (!query) return
    setLoading(true)
    try {
      const { data } = await api.get<QuestionsResponse>('/questions/search', {
        params: { q: query, page },
      })
      setQuestions(data.questions)
      setTotal(data.total)
    } catch {
      setQuestions([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [query, page])

  useEffect(() => {
    fetchResults()
  }, [fetchResults])

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Buscar Perguntas</h1>
        <p className="text-muted-foreground">Use a barra de busca para encontrar perguntas</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Resultados para &quot;{query}&quot;
        </h1>
        <p className="text-muted-foreground">{total} pergunta(s) encontrada(s)</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h2>
          <p className="text-muted-foreground mb-4">
            Tente buscar com outros termos
          </p>
          <Link href="/">
            <Button variant="outline">Voltar ao Início</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <Link href={`/questions/${question.slug}`}>
                  <CardTitle className="text-lg hover:text-primary transition-colors line-clamp-2">
                    {question.title}
                  </CardTitle>
                </Link>
                <CardDescription className="line-clamp-2">
                  {question.content.slice(0, 150)}...
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(question.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{question.authorName}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{question.answersCount ?? 0}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  )
}
