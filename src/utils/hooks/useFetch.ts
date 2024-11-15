import { useEffect, useState } from "react"
import { getAPI } from "../api";


export function useFetch(end_point){
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [data, setData] = useState();
   useEffect(()=>{
         setIsLoading(true);
         setError(null);
         getAPI(end_point).then((response)=>{
               setData(response.data.data)
               setIsLoading(false);
            }).catch((error)=>{
             setError(error)
             setIsLoading(false);
            })
      },[])
   return { data, isLoading, error};
}