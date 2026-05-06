'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h2 className="text-xl font-semibold mb-2">Algo deu errado</h2>
      <p className="text-muted-foreground mb-4">
        {error.message || 'Erro inesperado'}
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  )
}
