import type { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, MenuItem
} from '@mui/material';
import { userApi } from '../../apis/user-api';
import type { User } from '../../types/user';
import React, { useEffect, useState } from "react";

interface UserEditFormProps {
    user: User;
}

export const UserEditForm: FC<UserEditFormProps> = (props) => {

    const { user, ...rest } = props;
    console.log(user);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            userId: '',
            userName: '',
            userPw: '',
            userPwConfirm: '',
            userRole:'',
            userSso: false,
            submit: null
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .max(255)
                .required('아이디 is required'),
            userName: Yup
                .string()
                .max(255)
                .required('Name is required'),
        }),
        onSubmit: async (values:any, helpers:any): Promise<void>  => {
            try {
                // @ts-ignore
                const result = await userApi.updateUser(user.id, values);
                // console.log(result);
                if (result.code === 0) {
                    // helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('User updated!');
                    router.back();
                }
            } catch (err:any) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    const handleDelete = async () => {
        const result = await userApi.deleteUser(user.id);
        if (result && result.code === 0) {
            toast.success('User created!');
            router.push('/users');
        }
    }

    useEffect(()=> {
        console.log(formik.values);
    },[formik])

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <Card>
                <CardHeader title="사용자 정보"/>
                <Divider/>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userId && formik.errors.userId)}
                                fullWidth
                                helperText={formik.touched.userId && formik.errors.userId}
                                label="아이디"
                                name="userId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userId}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userName && formik.errors.userName)}
                                fullWidth
                                helperText={formik.touched.userName && formik.errors.userName}
                                label="사용자명"
                                name="userName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userName}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userPw && formik.errors.userPw)}
                                fullWidth
                                helperText={formik.touched.userPw && formik.errors.userPw}
                                label="암호"
                                type="password"
                                name="userPw"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userPw}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userPwConfirm && formik.errors.userPwConfirm)}
                                fullWidth
                                helperText={formik.touched.userPwConfirm && formik.errors.userPwConfirm}
                                label="암호 확인"
                                type="password"
                                name="userPwConfirm"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userPwConfirm}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                // helperText={formik.touched.userPwConfirm && formik.errors.userPwConfirm}
                                label="사용자 권한"
                                select
                                name="userRole"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userRole}
                                sx={{mt:2}}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: {maxHeight: 400}
                                        }
                                    },
                                }}
                            >
                                <MenuItem key="system" value="system">시스템 관리자</MenuItem>
                                <MenuItem key="admin" value="admin">관리자</MenuItem>
                                <MenuItem key="user" value="user">사용자</MenuItem>
                            </TextField>
                        </Grid>
                        {/*sso*/}
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                // helperText={formik.touched.userPwConfirm && formik.errors.userPwConfirm}
                                label="사용자 권한"
                                select
                                name="userSso"
                                value={formik.values.userSso}
                                sx={{mt:2}}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: {maxHeight: 400}
                                        }
                                    },
                                }}
                            >
                                <MenuItem key="true" value={true as any}>Y</MenuItem>
                                <MenuItem key="false" value={false as any}>N</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }}/>
                </CardContent>
                <CardActions
                    sx={{
                        flexWrap: 'wrap',
                        m: -1
                    }}
                >
                    <Button
                        disabled={formik.isSubmitting}
                        type="submit"
                        sx={{ m: 1 }}
                        variant="contained"
                    >
                        Save
                    </Button>
                    <Button
                        component="a"
                        disabled={formik.isSubmitting}
                        sx={{
                            m: 1,
                            mr: 'auto'
                        }}
                        variant="outlined"
                        onClick={() => {
                            router.back()
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        disabled={formik.isSubmitting}
                        onClick={handleDelete}
                    >
                        Delete user
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

UserEditForm.propTypes = {
    // @ts-ignore
    user: PropTypes.object
};
