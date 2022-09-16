import { NextPage } from 'next';
import Head from "next/head";
import React, { ReactElement, ReactNode } from 'react';
import Layout from '../../components/Layout/layout';
import {Select, Box, Container,Grid, Card, CardHeader, Divider, CardContent, FormControl, InputLabel, MenuItem  } from '@mui/material';
import { Form } from 'formik';

// TODO  사이트 관리자가 상세 메뉴를 설정하는 부분? 
// 예를들어 board, dashboard 같은거는 전체 시스템 관리자가 만들었다고 치고, 
// board 밑에 어떤 팀인지 등의 메뉴는 설정해줘야 함?
// 여기서는 그룹정보? 같은게 필요함?

// 메뉴에 생성하지만, 삭제도 가능해야한데, 폼을 어떻게 만들지

const MenuControl = () => {

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
                    py:3,
                    px:3
                }}
            >
                <Container maxWidth="xl">
                    <form>
                        <Card>
                            <CardHeader title="메뉴 관리" />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel>사이트</InputLabel>
                                            <Select id="select" >
                                                <MenuItem>영업팀</MenuItem>
                                                <MenuItem>자재팀</MenuItem>
                                                <MenuItem>개발팀</MenuItem>
                                                <MenuItem>인사팀</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </Container>
            </Box>
        </>
    )
}

MenuControl.getLayout = (page:ReactElement):ReactNode => (
    <Layout>
        {page}
    </Layout>
)

export default MenuControl;