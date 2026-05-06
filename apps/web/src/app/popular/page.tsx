'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MessageSquare, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface Question {
  id: string
  slug: string
  title: string
  content: string
  authorName: string
  authorId: string
  answersCount: number
  createdAt: string
  updatedAt: string
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

export default function PopularPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const perPage = 10
  const totalPages = Math.ceil(total / perPage)

  const fetchPopular = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get<QuestionsResponse>('/questions/popular', {
        params: { page },
      })
      setQuestions(data.questions)
      setTotal(data.total)
    } catch {
      setQuestions([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPopular()
  }, [fetchPopular])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="h-8 w-8" />
          Perguntas Populares
        </h1>
        <p className="text-muted-foreground">
          As perguntas mais respondidas da comunidade
        </p>
      </div>

      <Separator className="mb-6" />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Nenhuma pergunta popular ainda</h2>
          <p className="text-muted-foreground mb-4">
            As perguntas mais respondidas aparecerão aqui
          </p>
          <Link href="/">
            <Button variant="outline">Ver Perguntas Recentes</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                    {index + 1 + (page - 1) * perPage}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/questions/${question.slug}`}>
                      <CardTitle className="text-lg hover:text-primary transition-colors line-clamp-2">
                        {question.title}
                      </CardTitle>
                    </Link>
                    <CardDescription className="mt-1 line-clamp-2">
                      {question.content.slice(0, 150)}...
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="shrink-0 gap-1">
                    <MessageSquare className="h-3 w-3" />
                    {question.answersCount ?? 0}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="pt-0">
                <div className="flex items-center gap-2 ml-11">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="text-[10px]">
                      {getInitials(question.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">{question.authorName}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(question.createdAt).toLocaleDateString('pt-BR')}
                  </span>
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
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="gap-1"
          >
            Próximo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
