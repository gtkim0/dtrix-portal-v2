import React, {useEffect} from 'react';
import type {FC} from 'react';
import {Box, Drawer} from "@mui/material";
import {isRootSize} from "../../utils/is-root";
import Menu from '../../components/menu/index';
import {data1} from '../../data';
import {headerSize} from "../../utils/is-root";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchMenu } from '../../store/slice/menuSlice';

interface ISideLayoutProps {

}

const SideLayout: FC<ISideLayoutProps> = (props) => {
    const dispatch = useDispatch();
    const refresh = useSelector((state:RootState)=> state.menu.menuCreateState);
    const sideMenuList = useSelector((state:RootState)=>state.menu.menuList);

    const styles:any = {
        background: "#000",
        width: "2px",
        cursor: "col-resize",
        margin: "0 5px",
        height: "100%",
    };

    useEffect(() => {
        dispatch(fetchMenu());
    }, [refresh])

    return (
        <>
                <Drawer
                    sx={{background: '#0b0b45', top: headerSize()}}
                    anchor={"left"}
                    open
                    PaperProps={{
                        sx: {
                            backgroundColor: '#2e313d', // 1200 이상 sidebar
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
                            padding:'20px 20px'
                        }}
                    >
                        {/* TODO 임시데이터 교체작업 */}
                        {/* <Menu menuData={data1} /> */}
                        <Menu menuData={sideMenuList} />

                    </Box>
                </Drawer>
        </>
    )
}

export default SideLayout;