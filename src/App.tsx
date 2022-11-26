import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CyclesProvider } from './context/useCountdown'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  // const [choosedTheme, setChoosedTheme] = useState('light')

  // const themeToggler = () => {
  //   choosedTheme === 'light' ? setChoosedTheme('dark') : setChoosedTheme('light')
  // }

  const choosedTheme = 'dark'

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </BrowserRouter>

      <GlobalStyle defaultTheme={choosedTheme} />
    </ThemeProvider>
  )
}
