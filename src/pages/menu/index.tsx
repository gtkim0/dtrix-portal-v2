import React, { ReactElement, ReactNode, useState } from 'react';
import { NextPage } from 'next';
import Head from "next/head";
import Layout from '../../components/Layout/layout';
import { Box, Container,Grid,Typography, Divider, Card, Button} from '@mui/material';
import { Form } from 'formik';
import MenuListTable from '../../components/menuControl/menu-list';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import MenuAddModal from '../../components/menuControl/modal/menuAddModal';


// TODO  사이트 관리자가 상세 메뉴를 설정하는 부분? 
// 예를들어 board, dashboard 같은거는 전체 시스템 관리자가 만들었다고 치고, 
// board 밑에 어떤 팀인지 등의 메뉴는 설정해줘야 함?
// 여기서는 그룹정보? 같은게 필요함?

// 메뉴에 생성하지만, 삭제도 가능해야한데, 폼을 어떻게 만들지

const MenuControl:NextPage = () => {
    const [addMenuModalOpen, setAddMenuModalOpen] = useState(false);

    const handleAddModalOpen = () => {
        setAddMenuModalOpen(true);
    }

    const handleAddModalClose = () => {
        setAddMenuModalOpen(false);
    }

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