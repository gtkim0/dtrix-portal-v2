import React, {useEffect} from 'react';
import {NextPage} from 'next';
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import GroupCreateForm from "../../components/group/group-create-form";

const GroupCreate: NextPage = () => {

    return (
        <>
            <Head>
                <title>
                    사이트 관리
                </title>
            </Head>
            <Box
                component={"main"}
                sx={{
                    flexGrow:1,
                    py:2
                }}
            >
                <Container maxWidth={"lg"}>
                    <GroupCreateForm />
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
GroupCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default GroupCreate;