import React from 'react';
import {Logout} from "@mui/icons-material";
import {Box} from "@mui/material";
import {authApi} from "../apis/auth-api";
import {useAuth} from "../hooks/use-auth";
import {useRouter} from "next/router";
import toast from "react-hot-toast";

const LogoutComponent = () => {

    const {logout} = useAuth();
    const router = useRouter();

    const handleLogout = async ():Promise<void> => {
        try {
            await logout();
            router.push("/");
        }catch (err:any){
            toast.error(err);
            console.error(err);
        }
    }

    return (
        <>
            <Box onClick={handleLogout} pr={"20px"} >
                <Logout />
            </Box>
        </>
    )
}
export default LogoutComponent;