import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react'

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const markCycleAsFinishedAsFinished = () => {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        data: activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
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

    dispatch({
      type: 'AD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

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
