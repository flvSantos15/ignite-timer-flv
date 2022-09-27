import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  // eslint-disable-next-line prettier/prettier
  useState
} from 'react'
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles'

interface createCycleData {
  task: string
  minutesAmount: number
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
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycles) => cycles.id === activeCycleId)

  const markCycleAsFinishedAsFinished = () => {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        data: activeCycleId,
      },
    })
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
      type: ActionTypes.ADD_NEW_CYCLE,
      payload: {
        newCycle,
      },
    })

    setAmountSecondsPassed(0)
  }

  const interruptCurrentCycle = () => {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId,
      },
    })
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
