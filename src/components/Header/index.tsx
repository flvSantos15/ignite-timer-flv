import { HeaderContainer } from './styles'

import { Scroll, Timer } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import logoHeader from '../../assets/logo-ignite.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoHeader} alt="Dois triângulos entrelaçados" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
