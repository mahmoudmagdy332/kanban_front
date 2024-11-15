// DropArea.js
import React from 'react';
import { useDrop } from 'react-dnd';

import { card } from '../types/type';
import DraggableCard from './DraggableCard ';
import useEditStatus from '../utils/hooks/useEditStatus';

const DropArea = ({cards,title,type}:{cards:card[],title:string,type:string}) => {
  const {makeRequest}=useEditStatus();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => {
      
      makeRequest({item,type})
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }),[cards]);

  return (
    <div
      ref={drop}

      className={`w-full   
         ${!isOver?'bg-[#BAD1E0]':'bg-[#cce5ff]'}  border rounded-md  p-2`}
    >
      <div className='flex flex-col gap-3'>
           <div className='flex justify-between gap-1 my-2'>
            <h3 className='text-black font-semibold text-xl'>{title}</h3>
            <div className='rounded-full w-8 h-7 bg-white flex justify-center items-center text-black font-bold'>{cards.length}</div>
           </div>
           <div className='flex flex-col px-1 gap-3 min-h-20 max-h-96 overflow-y-scroll'>
         {cards.map((card)=>(
             <DraggableCard card={card} key={card.id}/>
         ))}
         </div>
     </div>
    </div>
  );
};

export default DropArea;
