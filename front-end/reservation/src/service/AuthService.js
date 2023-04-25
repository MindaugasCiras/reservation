import axios from "axios";
import {client} from "../config/axios"

export const registerUser = async (registerRequest) =>{
    return await client.post('/auth/register', registerRequest);
}
export const loginUser = async (loginRequest) =>{
   return await client.post('/auth/log-in', loginRequest);
}