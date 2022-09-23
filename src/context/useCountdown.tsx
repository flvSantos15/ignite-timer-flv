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
  getCycles: (cycle: Cycle) => void
  getActiveCycleId: (id: string) => void
  markCycleAsFinishedAsFinished: () => void
}

interface CyclesProviderData {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export const CyclesProvider = ({ children }: CyclesProviderData) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const getCycles = (cycle: Cycle) => {
    setCycles((state) => [...state, cycle])
  }

  const getActiveCycleId = (id: string) => {
    setActiveCycleId(id)
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
        getCycles,
        getActiveCycleId,
        markCycleAsFinishedAsFinished,
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
