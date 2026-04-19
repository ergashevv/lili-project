'use client'

import { useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export function CategoryThemeSetter({ primary, secondary }: { primary: string, secondary: string }) {
  const { setTheme, resetTheme } = useTheme()

  useEffect(() => {
    if (primary && secondary) {
      setTheme(primary, secondary)
    }
    
    return () => {
      resetTheme()
    }
  }, [primary, secondary, setTheme, resetTheme])

  return null
}
