import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'
import { useContext } from "react";
import { CycleContext } from "../../../../contexts/CycleContext";




export function NewCycleForm() {
  const {activeCycle} = useContext(CycleContext)
  const {register} = useFormContext();
  return (
    <FormContainer>
      <label htmlFor="task">I am going to work in </label>
      <TaskInput
        id="task"
        type="text"
        list="tasks-suggestions"
        placeholder="Give a name for your project"
        disabled={!!activeCycle}
        {...register("task")}
      />
      <datalist id="task-suggestion">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="minutesAmount"> for the next</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        step={5}
        max={60}
        min={5}
        disabled={!!activeCycle}
        {...register("minutes", { valueAsNumber: true })}
      />
      <span> minutes.</span>
    </FormContainer>
  );
}