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
                        placeholder="Give your project a name" 
                    />

                    <label htmlFor="minutesAmount">during</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00" 
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