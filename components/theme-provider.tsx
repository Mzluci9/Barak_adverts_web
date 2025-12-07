'use client'

/**
 * ThemeProvider Wrapper
 * ----------------------
 * This component forwards all props to NextThemesProvider.
 * Useful for global theme handling across the app.
 */

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Pass props directly to NextThemesProvider (no behavior change)
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
