import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { CycleContext } from "../../../../contexts/CyclesContext"
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"


export function NewCycleForm(){
    const { activeCycle } = useContext(CycleContext)
    const { register } = useFormContext()

    return (
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
    )
}