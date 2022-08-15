import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separator } from "./styles";

export function Home() {
   return (
      <HomeContainer>
         <form action="">
            <FormContainer>
               <label htmlFor="task">I am going to work in </label>
               <input id="task" type="text" />

               <label htmlFor="minutesAmount">
                  <input type="number" name="minutesAmount" />
                  <span> minutes.</span>
               </label>
            </FormContainer>

            <CountdownContainer>
               <span>0</span>
               <span>0</span>
               <Separator>:</Separator>
               <span>0</span>
               <span>0</span>
            </CountdownContainer>

            <button type="submit">
               <Play size={24}/>
               Start
            </button>
         </form>
      </HomeContainer>
   )
}