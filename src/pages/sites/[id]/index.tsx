import React, {useCallback, useEffect, useState} from 'react';
import {GetStaticPaths, NextPage} from 'next';
import {useRouter} from "next/router";
import type { Site } from '../../../types/site';
import {siteApi} from "../../../apis/site-api";
import Head from "next/head";
import Layout from "../../../components/Layout/layout";
import Sites from "../index";
import {Avatar, Box, Button, Chip, Container, Divider, Grid, Link, stepIconClasses, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {getInitials} from "../../../utils/get-initials";
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import UserBasicDetails from "../../../components/users/user-basic-detail";
import SiteBasicDetail from "../../../components/sites/site-basic-detail";
import toast from "react-hot-toast";
import SiteServiceDetail from '../../../components/sites/site-service-detail';
import SiteDbDetail from '../../../components/sites/site-db-detail';
import { relationApi } from '../../../apis/relation-api';
import {Application} from '../../../types/application';


const SiteDetail:NextPage = (props) => {
    console.log(props);
    const router = useRouter();
    const [site,setSite] = useState<Site | any>(null);
    const [relation,setRelation] = useState<any>();
    const id = router.query.id;

    const getSite = useCallback(async ()=> {
        try {
            const res = await siteApi.getSite(router.query.id);
            const result = res.data;
            setSite(result);
        }catch(err:any){
            toast.error(err);
        }
    },[])

    console.log(site);

    const getRelation = useCallback(async(siteId:number) => {
        try {
            const result:any = await relationApi.getSiteRelation({siteId:siteId});
            setRelation(result.data);
        } catch(err:any) {
            toast.error(err);
        }

    },[])

    useEffect(()=> {
        getSite();
    },[])

    useEffect(()=> {
        if(site) 
            getRelation(site.siteId);
    },[site])

    if(!site){
        return null;
    }

    if(!relation) {
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
                    py:3
                }}
            >
                <Container maxWidth="lg">
                    <div>
                        <Box sx={{mb: 4}}>
                            <NextLink
                                href="/sites"
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
                                        Sites
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
                                    overflow: 'hidden',
                                    p:3
                                }}
                            >
                                <div>
                                    <Typography variant="h4">
                                        {site.siteName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            site_id:
                                        </Typography>
                                        <Chip
                                            label={site.siteId}
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
                                    href={`/sites/${id}/edit`}
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
                                <SiteBasicDetail
                                    siteId={site.siteId}
                                    siteName={site.siteName}
                                    siteDescription={site.siteDescription}
                                    userName={site.userName}
                                    siteEnabled={site.siteEnabled}
                                    siteDefault={site.siteDefault}
                                    modifiedAt={site.modifiedAt}
                                    siteSso={site.siteSso}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider />

                    <Box sx={{mt:3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <SiteServiceDetail relation={relation} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider />

                    <Box sx={{mt:3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <SiteDbDetail />
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export async function getServerSideProps(data:any) {
    return {
        props: {
            data
        }
    }
}

// @ts-ignore
SiteDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default SiteDetail;