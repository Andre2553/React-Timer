import { createContext, useReducer, useState } from "react";

interface CreateCycleData {
  task: string;
  minutes: number;
}
interface Cycle {
  id: string;
  task: string;
  minutes: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}
interface CycleContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}
interface CycleStatus{
  cycles: Cycle[];
  activeCycleId: string | null;
}
export const CycleContext = createContext({} as CycleContextType);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cyclesState, dispatch] = useReducer((state: CycleStatus, action: any) => {
    switch (action.type) {
      case "CREATE_CYCLE":
        return{ 
          ...state,
          cycles: [...state.cycles, action.payload.newCylcle],
          activeCycleId: action.payload.newCylcle.id,
        } 
      case "INTERRUPT_CURRENT_CYCLE":
        return{ 
          ...state,
          cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                interruptedDate: new Date(),
              }
            } else {
              return cycle;
            }
            
          }),
          activeCycleId: null,
        } 
      case "MARK_CURRENT_CYCLE_AS_FINISHED":
        return {
          ...state,
          cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            } else {
              return cycle;
            }
            
          }),
          activeCycleId: null,
        }
      default:
        return state;
    }
    
    
  }, {
    cycles: [],
    activeCycleId: null,
  },);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const {cycles, activeCycleId} = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }
  function markCurrentCycleAsFinished() {
     dispatch({ type: "MARK_CURRENT_CYCLE_AS_FINISHED", payload: activeCycleId });
  }

  function createNewCycle(data: CreateCycleData) {
    const id = new Date().getTime().toString();
    const newCylcle: Cycle = {
      id,
      task: data.task,
      minutes: data.minutes,
      startDate: new Date(),
    };

    dispatch({
      type: "CREATE_NEW_CYCLE",
      payload: {
        newCylcle,
      },
    });
    
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {

    dispatch({
      type: "INTERRUPT_CURRENT_CYCLE",
      payload: {
        activeCycleId,
      },
    });

  }
  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}
