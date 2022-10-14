import { HandPalm, Play } from "phosphor-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as zod from "zod"
import { useEffect, useState } from "react"
import { differenceInSeconds } from "date-fns"

import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownContainer, 
    StopCountdownContainer, 
    TaskInput 
} from "./styles"

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Report the task"),
    minutesAmount: zod
        .number()
        .min(5, "The cycle must be at least 60 minutes!")
        .max(60, "The cycle needs to be a maximum of 60 minutes!"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

export function Home(){
    const [cycles, setCycle] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find(cycle => cycle.id == activeCycleId)
    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(()=>{
        let interval: number

        if(activeCycle){
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    setCycle(oldState => oldState.map(state => {
                            if (state.id === activeCycleId) {
                                return {...state, finishedDate: new Date()}
                            }else{
                                return state
                            }
                        })
                    )

                    setAmountSecondsPassed(totalSeconds)
                    setActiveCycleId(null)
                    
                    clearInterval(interval)
                }else{
                    setAmountSecondsPassed(secondsDifference)
                }
                
            }, 1000)
        }

        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId])

    function handleCreateNewCycle(data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()

        }

        setCycle((oldState) => [...oldState, newCycle])
        setActiveCycleId(id)
        setAmountSecondsPassed(0)

        reset()
    }

    function handleInterruptCycle(){

        setCycle(oldState => oldState.map(state => {
                if (state.id === activeCycleId) {
                    return {...state, interruptedDate: new Date()}
                }else{
                    return state
                }
            })
        )

        setActiveCycleId(null)
    }

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(()=>{
        if (activeCycle) {
            document.title = `${minutes}:${seconds}`
        }
    }, [minutes, seconds, activeCycle])

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">I will work on</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        list="task-suggestions"
                        placeholder="Give your project a name"
                        disabled={!!activeCycle}
                        {...register("task")}
                    />

                    <datalist id="task-suggestions">
                        <option value="feed" />
                        <option value="Im Here" />
                        <option value="Timer" />
                    </datalist> 

                    <label htmlFor="minutesAmount">during</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register("minutesAmount", {valueAsNumber: true,})}
                    />

                    <span>minutes.</span>
                </FormContainer>


            <CountdownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountdownContainer>

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