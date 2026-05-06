import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Forum — Perguntas e Respostas',
    short_name: 'Forum',
    description:
      'Plataforma de perguntas e respostas para estudantes. Compartilhe conhecimento e aprenda com a comunidade.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#09090b',
    lang: 'pt-BR',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
