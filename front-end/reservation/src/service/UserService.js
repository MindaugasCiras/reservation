import {client} from "../config/axios"

export const getUsers = async () =>{
    return client.get("/auth/users");
}
export const deleteUser = async (id) =>{
    return client.delete(`/auth/users/${id}`);
}