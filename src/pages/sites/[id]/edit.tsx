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
import {siteApi} from "../../../apis/site-api";
import { applicationApi } from '../../../apis/application-api';
import { relationApi } from '../../../apis/relation-api';

const SiteEdit :NextPage = () => {
    const router = useRouter();
    const [site,setSite] = useState<Site | null>(null);
    const [applicationList,setApplicationList] = useState<any>();
    const [relationList,setRelationList] = useState<any>();

    const getSite = useCallback(async ()=> {
        try {
            const body = await siteApi.getSite(router.query.id);
            const {data} = body;
            setSite(data);
        }catch (err){
            console.error(err);
        }
    },[])

    const getApplication = useCallback(async(siteId:number) => {
        try {
            const result = await applicationApi.getApplications({page:0,size:100});
            setApplicationList(result.data);
        } catch(err:any) {
            // toast.error(err);
        }
    },[])

    const getRelation = useCallback(async(siteId:number) => {
        try {
            const result:any = await relationApi.getSiteRelation({siteId:siteId});
            setRelationList(result.data);
        } catch (err:any){

        }
    },[])

    useEffect(()=> {
        if(router.query.id && Number(router.query.id) !==0) {
            getApplication(Number(router.query.id));
            getRelation(Number(router.query.id));
        }
    },[])

    useEffect(()=> {
        getSite();
    },[])

    // 사이트 정보랑 구독정보 가져와야함.

    if(!site){
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
                <Container maxWidth="lg">
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
                                {site.siteName}
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
                                    site_id:
                                </Typography>
                                <Chip
                                    label={site.siteId}
                                    size="small"
                                    sx={{ml: 1}}
                                />
                            </Box>
                        </div>
                    </Box>
                    <Box mt={3}>
                        <SiteEditForm site={site} applicationList={applicationList} relationList={relationList}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
SiteEdit.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default SiteEdit;