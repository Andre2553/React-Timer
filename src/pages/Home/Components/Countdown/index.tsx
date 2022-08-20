import { differenceInSeconds } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { CycleContext } from "../../../../contexts/CycleContext";

import { CountdownContainer, Separator } from "./styles";



export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed} = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutes * 60 : 0;

  const currentSeconds = activeCycle
  ? activeCycle.minutes * 60 - amountSecondsPassed
  : 0;
const minutesAmount = Math.floor(currentSeconds / 60);
const secondsAmount = currentSeconds % 60;

const minutes = String(minutesAmount).padStart(2, "0");
const seconds = String(secondsAmount).padStart(2, "0");

useEffect(() => {
  if (activeCycle) {
    document.title = `${minutes}:${seconds}`;
  }
}, [minutes, seconds, activeCycle]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const differSec = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );
        if (differSec >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(differSec);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished,setSecondsPassed]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
