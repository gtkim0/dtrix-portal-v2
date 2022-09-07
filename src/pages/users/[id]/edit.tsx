import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";
import {User} from "../../../types/user";
import {userApi} from "../../../apis/user-api";
import NextLink from "next/link";
import {getInitials} from "../../../utils/get-initials";
import {Avatar, Box, Chip, Container, Link, Typography} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Head from "next/head";
import {UserEditForm} from "../../../components/users/user-edit-form";
import Layout from "../../../components/Layout/layout";
import UserCreate from "../new";

const UserEdit: NextPage = () => {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const getUser = useCallback(async () => {
        try {
            const body = await userApi.getUser(router.query.id);
            const {data} = body;
            setUser(data);
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        getUser();
    }, [])

    if (!user) {
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
                            href="/users"
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
                        <Avatar
                            src={user.avatar}
                            sx={{
                                height: 64,
                                mr: 2,
                                width: 64
                            }}
                        >
                            {getInitials(user.userName)}
                        </Avatar>
                        <div>
                            <Typography
                                noWrap
                                variant="h4"
                            >
                                {user.userName}
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
                                    user_id:
                                </Typography>
                                <Chip
                                    label={user.userId}
                                    size="small"
                                    sx={{ml: 1}}
                                />
                            </Box>
                        </div>
                    </Box>
                    <Box mt={3}>
                        <UserEditForm user={user}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
UserEdit.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
);

export default UserEdit;