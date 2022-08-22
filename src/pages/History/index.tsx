import { formatDistanceToNow } from "date-fns/esm";
import { useContext } from "react";
import { CycleContext } from "../../contexts/CycleContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  const {cycles} = useContext(CycleContext);
  return (
<HistoryContainer>
  <h1>My Task History</h1>
  <HistoryList>
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Duration</th>
          <th>Started at</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {cycles.map(cycle => {
          return (
            <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>{cycle.minutes} minutes</td>
              <td>{formatDistanceToNow(new Date(cycle.startDate), {
                addSuffix: true
              })}</td>
              <td>
                {cycle.finishedDate && (
                  <Status statusColor="green" >Done</Status>
                )}
                {cycle.interruptedDate && (
                  <Status statusColor="red" >Interrupted</Status>
                )}
                {!cycle.finishedDate && !cycle.interruptedDate && (
                  <Status statusColor="yellow" >Running</Status>
                )}
              </td>
              
            </tr>
          );
        })}
      </tbody>
    </table>
  </HistoryList>
</HistoryContainer>
  )
}