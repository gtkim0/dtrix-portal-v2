import React, { useEffect, useState } from 'react';
import { NextPage } from "next";
import axios from 'axios';
import { Box, Button, Container, FormHelperText, Input, InputAdornment, TextField } from "@mui/material";
// import {router} from "next/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';

const Signup:NextPage = (props) => {

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            userId: '',
            userPw: '',
            userName:'',
            userPhone:'',
            userEmail:'',
            submit: null
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .max(255)
                // .required('ID is required')
                .email(),
            userPw: Yup
                .string()
                .max(255)
                .required('Password is required'),
            userName: Yup
                .string()
                .max(255)
                .required('ID is required'),
            userPhone: Yup
                .string()
                .max(255)
                .required('phone is required'),
            userEmail: Yup
                .string()
                .max(255)
                .email()
                .required('email is required')    
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                formik.resetForm();
            } catch (err) {
                console.error(err);
            }
        }
    });
    return (
        <>
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

                                    <TextField
                                        autoFocus
                                        error={Boolean(formik.touched.userName && formik.errors.userName)}
                                        fullWidth
                                        helperText={formik.touched.userName && formik.errors.userName}
                                        label="이름"
                                        margin="normal"
                                        name="userName"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.userName}
                                    />

                                    <TextField
                                        autoFocus
                                        error={Boolean(formik.touched.userPhone && formik.errors.userPhone)}
                                        fullWidth
                                        helperText={formik.touched.userPhone && formik.errors.userPhone}
                                        label="연락처"
                                        margin="normal"
                                        name="userPhone"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.userPhone}
                                    />

                                    <TextField
                                        autoFocus
                                        error={Boolean(formik.touched.userEmail && formik.errors.userEmail)}
                                        fullWidth
                                        helperText={formik.touched.userEmail && formik.errors.userEmail}
                                        label="연락처"
                                        margin="normal"
                                        name="userEmail"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.userEmail}
                                    />

                                    {formik.errors.submit && (
                                        <Box sx={{ mt: 3 }}>
                                            <FormHelperText error>
                                                {formik.errors.submit}
                                            </FormHelperText>
                                        </Box>
                                    )}
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            disabled={formik.isSubmitting}
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                        >
                                            회원가입
                                        </Button>
                                    </Box>
                                </form>
                            </Container>
                        </Box>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;