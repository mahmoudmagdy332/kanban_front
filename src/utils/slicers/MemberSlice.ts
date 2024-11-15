// languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store"; 

import { MemberSliceType } from "../../types/type";

const initialState: MemberSliceType = {
  Unclaimed: [],
  FirstContact: [],
  PreparingWorkOffer: [],
  SendTherapist: [],
  member:null,
};

const MemberSlice = createSlice({
  name: "AboutUs",
  initialState,
  reducers: {
    setMembers: (state, action) => {
      state.Unclaimed = action.payload.Unclaimed;
      state.FirstContact = action.payload.FirstContact;
      state.PreparingWorkOffer = action.payload.PreparingWorkOffer;
      state.SendTherapist = action.payload.SendTherapist;
    },
    addMember:(state, action) => {
      state.Unclaimed  = [...state.Unclaimed,action.payload];

    },
    editStatus: (state, action) => {
      const { item, type } = action.payload;
    
      if (item.status !== type) {
       
        if (state[item.status]) {
          
          const card = state[item.status].find(member => member.id === item.id);
          if (card) {
            const newItem = { ...card, status: type };
            state[type] = [...(state[type] || []), newItem];

          } else {
            console.error(`Card with id ${item.id} not found in status ${item.status}`);
          }
          state[item.status] = state[item.status].filter(
            member => member.id !== item.id
          );
        } 
      } 
    },
    deleteMember:(state, action) => {
      const { id, type } = action.payload;
      state[type]=state[type].filter((member)=>member.id!==id);
    },
    setMember:(state, action) => {
      state.member = action.payload;
    },
    editMember:(state, action) => {
      
      const array=state[action.payload.status].map((member)=>{
        if(member.id===action.payload.id)
          return action.payload;
        else
          return member;
      })
      state[action.payload.status]=array;
    },
  },
});

export const { setMembers,addMember,editStatus,deleteMember,setMember,editMember } = MemberSlice.actions;

export default MemberSlice.reducer;

export const useAboutUsSliceSelector = useSelector.withTypes<RootState>();
