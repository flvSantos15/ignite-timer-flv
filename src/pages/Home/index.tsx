import { HandPalm, Play } from 'phosphor-react'
import { useState } from 'react'
import { useCycles } from '../../context/useCountdown'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'

import {
  HomeContainer,
  StartCountDownButton,
  // eslint-disable-next-line prettier/prettier
  StopCountDownButton
} from './styles'

const newCycleFormValidationsSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 mínutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 mínutos'),
})

// com isso recupero a tipagem sem criar uma interface
type NewCycleFormData = zod.infer<typeof newCycleFormValidationsSchema>

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
  const {
    getCycles,
    getCycle,
    getActiveCycleId,
    activeCycleId,
    activeCycle,
    getAmountSecondsPassed,
  } = useCycles()

  const [cycles, setCycles] = useState<Cycle[]>([])

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationsSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { reset, watch, handleSubmit } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    getCycle(newCycle)
    getActiveCycleId(id)
    getAmountSecondsPassed(0)

    reset()
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

    getCycles(cycles)

    getActiveCycleId(null)
  }

  // uso o watch pra verificar se task foi alterado
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

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
