import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from 'next';
import {useRouter} from "next/router";
import type { Site } from '../../../types/site';
import {siteApi} from "../../../apis/site-api";
import Head from "next/head";
import Layout from "../../../components/Layout/layout";
import Sites from "../index";
import {Avatar, Box, Button, Chip, Container, Divider, Grid, Link, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {getInitials} from "../../../utils/get-initials";
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import UserBasicDetails from "../../../components/users/user-basic-detail";
import SiteBasicDetail from "../../../components/sites/site-basic-detail";
import toast from "react-hot-toast";
import {Application} from "../../../types/application";
import {applicationApi} from "../../../apis/application-api";
import ApplicationBasicDetail from "../../../components/application/application-basic-detail";


const ApplicationDetail:NextPage = () => {
    const router = useRouter();
    const [application,setApplication] = useState<Application | any>(null);

    const id = router.query.id;

    const getApplication = useCallback(async ()=> {
        try {
            const res = await applicationApi.getApplication(router.query.id);
            if(res.message === "Success") {
                const result = res.data;
                setApplication(result);
            }else {
                toast.error("error")
            }
        }catch(err:any){
            toast.error(err);
        }
    },[])

    useEffect(()=> {
        if(router.query.id)
        getApplication();
    },[])



    if(!application){
        return null;
    }

    return (
        <>
            <Head>
                <title>
                    상세정보
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:8
                }}
            >
                <Container maxWidth="md">
                    <div>
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
                                        Applications
                                    </Typography>
                                </Link>
                            </NextLink>
                        </Box>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid
                                item
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    overflow: 'hidden'
                                }}
                            >
                                <div>
                                    <Typography variant="h4">
                                        {application.applicationName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
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
                            </Grid>
                            <Grid
                                item
                                sx={{m: -1}}
                            >
                                <NextLink
                                    href={`/application/${id}/edit`}
                                    passHref
                                >
                                    <Button
                                        component="a"
                                        endIcon={(<PencilAltIcon fontSize="small"/>)}
                                        sx={{m: 1}}
                                        variant="outlined"
                                    >
                                        Edit
                                    </Button>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider/>
                    <Box sx={{mt:3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <ApplicationBasicDetail
                                    applicationId={application.applicationId}
                                    applicationName={application.applicationName}
                                    applicationDescription={application.applicationDescription}
                                    applicationUrl={application.applicationUrl}
                                    createdAt={application.createdAt}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
ApplicationDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default ApplicationDetail;