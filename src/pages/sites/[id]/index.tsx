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


const SiteDetail:NextPage = () => {
    const router = useRouter();
    const [site,setSite] = useState<Site | any>(null);
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

    useEffect(()=> {
        getSite();
    },[])

    if(!site){
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
                                    overflow: 'hidden'
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
                                    siteDomain={site.siteDomain}
                                    siteEnabled={site.siteEnabled}
                                    siteDefault={site.siteDefault}
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
SiteDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default SiteDetail;