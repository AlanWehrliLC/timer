import { HistoryContainer, HistoryList } from "./styles";

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
                            <td>Concluded</td>
                        </tr>

                        <tr>
                            <td>Im Here</td>
                            <td>60 minutes</td>
                            <td>About 1 days ago</td>
                            <td>In progress</td>
                        </tr>
                        
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}