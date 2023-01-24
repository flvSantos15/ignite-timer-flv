import styled from 'styled-components'

interface IHistoryContainer {
  defaultTheme: 'light' | 'dark'
}

export const HistoryContainer = styled.div<IHistoryContainer>`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) =>
      props.defaultTheme === 'dark'
        ? props.theme['gray-100']
        : props.theme['gray-600']};
  }

  @media (max-width: 700px) {
    padding: 0;
  }
`

export const HistoryList = styled.div<IHistoryContainer>`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      /* background-color: ${(props) => props.theme['gray-600']}; */
      background-color: ${(props) =>
        props.defaultTheme === 'dark'
          ? props.theme['gray-600']
          : props.theme['gray-500']};
      padding: 1rem;
      text-align: left;
      color: ${(props) =>
        props.defaultTheme === 'dark'
          ? props.theme['gray-100']
          : props.theme['gray-900']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }

      @media (max-width: 650px) {
        padding: 0.5rem;
      }
    }

    td {
      background-color: ${(props) =>
        props.defaultTheme === 'dark'
          ? props.theme['gray-700']
          : props.theme['gray-400']};
      color: ${(props) =>
        props.defaultTheme === 'dark'
          ? props.theme['gray-100']
          : props.theme['gray-900']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }

      @media (max-width: 700px) {
        padding: 0.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500'
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}
// interface StatusProps {
//   statusColor: 'yellow' | 'red' | 'green'
// }

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  /* coloco via css um elemento com o before */
  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${(props) => props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
