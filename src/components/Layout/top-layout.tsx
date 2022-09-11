import React from 'react';
import type { FC } from 'react';
import {AppBar, Box} from "@mui/material";
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
                    background:'lightgray',
                    height:'60px',
                    display:"flex",
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between'

                }}
            >
                    <Box sx={{height:'100%',width:'240px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <CoLogo />
                    </Box>
                    <LogoutComponent />
            </AppBar>
        </>
    )
}

export default TopLayout;