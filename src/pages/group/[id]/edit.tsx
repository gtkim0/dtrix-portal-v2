import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import NextLink from "next/link";
import {getInitials} from "../../../utils/get-initials";
import {Avatar, Box, Chip, Container, Link, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from "next/head";
import {UserEditForm} from "../../../components/users/user-edit-form";
import Layout from "../../../components/Layout/layout";
import {Group} from "../../../types/group";
import {groupApi} from "../../../apis/group-api";
import {GroupEditForm} from "../../../components/group/group-edit-form";

const GroupEdit: NextPage = () => {

    const router = useRouter();
    const [group, setGroup] = useState<Group | null>(null);

    const getGroup = useCallback(async () => {
        try {
            const body = await groupApi.getGroup(router.query.id);
            // TODO 수정필요
            console.log(body);
            const {data} = body;
            setGroup(data);
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        getGroup();
    }, [])

    if (!group) {
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
                                    Users
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
                                {group.groupName}
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
                                    group_id:
                                </Typography>
                                <Chip
                                    label={group.groupId}
                                    size="small"
                                    sx={{ml: 1}}
                                />
                            </Box>
                        </div>
                    </Box>
                    <Box mt={3}>
                        <GroupEditForm group={group}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
GroupEdit.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);

export default GroupEdit;