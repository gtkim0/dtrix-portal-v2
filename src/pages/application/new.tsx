import React, {useEffect} from 'react';
import {NextPage} from 'next';
import Layout from "../../components/Layout/layout";
import Head from "next/head";
import {Box, Container} from "@mui/material";
import SiteCreateForm from "../../components/sites/site-create-form";
import {useRouter} from "next/router";
import ApplicationCreateForm from "../../components/application/application-create-form";

const ApplicationCreate: NextPage = () => {

    const router = useRouter();
    return (
        <>
            <Head>
                <title>
                    어플리케이션 추가
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
                    <ApplicationCreateForm />
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
ApplicationCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default ApplicationCreate;