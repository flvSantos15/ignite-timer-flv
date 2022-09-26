import { createContext, ReactNode, useContext, useState } from 'react'

interface createCycleData {
  task: string
  minutesAmount: number
}
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCycleAsFinishedAsFinished: () => void
  createNewCycle: (cycle: createCycleData) => void
  interruptCurrentCycle: () => void
  getAmountSecondsPassed: (seconds: number) => void
}

interface CyclesProviderData {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export const CyclesProvider = ({ children }: CyclesProviderData) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const markCycleAsFinishedAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const getAmountSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const createNewCycle = (data: createCycleData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  const interruptCurrentCycle = () => {
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

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinishedAsFinished,
        amountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
        getAmountSecondsPassed,
      }}
    >
      <>{children}</>
    </CyclesContext.Provider>
  )
}

export const useCycles = () => {
  const cyclesContext = useContext(CyclesContext)
  return cyclesContext
}
