import React, {useEffect} from 'react';
import type {FC} from 'react';
import {Box, Drawer, Typography} from "@mui/material";
import {isRootSize} from "../../utils/is-root";
import Link from 'next/link';
import PeopleIcon from '@mui/icons-material/People';
import WebIcon from '@mui/icons-material/Web';
import Menu from '../../components/menu/index';
import {data1} from '../../data';

interface ISideLayoutProps {

}

const SideLayout: FC<ISideLayoutProps> = (props) => {

    // 관리자 권한이면
    const menuList = [
        {
            id: 1,
            name: '사이트',
            link: '/sites'
        },
        {
            id: 2,
            name: '유저리스트',
            link: '/users'
        },
        {
            id: 3,
            name: '보드',
            link : '/board'
        },
        {
            id:4,
            name: '대시보드',
            link : '/dashboard'
        },
        {
            id:5,
            name:'ELTA',
            link:'/elta'
        }
    ]



    useEffect(() => {
        // 유저가 로그인할때 가지고있는 메뉴아이디와 , 메뉴리스트를 필터링하여 보여줌

    }, [])

    return (
        <>
            <Drawer
                sx={{background: '#0b0b45', top: '60px'}}
                anchor={"left"}
                open
                PaperProps={{
                    sx: {
                        backgroundColor: '#0b0b45', // 1200 이상 sidebar
                        // backgroundColor: 'white', // 1200 이상 sidebar

                        borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
                        color: '#FFFFFF',
                        width: isRootSize(),
                        top: '60px'
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
                        padding:'0 10px'
                    }}
                >
                    <Menu menuData={data1} />
                    {/*<div>*/}
                    {/*    {*/}
                    {/*        menuList.map((menu) => (*/}
                    {/*            <Link key={menu.id} href={menu.link}>*/}
                    {/*                <Box sx={{p: 2, m: 2, cursor: 'pointer', display: 'flex', alignItems: 'center'}}>*/}
                    {/*                    <PeopleIcon>*/}
                    {/*                    </PeopleIcon>*/}
                    {/*                    <Typography sx={{padding: '5px'}}>*/}
                    {/*                        {menu.name}*/}
                    {/*                    </Typography>*/}
                    {/*                </Box>*/}
                    {/*            </Link>*/}
                    {/*        ))*/}
                    {/*    }*/}
                    {/*</div>*/}
                </Box>
            </Drawer>
        </>
    )
}

export default SideLayout;