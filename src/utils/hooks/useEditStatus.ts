import axios from "axios";
import { useCallback, useState } from "react";
import { url } from '../config'
import { useDispatch } from "react-redux";
import { editStatus } from "../slicers/MemberSlice";



const useEditStatus = () => {
    const dispatch=useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState(null);
    const makeRequest = useCallback(async (requestData) => {
      setIsLoading(true);
      setError(null);
      try {
        dispatch(editStatus(requestData))
        const response = await axios.post(`${url}editStatus`, requestData,{
            headers:{
                'Accept':'application/json',
            }});
        setData(response.data);
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

export default useEditStatus