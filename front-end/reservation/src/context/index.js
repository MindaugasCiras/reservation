import { createContext } from "react";

export const AuthenticationContext = createContext({
    authData: {},
    setAuthData: () =>{}
})