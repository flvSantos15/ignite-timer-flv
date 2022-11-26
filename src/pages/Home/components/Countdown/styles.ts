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
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(props) => props.theme['green-500']};
  width: 4rem;
  display: flex;
  justify-content: center;
`
