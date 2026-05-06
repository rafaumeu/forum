'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { api } from '@/lib/api/client'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MessageSquare, Search, TrendingUp, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

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

function QuestionCard({ question }: { question: Question }) {
  const initials = question.authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
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
        </div>
      </CardHeader>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs" aria-label={`Avatar de ${question.authorName}`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{question.authorName}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(question.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground" aria-label={`${question.answersCount ?? 0} respostas`}>
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          <span className="text-sm">{question.answersCount ?? 0}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const perPage = 10
  const totalPages = Math.ceil(total / perPage)

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await api.get<QuestionsResponse>('/questions', {
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
    void (async () => {
      await fetchQuestions()
    })()
  }, [fetchQuestions])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/questions/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Perguntas Recentes</h1>
        <p className="text-muted-foreground">
          Encontre respostas ou compartilhe seu conhecimento
        </p>
      </div>

      {/* Search + Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2" role="search">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              placeholder="Buscar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              aria-label="Buscar perguntas"
            />
          </div>
          <button
            type="submit"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Buscar
          </button>
        </form>
        <div className="flex gap-2">
          <Link
            href="/popular"
            className={buttonVariants({ variant: 'outline', className: 'gap-2' })}
          >
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Popular
          </Link>
          {isAuthenticated && (
            <Link
              href="/questions/new"
              className={buttonVariants({ className: 'gap-2' })}
            >
              Nova Pergunta
            </Link>
          )}
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Questions List */}
      {loading ? (
        <div className="flex items-center justify-center py-12" role="status" aria-label="Carregando perguntas">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Carregando perguntas...</span>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
          <h2 className="text-xl font-semibold mb-2">Nenhuma pergunta ainda</h2>
          <p className="text-muted-foreground mb-4">
            Seja o primeiro a fazer uma pergunta!
          </p>
          {isAuthenticated ? (
            <Link
              href="/questions/new"
              className={buttonVariants({})}
            >
              Criar Pergunta
            </Link>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({})}
            >
              Entrar para Perguntar
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Paginação" className="flex items-center justify-center gap-2 mt-8">
          <button
            type="button"
            className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1' })}
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Página anterior"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Anterior
          </button>
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {page} de {totalPages}
          </span>
          <button
            type="button"
            className={buttonVariants({ variant: 'outline', size: 'sm', className: 'gap-1' })}
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Próxima página"
          >
            Próximo
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  )
}
