import React, {useEffect, useState, useCallback} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {Group} from "../../../types/group";
import {groupApi} from "../../../apis/group-api";
import {useMounted} from "../../../hooks/use-mounted";
import Head from "next/head";
import { Box, Button, Chip, Container, Divider, Grid, Link, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import GroupBasicDetail from "../../../components/group/group-basic-detail";
import Layout from "../../../components/Layout/layout";
import UserDetail from "../../users/[id]";

const GroupDetail:NextPage = () => {
    const router = useRouter();
    const isMounted = useMounted();
    const [group, setGroup] = useState<Group | any>(null);
    console.log(typeof router.query.id);
    const getGroup = useCallback(async ()=> {
        try {
            const res = await groupApi.getGroup(router.query.id);
            //TODO res 결과값 보고 data 처리
            if(isMounted()) {
                setGroup(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    },[isMounted])

    useEffect(()=> {
        getGroup();
    },[])


    if(!group) {
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
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="md">
                    <div>
                        <Box sx={{mb: 4}}>
                            <NextLink
                                href="/group"
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
                                        Group
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
                                        {group?.groupName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            group_id:
                                        </Typography>
                                        <Chip
                                            label={group?.groupId}
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
                                    href={`/group/${router.query.id}/edit`}
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
                    <Box sx={{mt: 3}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <GroupBasicDetail
                                    groupId={group?.groupId}
                                    groupName={group?.groupName}
                                    groupDescription={group?.groupDescription}
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
GroupDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default GroupDetail;