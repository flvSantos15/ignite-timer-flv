import { createContext, ReactNode, useState } from 'react'

interface IThemeConfigContextData {
  themeConfig: string
  setThemeConfig: (value: string) => void
}

interface IThemeConfigProviderProps {
  children: ReactNode
}

export const ThemeConfigContext = createContext({} as IThemeConfigContextData)

export function ThemeConfigProvider({ children }: IThemeConfigProviderProps) {
  const [themeConfig, setThemeConfig] = useState('')

  return (
    <ThemeConfigContext.Provider value={{ themeConfig, setThemeConfig }}>
      {children}
    </ThemeConfigContext.Provider>
  )
}
