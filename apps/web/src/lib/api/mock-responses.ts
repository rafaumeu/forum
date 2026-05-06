import type { Question } from './mock-data'

const questions: Question[] = [
  {
    id: '1',
    slug: 'como-configurar-nextjs-com-app-router',
    title: 'Como configurar o Next.js 15 com App Router e autenticação JWT?',
    content: 'Estou migrando um projeto do Pages Router para o App Router e preciso implementar autenticação com JWT. Alguém pode compartilhar a melhor abordagem para middleware de autenticação no App Router? Já tentei usar o middleware.ts mas estou com dificuldades para redirecionar usuários não autenticados.',
    authorName: 'Lucas Mendes',
    authorId: 'user-1',
    answersCount: 5,
    createdAt: '2026-05-05T10:30:00Z',
    updatedAt: '2026-05-05T14:22:00Z',
  },
  {
    id: '2',
    slug: 'diferenca-entre-use-client-e-server-components',
    title: 'Qual a diferença entre "use client" e Server Components no React 19?',
    content: 'Estou confuso sobre quando usar "use client" vs Server Components. Li a documentação mas ainda não ficou claro. Quais são os casos de uso reais? Quando devo preferir um sobre o outro? Performance muda muito?',
    authorName: 'Ana Beatriz Silva',
    authorId: 'user-2',
    answersCount: 8,
    createdAt: '2026-05-04T16:45:00Z',
    updatedAt: '2026-05-05T09:10:00Z',
  },
  {
    id: '3',
    slug: 'drizzle-orm-vs-prisma-2026',
    title: 'Drizzle ORM vs Prisma: qual escolher em 2026?',
    content: 'Vou iniciar um projeto novo e estou em dúvida entre Drizzle ORM e Prisma. Alguém já usou ambos em produção? Quais são os prós e contras de cada um? Preciso de boas migrations e type safety.',
    authorName: 'Pedro Henrique Costa',
    authorId: 'user-3',
    answersCount: 12,
    createdAt: '2026-05-03T08:15:00Z',
    updatedAt: '2026-05-05T11:30:00Z',
  },
  {
    id: '4',
    slug: 'tdd-com-vitest-e-react-testing-library',
    title: 'Como aplicar TDD com Vitest e React Testing Library?',
    content: 'Quero adotar TDD no meu workflow de desenvolvimento React. Alguém pode compartilhar um setup completo com Vitest + React Testing Library? Incluindo mocks de API e testes de hooks customizados.',
    authorName: 'Juliana Ferreira',
    authorId: 'user-4',
    answersCount: 3,
    createdAt: '2026-05-02T20:00:00Z',
    updatedAt: '2026-05-03T08:45:00Z',
  },
  {
    id: '5',
    slug: 'deploy-monorepo-turborepo-vercel',
    title: 'Deploy de monorepo com Turborepo no Vercel: melhores práticas',
    content: 'Tenho um monorepo com Turborepo contendo 3 apps (web, api, admin) e 2 packages compartilhados. O deploy no Vercel está confuso — como configurar o Root Directory corretamente? Alguém tem um exemplo de turbo.json otimizado?',
    authorName: 'Rafael Zendron',
    authorId: 'user-5',
    answersCount: 7,
    createdAt: '2026-05-01T14:30:00Z',
    updatedAt: '2026-05-04T16:00:00Z',
  },
  {
    id: '6',
    slug: 'clean-architecture-ddd-nodejs',
    title: 'Clean Architecture + DDD em Node.js: vale a pena?',
    content: 'Estou estudando Clean Architecture e DDD aplicados ao Node.js. Achei muito interessante a separação de responsabilidades, mas sinto que adiciona muita complexidade. Para projetos pequenos e médios, vale a pena ou é overengineering?',
    authorName: 'Carlos Eduardo Lima',
    authorId: 'user-6',
    answersCount: 15,
    createdAt: '2026-04-30T09:00:00Z',
    updatedAt: '2026-05-05T10:15:00Z',
  },
  {
    id: '7',
    slug: 'shadcn-ui-customizacao-avancada',
    title: 'Como customizar o shadcn/ui além do padrão?',
    content: 'Quero criar um design system próprio usando shadcn/ui como base. Como estender os componentes sem perder a capacidade de atualizar? Alguém já fez isso em produção? Quais armadilhas evitar?',
    authorName: 'Mariana Santos',
    authorId: 'user-7',
    answersCount: 4,
    createdAt: '2026-04-29T12:00:00Z',
    updatedAt: '2026-04-30T18:30:00Z',
  },
  {
    id: '8',
    slug: 'fastify-vs-express-performance',
    title: 'Fastify vs Express: benchmarks reais em produção',
    content: 'Vi vários benchmarks mostrando Fastify como 2-3x mais rápido que Express. Mas na prática, isso faz diferença real? Alguém pode compartilhar experiência de migração? O ecosistema de plugins é tão bom quanto o do Express?',
    authorName: 'Thiago Almeida',
    authorId: 'user-8',
    answersCount: 9,
    createdAt: '2026-04-28T17:30:00Z',
    updatedAt: '2026-05-02T14:00:00Z',
  },
]

export function getMockQuestions(page = 1, perPage = 10) {
  const start = (page - 1) * perPage
  const end = start + perPage
  return {
    questions: questions.slice(start, end),
    total: questions.length,
    page,
    perPage,
  }
}

export function getMockPopularQuestions() {
  return [...questions].sort((a, b) => b.answersCount - a.answersCount)
}

export function getMockQuestionBySlug(slug: string) {
  const question = questions.find(q => q.slug === slug)
  if (!question) return null
  return {
    question,
    answers: [
      {
        id: 'ans-1',
        content: 'Ótima pergunta! A abordagem que funcionou melhor pra mim foi usar o middleware.ts do Next.js para verificar o token JWT nos cookies. Cria uma função helper que checa a validade do token e redireciona pra /login se não estiver autenticado.',
        authorName: 'João Pedro Martins',
        authorId: 'user-9',
        createdAt: '2026-05-05T12:00:00Z',
      },
      {
        id: 'ans-2',
        content: 'Recomendo usar o pacote jose para verificar JWTs no Edge Runtime. O jsonwebtoken não funciona no middleware porque usa APIs do Node.js. Com o jose, você consegue verificar tokens de forma leve e rápida.',
        authorName: 'Fernanda Oliveira',
        authorId: 'user-10',
        createdAt: '2026-05-05T13:30:00Z',
      },
    ],
  }
}

export function getMockSearchQuestions(query: string) {
  const lower = query.toLowerCase()
  const filtered = questions.filter(q =>
    q.title.toLowerCase().includes(lower) ||
    q.content.toLowerCase().includes(lower) ||
    q.authorName.toLowerCase().includes(lower)
  )
  return { questions: filtered, total: filtered.length }
}
