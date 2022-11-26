import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid green;

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

        color: ${(props) => props.theme['gray-100']};

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
