// DraggableCard.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { card } from '../types/type';
import useDeleteMember from '../utils/hooks/useDeleteMember';
import { useDispatch } from 'react-redux';
import { setMember } from '../utils/slicers/MemberSlice';

const DraggableCard = ({card}:{card:card}) => {
  const dispatch=useDispatch();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: card.id ,status:card.status},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const {makeDelete}=useDeleteMember('deleteMember',card.status);
  const deleteMember=(id:number)=>{
    makeDelete(id);
  }
  
  const setEditMember=(card:card)=>{
    dispatch(setMember(card))
  }
  return (
    <div
      ref={drag}
      style={{

        backgroundColor: isDragging ? '#e0e0e0' : '#fff',
 
      }}

      className='bg-white text-black rounded-md p-2 '
    >
     <div className='flex flex-col gap-2'>
                 <div className='flex items-end justify-between'>
                      <h4 className='text-lg  font-semibold'>{card.title}</h4>
                      <p className='text-gray-500 text-sm'>{card.age} yo</p>
                 </div>
                 <div className='text-gray-600'>{card.email}</div>
                 <div className='flex justify-between'>
                 <div className='text-gray-400'>{card.mobile}</div>
                 <div className='flex gap-1'>
                 <div className='text-blue-500 underline cursor-pointer' onClick={()=>setEditMember(card)}>Edit</div>
                 <div className='text-red-500 underline cursor-pointer' onClick={()=>deleteMember(card.id)}>Delete</div>
                 </div>
                 </div>
             </div>
    </div>
  );
};

export default DraggableCard;
