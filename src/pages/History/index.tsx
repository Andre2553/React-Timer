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
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <Status statusColor="green" >Done</Status>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <Status statusColor="green" >Done</Status>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <Status statusColor="green" >Done</Status>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <Status statusColor="green" >Done</Status>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <Status statusColor="green" >Done</Status>
        </tr>
      </tbody>
    </table>
  </HistoryList>
</HistoryContainer>
  )
}