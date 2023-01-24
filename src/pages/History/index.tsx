/* eslint-disable prettier/prettier */
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import ptBR from 'date-fns/locale/pt-BR'

import { useCycles } from '../../context/useCountdown'
import { useThemeConfig } from '../../context/useTheme'

import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useCycles()
  const { themeConfig } = useThemeConfig()

  return (
    <HistoryContainer defaultTheme={themeConfig}>
      <h1>Meu histórico</h1>

      <HistoryList defaultTheme={themeConfig}>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles && (
              <>
                {cycles?.map((cycle) => {
                  return (
                    <tr key={cycle.id}>
                      <td id="task">{cycle.task}</td>
                      <td>{cycle.minutesAmount}</td>
                      <td>
                        {formatDistanceToNow(new Date(cycle.startDate), {
                          addSuffix: true,
                          locale: ptBR
                        })}
                      </td>
                      <td>
                        {cycle.finishedDate && (
                          <Status statusColor="green">Concluído</Status>
                        )}

                        {cycle.interruptedDate && (
                          <Status statusColor="red">Interrompido</Status>
                        )}

                        {!cycle.interruptedDate && !cycle.finishedDate && (
                          <Status statusColor="yellow">Em andamento</Status>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
