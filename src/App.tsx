import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './context/useCountdown'
import { ThemeConfigProvider, useThemeConfig } from './context/useTheme'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

function AppWithContext() {
  const { themeConfig } = useThemeConfig()

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>

      <GlobalStyle defaultTheme={themeConfig} />
    </ThemeProvider>
  )
}

export function App() {
  return (
    <ThemeConfigProvider>
      <AppWithContext />
    </ThemeConfigProvider>
  )
}
