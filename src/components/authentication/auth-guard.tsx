import type {FC, ReactNode} from "react";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {useAuth} from "../../hooks/use-auth";

interface AuthGuardProps {
    children: ReactNode;
}

export const AuthGuard : FC<AuthGuardProps> = (props) => {
    const { children } = props;

    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(()=> {
        if(!router.isReady){
            return ;
        }

        if(!auth.isAuthenticated){
            router.push({
                pathname:'/authentication/login',
                query: {returnUrl: router.asPath}
            })
        }else {
            setChecked(true);
        }
    },[router.isReady])

    if(!checked){
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}