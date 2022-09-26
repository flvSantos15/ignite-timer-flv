import { createContext, ReactNode, useContext, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  getCycle: (cycle: Cycle) => void
  getCycles: (cycle: Cycle[]) => void
  getActiveCycleId: (id: string | null) => void
  markCycleAsFinishedAsFinished: () => void
  getAmountSecondsPassed: (seconds: number) => void
}

interface CyclesProviderData {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export const CyclesProvider = ({ children }: CyclesProviderData) => {
  // const [cycle, setCycle] = useState<Cycle>()
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const getCycle = (cycle: Cycle) => {
    // setCycle(cycle)
    setCycles((state) => [...state, cycle])
  }

  const getCycles = (cycle: Cycle[]) => {
    setCycles(cycles)
    // setCycles((state) => [...state, cycle])
  }

  const getActiveCycleId = (id: string | null) => {
    setActiveCycleId(id)
  }

  const getAmountSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        getCycle,
        getCycles,
        getActiveCycleId,
        markCycleAsFinishedAsFinished,
        amountSecondsPassed,
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
