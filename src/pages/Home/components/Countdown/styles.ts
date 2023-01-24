import styled from 'styled-components'

interface ICountdownContainer {
  defaultTheme: 'light' | 'dark'
}

export const CountdownContainer = styled.div<ICountdownContainer>`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) =>
    props.defaultTheme === 'dark'
      ? props.theme['gray-100']
      : props.theme['gray-600']};

  display: flex;
  gap: 1rem;

  span {
    background: ${(props) =>
      props.defaultTheme === 'dark'
        ? props.theme['gray-700']
        : props.theme['gray-400']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media (max-width: 650px) {
    width: 100%;
    padding: 10px 0;
    font-size: 6rem;
    line-height: 4rem;
    gap: 0.5rem;

    span {
      padding: 1.5rem 0.25rem;
      border-radius: 5px;
    }
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  display: flex;
  justify-content: center;

  @media (max-width: 650px) {
    width: 1.5rem;
    padding: 1rem 0;
  }
`
