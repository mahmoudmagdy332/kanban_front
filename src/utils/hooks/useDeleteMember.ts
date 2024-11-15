import { useCallback, useState } from "react";
import { getAPI } from "../api";
import { useDispatch } from "react-redux";
import { deleteMember } from "../slicers/MemberSlice";

const useDeleteMember = (end_point,type) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState();
    const dispatch=useDispatch();
    const makeDelete = useCallback(async (id:number) => {
       
        setIsLoading(true);
        setError(null);
        dispatch(deleteMember({id,type}))
        getAPI(`${end_point}/${id}`).then((response)=>{
            setData(response.data.data)
            setIsLoading(false);
         }).catch((error)=>{
          setError(error)
          setIsLoading(false);
         })

        setIsLoading(false);
      }, []);
    
       

     return { data, isLoading, error,makeDelete};
}

export default useDeleteMember