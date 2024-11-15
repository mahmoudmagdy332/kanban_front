import axios from "axios";
import { url } from "./config";

const api = axios.create({
    baseURL: url,
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const getAPI = async(end_point:string) => api.get(end_point);