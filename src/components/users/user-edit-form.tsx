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
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const { user, ...rest } = props;
    console.log(user);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            userId: '',
            userLoginId: user.userLoginId,
            userName: user.userLoginId,
            userPhone: user.userPhone,
            userPassword: '',
            userPasswordConfirm: '',
            userEmail: user.userEmail,
            userSso: user.userSso,
            positionName: user.positionName,
            groupId: user.groupId,
            roleId: user.roleId,
            siteId: user.siteId,
            submit: null
        },
        validationSchema: Yup.object({
            userLoginId: Yup
                .string()
                .min(5)
                .max(255)
                .required('아이디 is required'),
            userPassword: Yup
                .string()
                .required('암호 is required'),

            userPasswordConfirm: Yup
                .string()
                .required('암호 is required'),

            userName: Yup
                .string()
                .min(2)
                .max(10)
                .required('이름 is required'),

            userPhone: Yup
                .string().matches(phoneRegExp, 'phone number is not valid'),
            userEmail: Yup
                .string()
                .email(),
            siteId: Yup
                .string()
        }),
        onSubmit: async (values: any, helpers: any): Promise<void> => {
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
            } catch (err: any) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });

    const handleDelete = async () => {
        const result = await userApi.deleteUser(user.userId);
        if (result && result.code === 0) {
            toast.success('User created!');
            router.push('/users');
        }
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
        >
            <Card>
                <CardHeader title="사용자 정보" />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userLoginId && formik.errors.userLoginId)}
                                fullWidth
                                helperText={formik.touched.userLoginId && formik.errors.userLoginId}
                                label="아이디"
                                name="userLoginId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userLoginId}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userPassword && formik.errors.userPassword)}
                                fullWidth
                                helperText={formik.touched.userPassword && formik.errors.userPassword}
                                label="암호"
                                type="password"
                                name="userPassword"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userPassword}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userPasswordConfirm && formik.errors.userPasswordConfirm)}
                                fullWidth
                                helperText={formik.touched.userPasswordConfirm && formik.errors.userPasswordConfirm}
                                label="암호 확인"
                                type="password"
                                name="userPasswordConfirm"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.userPasswordConfirm}
                                required
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
                                error={Boolean(formik.touched.userPhone && formik.errors.userPhone)}
                                fullWidth
                                helperText={formik.touched.userPhone && formik.errors.userPhone}
                                label="연락처"
                                name="userPhone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userPhone}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userEmail && formik.errors.userEmail)}
                                fullWidth
                                helperText={formik.touched.userEmail && formik.errors.userEmail}
                                label="이메일"
                                name="userEmail"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userEmail}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.positionName && formik.errors.positionName)}
                                fullWidth
                                helperText={formik.touched.positionName && formik.errors.positionName}
                                label="직책명"
                                name="positionName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.positionName}
                            />
                        </Grid>


                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                select
                                label="사이트명"
                                fullWidth
                                required
                                name={"siteId"}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.siteId}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: { maxHeight: 400 }
                                        }
                                    }
                                }}
                            >
                                {/* {
                                        siteTotalList?.map((site:any)=> (
                                            <MenuItem key={site.siteName} value={site.siteName}>
                                                {site.siteName}
                                            </MenuItem>
                                        ))
                                    } */}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                select
                                fullWidth
                                label={"그룹"}
                                name="groupId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.groupId}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: { maxHeight: 400 }
                                        }
                                    },
                                }}
                            >
                                {/*groupId*/}
                                {/* <MenuItem key="system" value="admin">시스템 관리자</MenuItem>
                                    <MenuItem key="admin" value="system">사이트 관리자</MenuItem>
                                    <MenuItem key="user" value="user">사용자</MenuItem> */}
                            </TextField>
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
                                name="roleId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.roleId}
                                sx={{ mt: 2 }}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: { maxHeight: 400 }
                                        }
                                    },
                                }}
                            >
                                <MenuItem key="system" value="1">시스템 관리자</MenuItem>
                                <MenuItem key="admin" value="2">관리자</MenuItem>
                                <MenuItem key="user" value="3">사용자</MenuItem>
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
                                label="Sso 사용여부"
                                select
                                name="userSso"
                                value={formik.values.userSso}
                                sx={{ mt: 2 }}
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: { maxHeight: 400 }
                                        }
                                    },
                                }}
                            >
                                <MenuItem key="true" value={true as any}>Y</MenuItem>
                                <MenuItem key="false" value={false as any}>N</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
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
