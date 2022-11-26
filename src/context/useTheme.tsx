import { createContext, ReactNode, useContext, useState } from 'react'

interface IThemeConfigContextData {
  themeConfig: 'light' | 'dark'
  setThemeConfig: (value: 'light' | 'dark') => void
}

interface IThemeConfigProviderProps {
  children: ReactNode
}

export const ThemeConfigContext = createContext({} as IThemeConfigContextData)

export function ThemeConfigProvider({ children }: IThemeConfigProviderProps) {
  const [themeConfig, setThemeConfig] = useState<'light' | 'dark'>('dark')

  return (
    <ThemeConfigContext.Provider value={{ themeConfig, setThemeConfig }}>
      {children}
    </ThemeConfigContext.Provider>
  )
}

export const useThemeConfig = () => {
  const theme = useContext(ThemeConfigContext)

  return theme
}
