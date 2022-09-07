import React from 'react';
import type { FC } from 'react';
import {AppBar} from "@mui/material";
import CoLogo from '../cologo';
import LogoutComponent from "../logout";

interface ITopLayoutProps {

}

const TopLayout:FC<ITopLayoutProps> = () => {
    return (
        <>
            <AppBar
                sx={{
                    // padding:'0 20px',
                    width:'100%',
                    background:'#0b0b45',
                    height:'60px',
                    display:"flex",
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'

                }}
            >
                    <CoLogo />
                    <LogoutComponent />
            </AppBar>
        </>
    )
}

export default TopLayout;