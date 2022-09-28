import React, {useEffect, useState, useCallback} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {useMounted} from "../../../hooks/use-mounted";
import Head from "next/head";
import { Box, Button, Chip, Container, Divider, Grid, Link, Typography} from "@mui/material";
import NextLink from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import Layout from "../../../components/Layout/layout";
import {Privilege} from "../../../types/privilege";
import PrivilegeBasicDetail from "../../../components/privilege/privilege-basic-detail";
import {privilegeApi} from "../../../apis/privilege-api";

const PrivilegeDetail:NextPage = () => {
    const router = useRouter();
    const isMounted = useMounted();
    const [privilege, setPrivilege] = useState<Privilege | any>(null);
    console.log(typeof router.query.id);
    const getPrivilege = useCallback(async ()=> {
        try {
            const res = await privilegeApi.getPrivilege(Number(router.query.id));
            //TODO res 결과값 보고 data 처리
            if(isMounted()) {
                setPrivilege(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    },[isMounted])

    useEffect(()=> {
        getPrivilege();
    },[])


    if(!privilege) {
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
                                href="/privilege"
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
                                        Privilege
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
                                        {privilege.privilegeName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            privilege_id:
                                        </Typography>
                                        <Chip
                                            label={privilege.privilegeId}
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
                                    href={`/privilege/${privilege.privilegeId}/edit`}
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
                                <PrivilegeBasicDetail
                                    privilegeId={privilege.privilegeId}
                                    privilegeName={privilege?.privilegeName}
                                    // groupDescription={group?.groupDescription}
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
PrivilegeDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default PrivilegeDetail;