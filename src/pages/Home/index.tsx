import { HandPalm, Play } from 'phosphor-react'
import { useState } from 'react'
import { useCycles } from '../../context/useCountdown'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton
} from './styles'

/**
 * function register(name: string) {
 *    return (
 *      onChange: () => void,
 *      onBlur: () => void
 *    )
 * }
// eslint-disable-next-line prettier/prettier
*/
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const { getCycles, getActiveCycleId } = useCycles()

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // pego o ciclo  que esta ativo no momento
  const activeCycle = cycles.find((item) => item.id === activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    getCycles(newCycle)
    // setCycles((state) => [...state, newCycle])
    // setActiveCycleId(id)
    getActiveCycleId(id)
    // setAmountSecondsPassed(0)

    // reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  // uso o watch pra verificar se task foi alterado
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown activeCycle={activeCycle} setCycles={setCycles} />

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
