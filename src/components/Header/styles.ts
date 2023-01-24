import styled from 'styled-components'

interface IHeaderContainerProps {
  defaultTheme: 'light' | 'dark'
}

export const HeaderContainer = styled.header<IHeaderContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div.header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: space-around;

    button {
      display: flex;
      align-items: center;
      justify-content: center;

      background: none;
      border: none;
      cursor: pointer;

      width: 3rem;
      height: 3rem;

      svg {
        color: ${(props) => props.theme['yellow-500']};
      }
    }

    nav {
      display: flex;
      gap: 0.5rem;

      a {
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center;

        color: ${(props) =>
          props.defaultTheme === 'dark'
            ? props.theme['gray-100']
            : props.theme['gray-600']};

        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;

        &:hover {
          border-bottom: 3px solid ${(props) => props.theme['green-500']};
        }

        &.active {
          color: ${(props) => props.theme['green-500']};
        }
      }
    }
  }
`
