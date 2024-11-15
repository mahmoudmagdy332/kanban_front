import axios from "axios";
import { useCallback, useState } from "react";
import { url } from '../config'


const useAddMemberHook = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(null);
    const makeRequest = useCallback(async (requestData) => {
      setIsLoading(true);
      setError(null);
      try {
        let post='createMember';
        if(requestData.id){
          post=`editMember/${requestData.id}`
        }
        const response = await axios.post(`${url}${post}`, requestData,{
            headers:{
                'Accept':'application/json',
           
            }});
        setData(response.data.data);
        setSuccess(true)
      } catch (err) {
       
        setError(err.response.
          data
          .message);
      }
      setIsLoading(false);
    }, []);
  
    return { makeRequest, data, isLoading, error,success };
}

export default useAddMemberHook