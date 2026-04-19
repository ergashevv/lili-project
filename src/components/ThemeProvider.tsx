'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
  primaryColor: string
  secondaryColor: string
  setTheme: (primary: string, secondary: string) => void
  resetTheme: () => void
}

const defaultPrimary = '#800020'
const defaultSecondary = '#d4af37'

const ThemeContext = createContext<ThemeContextType>({
  primaryColor: defaultPrimary,
  secondaryColor: defaultSecondary,
  setTheme: () => {},
  resetTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState(defaultPrimary)
  const [secondaryColor, setSecondaryColor] = useState(defaultSecondary)

  const setTheme = (primary: string, secondary: string) => {
    setPrimaryColor(primary)
    setSecondaryColor(secondary)
  }

  const resetTheme = () => {
    setPrimaryColor(defaultPrimary)
    setSecondaryColor(defaultSecondary)
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--dynamic-primary', primaryColor)
    document.documentElement.style.setProperty('--dynamic-secondary', secondaryColor)
  }, [primaryColor, secondaryColor])

  return (
    <ThemeContext.Provider value={{ primaryColor, secondaryColor, setTheme, resetTheme }}>
      <div className="dynamic-theme">
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
