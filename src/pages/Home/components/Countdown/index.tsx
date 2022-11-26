/* eslint-disable prettier/prettier */
import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'

import { useCycles } from '../../../../context/useCountdown'
import { useThemeConfig } from '../../../../context/useTheme'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    activeCycle,
    markCycleAsFinishedAsFinished,
    amountSecondsPassed,
    getAmountSecondsPassed
  } = useCycles()
  const { themeConfig } = useThemeConfig()

  // total de segundos
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // total de segundos atuais
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // pego os segundos atuais e separo por minutos
  const minutesAmount = Math.floor(currentSeconds / 60)
  // o restande vira segundos
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let interval: NodeJS.Timeout

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinishedAsFinished()
          getAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          getAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    markCycleAsFinishedAsFinished,
    getAmountSecondsPassed
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer defaultTheme={themeConfig}>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
