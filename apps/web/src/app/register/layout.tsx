import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Registre-se no Fórum e comece a compartilhar conhecimento com a comunidade.',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
