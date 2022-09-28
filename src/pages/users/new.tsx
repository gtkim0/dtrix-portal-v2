import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import Layout from "../../components/Layout/layout";
import UserCreateForm from "../../components/users/user-create-form";
import {siteApi} from "../../apis/site-api";
import {siteInfo} from "../../types/site";
import { useAuth } from '../../hooks/use-auth';

const UserCreate: NextPage = () => {
    const user = useAuth();
    const [siteTotalList, setSiteTotalList] = useState<siteInfo[]>([]);
    const getSiteTotalList = useCallback(async () => {
        try {
            const result = await siteApi.getTotalSiteList()
            const {data} = result;
            setSiteTotalList(data);
            // 받은값 setSiteTotalList 에 저장
        } catch (err) {
            console.error(err);
        }

    }, [])

    useEffect(() => {
        getSiteTotalList();
    }, [])

   
    const menu = user.user?.roleId !== 1 ?
    [
        {id:'',value:"전체"},
        {id:'system', value:'사이트 관리자'},
        {id:'user', value:'사용자'}
    ]
     : 
    [
        {id:'',value:"전체"},
        {id:'admin',value:'시스템 관리자'},
        {id:'system',value:'사이트 관리자'},
        {id:'user',value:'사용자'}
    ]

    return (
        <>
            <Head>
                <title>
                    사용자 관리
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6,
                    // background:'lightGray'
                }}
            >
                <Container maxWidth="lg">
                    <UserCreateForm siteTotalList={siteTotalList} menu={menu}/>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
UserCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);

export default UserCreate;