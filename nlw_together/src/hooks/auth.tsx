import React, 
{
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";

import * as AuthSession from 'expo-auth-session'

import {
    SCOPE,
    CLIENT_ID,
    CDN_IMAGE,
    REDIRECT_URI,
    RESPONSE_TYPE
} from '../configs'
import { api } from "../services/api";


type User = {
    id: string;
    username: string;
    firstName: string;
    avatar: string;
    email: string;
    token: string;
}


type AuthcontextData = {
    user: User;
    loading: boolean;
    signIn: () => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode; 
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
    params: {
        access_token: string;
    }
}

export const AuthContext = createContext({} as AuthcontextData);

function AuthProvider({ children } : AuthProviderProps){
    const [user, setUser] = useState<User>({} as User);
    const [loading, setLoading] = useState(false);


    async function signIn(){
        try {
            setLoading(true);

            const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
            
            const { type, params } = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;
            
            if (type === "success"){
                api.defaults.headers.authorization = `Bearer ${params.access_token}`;
                
                const userInfo = await api.get('/user/@me');
                console.log(userInfo);

                setLoading(false);
            }

        } catch {
            throw new Error ('Não foi possivel autenticar')
        }
    }
    
    return(
        <AuthContext.Provider value={{
            user,
            loading,
            signIn
        }}>
            { children }
        </AuthContext.Provider>
    )

}

function userAuth(){
    const context = useContext(AuthContext);
    return context;
}

export {
    AuthProvider,
    userAuth
}

