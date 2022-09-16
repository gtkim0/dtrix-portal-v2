import React, {useEffect} from 'react';
import type {FC} from 'react';
import {Box, Drawer, Typography} from "@mui/material";
import {isRootSize} from "../../utils/is-root";
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import WebIcon from '@mui/icons-material/Web';
import Menu from '../../components/menu/index';
import {data1} from '../../data';
import SplitPane from 'react-split-pane';
import {headerSize} from "../../utils/is-root";

interface ISideLayoutProps {

}

const SideLayout: FC<ISideLayoutProps> = (props) => {

    const styles:any = {
        background: "#000",
        width: "2px",
        cursor: "col-resize",
        margin: "0 5px",
        height: "100%",

      };

    useEffect(() => {
        //TODO 유저가 로그인할때 가지고있는 메뉴아이디와 , 메뉴리스트를 필터링하여 보여줌

    }, [])

    return (
        <>
                <Drawer
                    sx={{background: '#0b0b45', top: headerSize()}}
                    anchor={"left"}
                    open
                    PaperProps={{
                        sx: {
                            backgroundColor: 'navy', // 1200 이상 sidebar
                            // backgroundColor: 'white', // 1200 이상 sidebar

                            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                            color: 'black',
                            width: isRootSize(),
                            top: '60px',
                        }
                    }}
                    variant="permanent"
                >
                    <Box
                        className={"sideBox"}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            padding:'20px 10px'
                        }}
                    >
                        <Menu menuData={data1} />
                    </Box>
                </Drawer>
        </>
    )
}

export default SideLayout;