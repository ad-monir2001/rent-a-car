import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create(
   {
      baseURL: import.meta.env.VITE_API_URL,
      withCredentials: true
   }
)

const useAxiosSecure = () => {
   const navigate  = useNavigate()
   const {logOut} = useContext(AuthContext)
   useEffect(()=> {
      axiosSecure.interceptors.response.use(
         res=> {
            return res
         },
         async error => {
            console.log(error.response);
            if(error.response.status === 401 || error.response.status === 403){
               logOut()
               navigate('/login')
            }
         }
      )
   },[logOut, navigate])
   return axiosSecure
}

export default useAxiosSecure