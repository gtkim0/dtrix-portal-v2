import React, {useEffect, useState} from 'react';
import {NextPage} from "next";
import axios from 'axios';
import {useAuth} from '../../hooks/use-auth';
import {Box, Button, Container, FormHelperText, Input, InputAdornment, TextField} from "@mui/material";
// import {router} from "next/client";
import {useMounted} from "../../hooks/use-mounted";
import {useFormik} from "formik";
import {useRouter} from "next/router";
import * as Yup from 'yup';

const Login:NextPage = (props) => {

    const isMounted = useMounted();
    const router = useRouter();
    const {login} = useAuth() as any;
    const formik = useFormik({
        initialValues: {
            userId: '',
            userPw: '',
            submit: null
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .max(255)
                .required('ID is required'),
            userPw: Yup
                .string()
                .max(255)
                .required('Password is required')
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                await login(values.userId, values.userPw);
                formik.resetForm();
                if (isMounted()) {
                    const returnUrl = (router.query.returnUrl as string) || '/';
                    router.push(returnUrl);
                }
            } catch (err) {
                console.error(err);

                if (isMounted()) {
                    helpers.setStatus({success: false});
                    // helpers.setErrors({submit: err.message});
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    return (
        <div className="login_page">
            <div className="login_page_header">
                DTrix Portal - System Admin
            </div>
            <div className="login_page_body">
                <div className="login_page_form">
                    <Box sx={{
                        flexGrow: 1,
                        my: 2,
                    }}>
                        <Container>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                                {...props}
                            >
                                <TextField
                                    autoFocus
                                    error={Boolean(formik.touched.userId && formik.errors.userId)}
                                    fullWidth
                                    helperText={formik.touched.userId && formik.errors.userId}
                                    // InputProps={{
                                    //     startAdornment: (
                                    //         <InputAdornment position="start">
                                    //             {/*<UserIcon fontSize="small"/>*/}
                                    //         </InputAdornment>
                                    //     )
                                    // }}
                                    label="아이디"
                                    margin="normal"
                                    name="userId"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.userId}
                                />

                                <TextField
                                    error={Boolean(formik.touched.userPw && formik.errors.userPw)}
                                    fullWidth
                                    helperText={formik.touched.userPw && formik.errors.userPw}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {/*<LockIcon fontSize="small"/>*/}
                                            </InputAdornment>
                                        )
                                    }}
                                    label="비밀번호"
                                    margin="normal"
                                    name="userPw"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.userPw}
                                />
                                {formik.errors.submit && (
                                    <Box sx={{mt: 3}}>
                                        <FormHelperText error>
                                            {formik.errors.submit}
                                        </FormHelperText>
                                    </Box>
                                )}
                                <Box sx={{mt: 2}}>
                                    <Button
                                        disabled={formik.isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        로그인
                                    </Button>
                                </Box>
                            </form>
                        </Container>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Login;