import React, { useEffect } from "react";
import { createLocalStorage } from "../../utils/persistance/localStorage";
import { createReducerContext } from "../../utils/state/createReducerContext";
import { AuthTypes } from "./types";
import { getCurrentUser } from "../../services/api/auth/getCurrentUser";
import { useQuery } from "@tanstack/react-query";


type AuthAction = {
    type: 'SET_USER';
    payload: {
        user: AuthTypes.User;
        token: string;
    };
} | {
    type: 'LOGOUT';
}

export const authStorage = createLocalStorage<AuthTypes.AuthState>('auth')

const initialState = {
    user: authStorage.get()?.user,
    token: authStorage.get()?.token
}


function reducer(state: AuthTypes.AuthState, action: AuthAction): AuthTypes.AuthState {
    switch (action.type) {
        case 'SET_USER':
            authStorage.set({ ...state, user: action.payload.user, token: action.payload.token });  
            return { ...state, user: action.payload.user, token: action.payload.token };
        case 'LOGOUT':
            authStorage.remove();
            return { ...state, user: null, token: null };
    }
}

const {useContext, Provider} = createReducerContext(initialState, reducer, 'AuthContext');

export const useAuthContext = useContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const shouldRedirect = !['/login', '/logout'].includes(window.location.pathname);

    const query = useQuery({
        queryKey: ['auth'],
        queryFn: getCurrentUser,
        retry: false,
        enabled: shouldRedirect
    })

    const [, dispatch] = useAuthContext();

    useEffect(() => {
        if(query.isError && shouldRedirect){
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login';
        }
    }, [query.isError]);


    return <Provider>{children}</Provider>
}