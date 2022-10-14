import { HandPalm, Play } from "phosphor-react"
import { createContext, useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod"


import { 
    HomeContainer,
    StartCountdownContainer, 
    StopCountdownContainer,
} from "./styles"

import { NewCycleForm } from "./components/NewCycleForm"
import { Countdown } from "./components/Countdown"


interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CycleContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    handleInterruptCycle: () => void
    setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextType)

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Report the task"),
    minutesAmount: zod
        .number()
        .min(5, "The cycle must be at least 60 minutes!")
        .max(60, "The cycle needs to be a maximum of 60 minutes!"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

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

    function handleCreateNewCycle(data: NewCycleFormData){
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

        reset()
    }

    function handleInterruptCycle(){

        setCycles(oldState => oldState.map(state => {
                if (state.id === activeCycleId) {
                    return {...state, interruptedDate: new Date()}
                }else{
                    return state
                }
            })
        )

        setActiveCycleId(null)
    }

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

            <CycleContext.Provider value={{
                activeCycle, 
                activeCycleId, 
                amountSecondsPassed,
                markCurrentCycleAsFinished,
                handleInterruptCycle,
                setSecondsPassed
                }}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
            </CycleContext.Provider>

            {activeCycle ? (
                <StopCountdownContainer onClick={handleInterruptCycle} type="button" >
                    <HandPalm size={24} />
                    Stop
                </StopCountdownContainer>
            ) : (
                <StartCountdownContainer disabled={isSubmitDisabled} type="submit" >
                    <Play size={24} />
                    Start
                </StartCountdownContainer>
            )}

            </form>
        </HomeContainer>
    )
}