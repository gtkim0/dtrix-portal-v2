import React from 'react';
import type { FC } from 'react';
import {AppBar, Box} from "@mui/material";
import CoLogo from '../cologo';
import UserInfoComponent from "../userInfoComponent";
import {headerSize} from "../../utils/is-root";
import {isRootSize} from "../../utils/is-root";
interface ITopLayoutProps {

}

const TopLayout:FC<ITopLayoutProps> = () => {
    return (
        <>
            <AppBar
                sx={{
                    // padding:'0 20px',
                    width:'100%',
                    background:'navy',
                    height:`${headerSize()}px`,
                    display:"flex",
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    boxShadow:'0 3px 2px -2px blue'
                }}
            >
                    <Box sx={{height:'100%',width:`${isRootSize()}px`,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <CoLogo />
                    </Box>
                    <UserInfoComponent />
            </AppBar>
        </>
    )
}

export default TopLayout;