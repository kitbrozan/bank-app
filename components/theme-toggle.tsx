'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        type="button"
        className="grid size-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur"
        aria-label="Toggle theme"
      >
        <div className="size-4 animate-pulse rounded-full bg-muted-foreground/30" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="grid size-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}