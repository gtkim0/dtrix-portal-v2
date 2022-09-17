import React, {useEffect} from 'react';
import {NextPage} from 'next';
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import SiteCreateForm from "../../components/sites/site-create-form";
import {useRouter} from "next/router";

const PageCreate: NextPage = () => {

    const router = useRouter();
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
                    <SiteCreateForm />
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
PageCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default PageCreate;