import { createContext, ReactNode, useState } from "react"

interface CreateCycleData {
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

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
}

interface CycleContextProviderProps {
    children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({children}: CycleContextProviderProps){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished(){
        setCycles(oldState => oldState.map(state => {
            if (state.id === activeCycleId) {
                return {...state, finishedDate: new Date()}
            }else{
                return state
            }
        })
    )
    }
    function createNewCycle(data: CreateCycleData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()

        }

        setCycles((oldState) => [...oldState, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

    }

    function interruptCurrentCycle(){

        setCycles(oldState => oldState.map(state => {
                if (state.id === activeCycleId) {
                    return ({...state, interruptedDate: new Date()})
                }else{
                    return state
                }
            })
        )
        setActiveCycleId(null)
        document.title = `Timer`
    }

    return (
        <CycleContext.Provider value={{
            cycles,
            activeCycle, 
            activeCycleId, 
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
            createNewCycle,
            interruptCurrentCycle
        }}>
            {children}
        </CycleContext.Provider>
    )
}