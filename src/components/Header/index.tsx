/* eslint-disable prettier/prettier */
import { HeaderContainer } from './styles'

import { Scroll, Timer, Sun } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoHeader from '../../assets/logo-ignite.svg'
import { useThemeConfig } from '../../context/useTheme'

export function Header() {
  const { themeConfig, setThemeConfig } = useThemeConfig()

  const tooglerTheme = () => {
    themeConfig === 'light' ? setThemeConfig('dark') : setThemeConfig('light')
  }

  return (
    <HeaderContainer id="header" defaultTheme={themeConfig}>
      <img src={logoHeader} alt="Dois triângulos entrelaçados" />

      <div className="header">
        <button onClick={tooglerTheme} id="toggle">
          <Sun size={24} />
        </button>
        <nav>
          <NavLink to="/" title="Timer" id="timer">
            <Timer size={24} />
          </NavLink>
          <NavLink to="/history" title="Histórico" id="history">
            <Scroll size={24} />
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
