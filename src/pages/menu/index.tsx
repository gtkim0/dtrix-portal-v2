import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { NextPage } from 'next';
import Head from "next/head";
import Layout from '../../components/Layout/layout';
import { Box, Container,Grid,Typography, Divider, Card, Button} from '@mui/material';
import MenuListTable from '../../components/menuControl/menu-list';
import MenuAddModal from '../../components/menuControl/modal/menuAddModal';
import { useDispatch } from 'react-redux';
import { getSidePrivilegeMenus } from '../../store/slice/menuSlice';

const MenuControl:NextPage = () => {
    const dispatch = useDispatch();
    const [addMenuModalOpen, setAddMenuModalOpen] = useState(false);

    const handleAddModalOpen = () => {
        setAddMenuModalOpen(true);
    }

    const handleAddModalClose = () => {
        setAddMenuModalOpen(false);
    }

    useEffect(()=> {
        dispatch(getSidePrivilegeMenus());
    },[])

    return (
        <>
            <Head>
                <title>
                    메뉴관리
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:2,
                    px:3
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{mb:4}}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography variant={"h5"}>
                                    메뉴 관리
                                </Typography>
                            </Grid>
                            <Grid item>
                                
                                <Button
                                    onClick={handleAddModalOpen}
                                    variant="contained"
                                >
                                    추가
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <Divider />
                        <Box
                            sx={{
                                alignItems:'center',
                                display:'flex',
                                
                            }}
                        >
                        </Box>
                        <MenuListTable />
                    </Card>
                </Container>
            </Box>
            <MenuAddModal open={addMenuModalOpen} handleClose={handleAddModalClose} />
        </>
    )
}


// @ts-ignore
MenuControl.getLayout = (page:ReactElement):ReactNode => (
    <Layout>
        {page}
    </Layout>
)

export default MenuControl;