import React from "react";

import AddForm from "./components/AddForm";
import { DndProvider } from  "react-dnd";
import { HTML5Backend } from  "react-dnd-html5-backend";
import DropArea from "./components/DropArea";
import { useAboutUsSliceSelector } from "./utils/slicers/MemberSlice";
import useAllMember from "./utils/hooks/useAllMember";
const  App=()=> {
  const {Unclaimed,FirstContact,PreparingWorkOffer,SendTherapist}=useAboutUsSliceSelector((state)=>state.MemberReducer)
  useAllMember();
  
  return (
    <div className="bg-[#D3E5ED]">
<div className="min-h-screen   p-5 w-10/12 mx-auto">
      <header className="flex  items-center  justify-between text-2xl  mb-8 gap-3">
        <b>Kanban Board</b>
        <AddForm/>
      </header>

      <div className="flex flex-row text-white">

        <DndProvider backend={HTML5Backend}>
          <div className="grid w-full [&>*:first-child]:bg-transparent [&>*:first-child]:border-[#4E94BF] grid-cols-1 md:grid-cols-2 lg:grid-cols-4   gap-4">
        
          
        <DropArea cards={Unclaimed} type="Unclaimed" title="Unclaimed"/>
        <DropArea cards={FirstContact}  type="FirstContact" title="First Contact"/>
        <DropArea cards={PreparingWorkOffer}  type="PreparingWorkOffer" title="Preparing Work Offer"/>
        <DropArea cards={SendTherapist}  type="SendTherapist" title="Send to The rapist"/>
    
        </div> 
          </DndProvider>
      </div>
    </div>
    </div>
    
  );
}

export default App;
