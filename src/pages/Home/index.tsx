import { HandPalm, Play } from "phosphor-react"
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
import { CycleContext } from "../../contexts/CyclesContext";
import { useContext } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Report the task"),
    minutesAmount: zod
        .number()
        .min(5, "The cycle must be at least 60 minutes!")
        .max(60, "The cycle needs to be a maximum of 60 minutes!"),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const { 
        activeCycle, 
        interruptCurrentCycle,
        createNewCycle
    } = useContext(CycleContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }

    const task = watch("task")
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

            {activeCycle ? (
                <StopCountdownContainer onClick={interruptCurrentCycle} type="button" >
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