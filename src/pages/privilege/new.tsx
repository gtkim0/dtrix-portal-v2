import React, {useEffect} from 'react';
import {NextPage} from 'next';
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import GroupCreateForm from "../../components/group/group-create-form";
import PrivilegeCreateForm from "../../components/privilege/privilege-create-form";

const PrivilegeCreate: NextPage = () => {

    return (
        <>
            <Head>
                <title>
                    권한 관리
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
                    <PrivilegeCreateForm />
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
PrivilegeCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default PrivilegeCreate;