import styled from 'styled-components'

interface ILayoutContainer {
  defaultTheme: 'light' | 'dark'
}

export const LayoutContainer = styled.div<ILayoutContainer>`
  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;

  background: ${(props) =>
    props.defaultTheme === 'dark'
      ? props.theme['gray-800']
      : props.theme['gray-300']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
