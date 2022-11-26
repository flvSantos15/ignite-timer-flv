import { createGlobalStyle } from 'styled-components'

interface IGlobalStyle {
  defaultTheme: 'light' | 'dark'
}

export const GlobalStyle = createGlobalStyle<IGlobalStyle>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }

  body {
    background: ${(props) =>
      props.defaultTheme === 'dark'
        ? props.theme['gray-900']
        : props.theme['gray-300']};
    color: ${(props) =>
      props.defaultTheme === 'dark'
        ? props.theme['gray-300']
        : props.theme['gray-800']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    -webkit-font-smoothing: antialiased;
  }
`
