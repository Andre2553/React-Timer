import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { NewCycleForm } from "./Components/NewCycleForm";
import { Countdown } from "./Components/Countdown";
import { CycleContext } from "../../contexts/CycleContext";



interface NewCycleFormData {
  task: string;
  minutes: number;
}
const newCycleFormValidationScheme = zod.object({
  task: zod.string().min(1, "Give a name to the Task"),
  minutes: zod.number().min(5).max(60),
});


export function Home() {

   const { activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CycleContext);
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationScheme),
    defaultValues: {
      task: "",
      minutes: 5,
    },
  });
  const { handleSubmit, watch, reset } = newCycleForm;
  function handleCreateNewCycle(data: NewCycleFormData){
   createNewCycle(data);
   reset();
  }
  const task = watch("task");
  const isSubmitDisabled = !task.trim();

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>

          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
       
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
