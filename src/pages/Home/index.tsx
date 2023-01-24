/* eslint-disable prettier/prettier */
import { HandPalm, Play } from 'phosphor-react'
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
    .max(60, 'O ciclo precisa ser de no máximo 60 mínutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationsSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useCycles()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationsSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { reset, watch, handleSubmit } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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
