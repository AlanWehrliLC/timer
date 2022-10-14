import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
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

                        <tr>
                            <td>Feed</td>
                            <td>60 minutes</td>
                            <td>About 2 days ago</td>
                            <td>
                                <Status statusColor="green" >
                                    Concluded
                                </Status>
                            </td>
                        </tr>

                        <tr>
                            <td>Im Here</td>
                            <td>60 minutes</td>
                            <td>About 1 days ago</td>
                            <td>
                                <Status statusColor="yellow" >
                                    In progress
                                </Status>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}