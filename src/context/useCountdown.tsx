/* eslint-disable prettier/prettier */
import { differenceInSeconds } from "date-fns";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";

interface createCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCycleAsFinishedAsFinished: () => void;
  createNewCycle: (cycle: createCycleData) => void;
  interruptCurrentCycle: () => void;
  getAmountSecondsPassed: (seconds: number) => void;
}

interface CyclesProviderData {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextData);

export const CyclesProvider = ({ children }: CyclesProviderData) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        "@ignite-timer:cycles-state-1.0.0"
      );

      if (storedStateAsJSON && storedStateAsJSON != null) {
        return JSON.parse(storedStateAsJSON);
      } else {
        return {
          cycles: [],
          activeCycleId: null,
        };
      }
    }
  );

  const { cycles, activeCycleId } = cyclesState;

  const activeCycle = cycles?.find((cycles) => cycles?.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    // esse foi um exemplo de otimização
    // na aula teve um problema de demora pra setar o segundos vindo do storage
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle?.startDate));
    }

    return 0;
  });

  const markCycleAsFinishedAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction());
  };

  const getAmountSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds);
  };

  const createNewCycle = (data: createCycleData) => {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  };

  const interruptCurrentCycle = () => {
    dispatch(interruptCurrentCycleAction());
  };

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);

    localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
  }, [cyclesState]);

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
  );
};

export const useCycles = () => {
  const cyclesContext = useContext(CyclesContext);
  return cyclesContext;
};
