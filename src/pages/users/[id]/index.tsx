import React, {useCallback, useEffect, useState} from 'react';
import {NextPage} from "next";
import Head from "next/head";
import {Avatar, Box, Button, Chip, Container, Divider, Typography, Link, Grid} from "@mui/material";
import NextLink from "next/link";
import {useRouter} from 'next/router';
import type {User} from "../../../types/user";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {PencilAlt as PencilAltIcon} from "../../../icons/pencil-alt";
import {getInitials} from '../../../utils/get-initials';
import UserBasicDetails from '../../../components/users/user-basic-detail';
import Layout from "../../../components/Layout/layout";
import {userApi} from "../../../apis/user-api";
import {useMounted} from '../../../hooks/use-mounted';
import toast from "react-hot-toast";

const UserDetail: NextPage = () => {
    const router = useRouter();
    const isMounted = useMounted();
    const [user, setUser] = useState<User | null>(null);
    const id = router.query.id;

    const getUser = useCallback(async () => {
        try {
            const res = await userApi.getUser(router.query.id);
            const {data} = res;
            if (isMounted()) {
                setUser(data);
            }
        } catch (err: any) {
            toast.error(err);
        }
    }, [isMounted])

    useEffect(() => {
        if (id)
            getUser();
    }, [])

    if (!user) {
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
                                    <Typography variant="h4">
                                        {user.userName}
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            user_id:
                                        </Typography>
                                        <Chip
                                            label={user.id}
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
                                    href={`/users/${id}/edit`}
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
                                <UserBasicDetails
                                    userId={user.userId}
                                    username={user.userName}
                                    name={user.name}
                                    userRole={user.userRole}
                                    userSso={user.userSso}
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
UserDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)


export default UserDetail;