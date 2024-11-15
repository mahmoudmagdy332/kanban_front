import { useEffect } from "react";
import { useFetch } from "./useFetch";
import { setMembers } from "../slicers/MemberSlice";
import { useDispatch } from "react-redux";

const useAllMember = () => {
  const dispatsh=useDispatch();
  const { data,error,isLoading}=useFetch('allMembers');
  useEffect(()=>{
    if(data){
      dispatsh(setMembers(data))
    }
  },[data])
  return {isLoading,error}
}

export default useAllMember