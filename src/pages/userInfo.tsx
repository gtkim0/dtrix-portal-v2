import React, { ReactElement, ReactNode } from 'react';
import Layout from '../components/Layout/layout';
import {useRouter} from 'next/router';
import { useAuth } from '../hooks/use-auth';
import { Box, Container, Grid, Typography, Divider, Card, CardHeader } from '@mui/material';
import {PropertyList} from "../../src/components/property-list";
import {PropertyListItem} from "../../src/components/property-list-item";


const UserInfo = () => {
    const router = useRouter();
    const user = useAuth();

    const userDeatil = user.user;
    

    // TODO 현재 API 통신 문제로 userinfo 에 어떤값 들어있는지모름.
    // 추후에 받아서 넣어줄것.
    if(!userDeatil){
        return (
            <h1>유저정보 x</h1>
        )
        // return null;
    }

    return (
        <>
            <Box 
                component="main"
                sx={{
                    flexGrow:1,
                    py:3,
                    px:12
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{mt:3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardHeader title="유저 상세정보" />
                                    <Divider />
                                    <PropertyList>
                                        <PropertyListItem
                                            align={'vertical'}
                                            divider
                                            label="아이디"
                                            value={"rla"}
                                        />
                                        <PropertyListItem
                                            align={'vertical'}
                                            divider
                                            label="이름"
                                            value={"rla"}
                                        />
                                        <PropertyListItem
                                            align={'vertical'}
                                            divider
                                            label="domain"
                                            value={"rla"}
                                        />
                                        <PropertyListItem
                                            align={'vertical'}
                                            divider
                                            label="활성화"
                                            value={"Y"}
                                        />
                                        <PropertyListItem
                                            align={'vertical'}
                                            divider
                                            label="기본값"
                                            value={"Y"}
                                        />
                                </PropertyList>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>                    
            </Box>
        </>
    )
}

UserInfo.getLayout = (page:ReactElement):ReactNode => (
    <Layout>
        {page}
    </Layout>
)
export default UserInfo;