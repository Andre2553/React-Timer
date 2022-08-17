import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, StopCountdownButton, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationScheme = zod.object({
   task: zod.string().min(1, 'Give a name to the Task'),
   minutes: zod.number().min(5).max(60),
})

interface NewCycleFormData {
   task: string;
   minutes: number;
}
interface Cycle {
   id: string;
   task: string;
   minutes: number;
   startDate: Date;
   interruptedDate?: Date;
   finishedDate?: Date;
}
export function Home() {
   const [cycles, setCycles] = useState<Cycle[]>([]);
   const [activeCycleId, setActiveCyclesId] = useState<string | null>(null);
   const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

   const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationScheme),
      defaultValues: {
         task: '',
         minutes: 5,
      }
   });

   const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

   const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;
   const currentSeconds = activeCycle ? activeCycle.minutes * 60 - amountSecondsPassed : 0;
   const minutesAmount = Math.floor(currentSeconds / 60);
   const secondsAmount = currentSeconds % 60;

   const minutes = String(minutesAmount).padStart(2, '0');
   const seconds = String(secondsAmount).padStart(2, '0');

   useEffect(() => {
      let interval: number;
      if (activeCycle) {
         interval = setInterval(() => {
            const differSec = differenceInSeconds(new Date(), activeCycle.startDate);
            if(differSec >= totalSeconds) {
               setCycles((state) => state.map(cycle => {
                  if (cycle.id === activeCycleId) {
                     return { ...cycle, finishedDate: new Date() }
                  } else {
                     return cycle;
                  }
               }))
               setAmountSecondsPassed(totalSeconds);
               clearInterval(interval);
            } else {
               setAmountSecondsPassed(differSec); 
            }
         }, 1000)
      }
      return () => {
         clearInterval(interval);
      }
   }, [activeCycle,totalSeconds,setActiveCyclesId])

   useEffect(() => {
      if (activeCycle) {
         document.title = `${minutes}:${seconds}`;
      }
   }, [minutes, seconds, activeCycle])
   function handleCreateNewCycle(data: NewCycleFormData) {
      const id = new Date().getTime().toString();
      const newCylcle: Cycle = {
         id,
         task: data.task,
         minutes: data.minutes,
         startDate: new Date()
      }
      setCycles((state) => [...cycles, newCylcle]);
      setActiveCyclesId(id);
      setAmountSecondsPassed(0);
      console.log(data);
      reset();
   }

   function handleInterruptCycle() {
      
      setCycles((state) => state.map(cycle => {
         if (cycle.id === activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
         } else {
            return cycle;
         }
      }))
      setActiveCyclesId(null);
   }

   const task = watch('task');
   const isSubmitDisabled = !task;


   return (
      <HomeContainer>
         <form onSubmit={handleSubmit(handleCreateNewCycle)}>
            <FormContainer>
               <label htmlFor="task">I am going to work in </label>
               <TaskInput
                  id="task"
                  type="text"
                  list="tasks-suggestions"
                  placeholder="Give a name for your project"
                  disabled={!!activeCycle}
                  {...register('task')}
               />
               <datalist id="task-suggestion">
                  <option value="Project 1" />
                  <option value="Project 2" />
                  <option value="Project 3" />
               </datalist>

               <label htmlFor="minutesAmount"> for the next</label>
               <MinutesAmountInput type="number" id="minutesAmount" placeholder="00" step={5} max={60} min={5}
                  disabled={!!activeCycle}
                  {...register('minutes', { valueAsNumber: true })}

               />
               <span> minutes.</span>

            </FormContainer>

            <CountdownContainer>
               <span>{minutes[0]}</span>
               <span>{minutes[1]}</span>
               <Separator>:</Separator>
               <span>{seconds[0]}</span>
               <span>{seconds[1]}</span>
            </CountdownContainer>

            {activeCycle ? (
               <StopCountdownButton onClick={handleInterruptCycle} type="button">
                  <HandPalm size={24} />
                  Stop
               </StopCountdownButton>
            ) :
               <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                  <Play size={24} />
                  Start
               </StartCountdownButton>
            }
         </form>
      </HomeContainer>
   )
}