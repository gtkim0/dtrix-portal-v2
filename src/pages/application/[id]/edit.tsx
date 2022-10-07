import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout/layout";
import Head from "next/head";
import { Box, Chip, Container, Link, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {getInitials} from "../../../utils/get-initials";
import {Site} from "../../../types/site";
import SiteEditForm from "../../../components/sites/site-edit-form";

import {Application} from "../../../types/application";
import {applicationApi} from "../../../apis/application-api";
import ApplicationEditForm from "../../../components/application/application-edit-form";



const ApplicationEdit :NextPage = () => {
    const router = useRouter();
    const [param,setParam] = useState<any>('');
    const [application,setApplication] = useState<Application | null>(null);

    const getApplication = useCallback(async ()=> {
        try {
            // const result = await applicationApi.getApplication(param);
            const result = await applicationApi.getApplication(router.query.id);
            if(result.message === "Success"){
                setApplication(result.data);
            }else{
                console.error("getApplication error")
            }
        }catch (err){
            console.error(err);
        }
    },[])

    useEffect(()=> {
        getApplication();
    },[])

    if(!application){
        return null;
    }

    return (
        <>
            <Head>
                <title>
                    사용자관리 - 경찰청 순찰차 캠
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    backgroundColor: 'background.default',
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="md">
                    <Box sx={{mb: 4}}>
                        <NextLink
                            href="/application"
                            passHref
                        >
                            <Link
                                color="textPrimary"
                                component="a"
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}
                            >
                                <ArrowBackIcon
                                    fontSize="small"
                                    sx={{mr: 1}}
                                />
                                <Typography variant="subtitle2">
                                    Application
                                </Typography>
                            </Link>
                        </NextLink>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            overflow: 'hidden'
                        }}
                    >
                        <div>
                            <Typography
                                noWrap
                                variant="h4"
                            >
                                {application.applicationName}
                            </Typography>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <Typography variant="subtitle2">
                                    application_id:
                                </Typography>
                                <Chip
                                    label={application.applicationId}
                                    size="small"
                                    sx={{ml: 1}}
                                />
                            </Box>
                        </div>
                    </Box>
                    <Box mt={3}>
                        <ApplicationEditForm application={application}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
ApplicationEdit.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default ApplicationEdit;