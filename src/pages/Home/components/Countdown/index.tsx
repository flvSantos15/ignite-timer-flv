import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

import { useCycles } from '../../../../context/useCountdown'

import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  // eslint-disable-next-line prettier/prettier, no-unused-vars
  const { activeCycle, activeCycleId, markCycleAsFinishedAsFinished } = useCycles()

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCycleAsFinishedAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCycleAsFinishedAsFinished])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
