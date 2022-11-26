import { HeaderContainer } from './styles'

import { Scroll, Timer, Sun } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoHeader from '../../assets/logo-ignite.svg'

export function Header() {
  const tooglerTheme = () => {
    alert('dark')
  }
  return (
    <HeaderContainer id="header">
      <img src={logoHeader} alt="Dois triângulos entrelaçados" />

      <div className="header">
        <button onClick={tooglerTheme}>
          <Sun size={24} />
        </button>
        <nav>
          <NavLink to="/" title="Timer">
            <Timer size={24} />
          </NavLink>
          <NavLink to="/history" title="Histórico">
            <Scroll size={24} />
          </NavLink>
        </nav>
      </div>
    </HeaderContainer>
  )
}
