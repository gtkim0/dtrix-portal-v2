import {createContext, useEffect, useReducer} from "react";
import PropTypes from 'prop-types';
import type {FC, ReactNode} from 'react';
import type {User} from '../types/user';
// import {initialize} from "next/client";
import {authApi} from "../apis/auth-api";
import {redirect} from "next/dist/server/api-utils";

interface State {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: any;
}

interface AuthContextValue extends State {
    platform: 'JWT';
    login: (userId: string, userPw: string) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

type InitializeAction = {
    type: 'INITIALIZE';
    payload: {
        isAuthenticated: boolean;
        user: User | null;
    };
};

type LoginAction = {
    type: 'LOGIN';
    payload: {
        user: User;
    };
};

type LogoutAction = {
    type: 'LOGOUT';
};


type Action =
    | InitializeAction
    | LoginAction
    | LogoutAction

const initialState: State = {
    isAuthenticated: false,
    isInitialized: false,
    user: null
};

// @ts-ignore
const reducer = (state: State, action: Action): any => {
    switch (action.type){
        case "INITIALIZE": {
            let {isAuthenticated, user} = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialized: true,
                user
            };
        }

        case "LOGIN": {
            let { user } = action.payload;
            return {
                ...state,
                isAuthenticated: true,
                user
            };
        }
        case "LOGOUT":
            return {
                ...state,
                isAuthenticated:false,
                user:null
            };

        default :
            return initialState;
    }
}
export const AuthContext = createContext<AuthContextValue>({
    ...initialState,
    platform: 'JWT',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
});

export const AuthProvider:FC<AuthProviderProps> = (props) => {

    const {children} = props;
    const [state,dispatch] = useReducer(reducer,initialState)

    const login = async (username:string,password:string):Promise<void> => {
        const result:any = await authApi.login(username,password);
        // console.log("result",result);
        const token = result.token;
        const domain = result.domain;
        localStorage.setItem('accessToken',token);
        // me error 나서 임시 주석, dummyData 로 우선 진행
        const resultUser = await authApi.me();
        const user = resultUser.data;

        dispatch({
            type:'LOGIN',
            payload: {
                user
            }
        })
    }
    const logout = async ():Promise<void> => {
        localStorage.removeItem('accessToken');
        dispatch({type:'LOGOUT'})
    }

    useEffect(()=> {

        const initialize = async ():Promise<void> => {
            try{
                const accessToken = window.localStorage.getItem('accessToken');
                if(accessToken){
                    // todo (me 인증오류 임시 주석)
                    const result = await authApi.me();
                    const user = result?.data;
                    dispatch({
                        type:'INITIALIZE',
                        payload: {
                            isAuthenticated:true,
                            user
                        }
                    })
                }else{
                    dispatch({
                        type:'INITIALIZE',
                        payload:{
                            isAuthenticated:false,
                            user:null
                        }
                    })
                }
            }catch (err) {
                console.error(err);
                dispatch({
                    type:'INITIALIZE',
                    payload:{
                        isAuthenticated:false,
                        user:null
                    }
                })
            }
        };
        initialize();
    },[])

    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: 'JWT',
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;