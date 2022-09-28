import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import NextLink from "next/link";
import { Box, Chip, Container, Link, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from "next/head";
import Layout from "../../../components/Layout/layout";
import {Privilege} from "../../../types/privilege";
import {privilegeApi} from "../../../apis/privilege-api";
import {PrivilegeEditForm} from "../../../components/privilege/privilege-edit-form";

const PrivilegeEdit: NextPage = () => {

    const router = useRouter();
    const [privilege, setPrivilege] = useState<Privilege | null>(null);

    const getPrivilege = useCallback(async () => {
        try {
            const result = await privilegeApi.getPrivilege(Number(router.query.id));
            const {data} = result;
            setPrivilege(data);
        } catch (err) {
            console.error(err);
        }
    }, [])



    useEffect(() => {
        getPrivilege();
    }, [])

    if (!privilege) {
        return null;
    }

    return (
        <>
            <Head>
                <title>
                    그룹관리
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
                                {privilege?.privilegeName}
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
                                    privilege_id:
                                </Typography>
                                <Chip
                                    label={privilege?.privilegeId}
                                    size="small"
                                    sx={{ml: 1}}
                                />
                            </Box>
                        </div>
                    </Box>
                    <Box mt={3}>
                        <PrivilegeEditForm privilege={privilege}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
PrivilegeEdit.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);

export default PrivilegeEdit;