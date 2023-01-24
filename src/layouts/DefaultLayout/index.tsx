import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'
import { useThemeConfig } from '../../context/useTheme'

import { LayoutContainer } from './styles'

export function DefaultLayout() {
  const { themeConfig } = useThemeConfig()

  return (
    <LayoutContainer defaultTheme={themeConfig}>
      <Header />
      <Outlet />
    </LayoutContainer>
  )
}
