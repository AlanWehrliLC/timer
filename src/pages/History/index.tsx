import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
    const {cycles} = useContext(CycleContext)

    return (
        <HistoryContainer>
            <h1>History</h1>
            
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {cycles.map(cycle=>{
                            return (
                                <tr key={cycle.id}>
                                    <td>{cycle.task}</td>
                                    <td>{cycle.minutesAmount} minutes</td>
                                    <td>{formatDistanceToNow(cycle.startDate, {addSuffix: true}) /*About 2 days ago*/}</td>
                                    <td>
                                        {cycle.finishedDate && (
                                            <Status statusColor="green" >Concluded</Status>
                                        )}

                                        {cycle.interruptedDate && (
                                            <Status statusColor="red" >Interrupted</Status>
                                        )}

                                        {(!cycle.interruptedDate && !cycle.finishedDate) && (
                                            <Status statusColor="yellow" >In progress</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}