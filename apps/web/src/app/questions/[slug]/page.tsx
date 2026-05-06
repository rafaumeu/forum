'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { api } from '@/lib/api/client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  MessageSquare,
  Loader2,
  CheckCircle2,
  CornerDownRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { toast } from 'sonner'

interface Question {
  id: string
  slug: string
  title: string
  content: string
  authorName: string
  authorId: string
  bestAnswerId: string | null
  createdAt: string
  updatedAt: string
}

interface Answer {
  id: string
  content: string
  authorName: string
  authorId: string
  isBestAnswer: boolean
  createdAt: string
}

export default function QuestionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const slug = params.slug as string

  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)
  const [answerContent, setAnswerContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [answersPage, setAnswersPage] = useState(1)
  const [answersTotal, setAnswersTotal] = useState(0)
  const answersPerPage = 10
  const answersTotalPages = Math.ceil(answersTotal / answersPerPage)

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await api.get(`/questions/${slug}`)
        setQuestion(data.question ?? data)
      } catch {
        toast.error('Pergunta não encontrada')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestion()
  }, [slug, router])

  useEffect(() => {
    if (!question?.id) return
    const qid = question.id
    async function fetchAnswers() {
      try {
        const { data } = await api.get(`/questions/${qid}/answers`, {
          params: { page: answersPage },
        })
        setAnswers(data.answers ?? data)
        setAnswersTotal(data.total ?? 0)
      } catch {
        setAnswers([])
      }
    }
    fetchAnswers()
  }, [question?.id, answersPage])

  async function handleSubmitAnswer(e: React.FormEvent) {
    e.preventDefault()
    if (!answerContent.trim() || !question) {
      toast.error('Escreva uma resposta')
      return
    }
    setSubmitting(true)
    try {
      await api.post(`/questions/${question.id}/answers`, {
        content: answerContent,
      })
      toast.success('Resposta enviada!')
      setAnswerContent('')
      setAnswersPage(1)
      // Re-fetch answers
      const { data } = await api.get(`/questions/${question!.id}/answers`, {
        params: { page: 1 },
      })
      setAnswers(data.answers ?? data)
      setAnswersTotal(data.total ?? 0)
    } catch {
      toast.error('Erro ao enviar resposta')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleMarkBest(answerId: string) {
    try {
      await api.patch(`/answers/${answerId}/best`)
      toast.success('Marcada como melhor resposta!')
      setAnswers((prev) =>
        prev.map((a) => ({ ...a, isBestAnswer: a.id === answerId }))
      )
      setQuestion((prev) => (prev ? { ...prev, bestAnswerId: answerId } : prev))
    } catch {
      toast.error('Erro ao marcar melhor resposta')
    }
  }

  function getInitials(name: string) {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!question) return null

  const isAuthor = user?.id === question.authorId

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {getInitials(question.authorName)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{question.authorName}</span>
          <span className="text-sm text-muted-foreground">
            {new Date(question.createdAt).toLocaleDateString('pt-BR')}
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
        <div className="prose prose-sm max-w-none whitespace-pre-wrap text-muted-foreground">
          {question.content}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Answers */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Respostas ({answersTotal})
        </h2>
      </div>

      {answers.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Nenhuma resposta ainda. Seja o primeiro a responder!
        </p>
      ) : (
        <div className="space-y-4 mb-6">
          {answers.map((answer) => (
            <Card
              key={answer.id}
              className={answer.isBestAnswer ? 'border-green-500/50 bg-green-50/5' : ''}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {getInitials(answer.authorName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{answer.authorName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(answer.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {answer.isBestAnswer && (
                      <Badge variant="default" className="gap-1 bg-green-600">
                        <CheckCircle2 className="h-3 w-3" />
                        Melhor Resposta
                      </Badge>
                    )}
                    {isAuthor && !answer.isBestAnswer && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkBest(answer.id)}
                        className="text-xs gap-1"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Marcar como Melhor
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap text-sm">{answer.content}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {answersTotalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-6">
          <Button
            variant="outline"
            size="sm"
            disabled={answersPage <= 1}
            onClick={() => setAnswersPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {answersPage} de {answersTotalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={answersPage >= answersTotalPages}
            onClick={() => setAnswersPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Separator className="my-6" />

      {/* Answer Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitAnswer} className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <CornerDownRight className="h-4 w-4" />
            Sua Resposta
          </h3>
          <Textarea
            placeholder="Escreva sua resposta..."
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            rows={5}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar Resposta'
            )}
          </Button>
        </form>
      ) : (
        <div className="text-center py-4">
          <p className="text-muted-foreground mb-2">
            Faça login para responder esta pergunta
          </p>
          <Button onClick={() => router.push('/login')}>Entrar</Button>
        </div>
      )}
    </div>
  )
}
