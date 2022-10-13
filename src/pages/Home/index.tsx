import { 
    CountdownContainer, 
    FormContainer, 
    HomeContainer, 
    MinutesAmountInput, 
    Separator, 
    StartCountdownContainer, 
    TaskInput 
} from "./styles"
import {Play} from "phosphor-react"

export function Home(){
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="task">I will work on</label>
                    <TaskInput 
                        type="text" 
                        id="task" 
                        list="task-suggestions"
                        placeholder="Give your project a name" 
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
                    />

                    <span>minutes.</span>
                </FormContainer>


            <CountdownContainer>
                <span>0</span>
                <span>0</span>
                <Separator>:</Separator>
                <span>0</span>
                <span>0</span>
            </CountdownContainer>

            <StartCountdownContainer type="submit" >
                <Play size={24} />
                Start
            </StartCountdownContainer>

            </form>
        </HomeContainer>
    )
}