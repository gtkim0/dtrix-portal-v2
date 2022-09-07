import React, {useCallback} from 'react';
import type {FC} from 'react';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    MenuItem,
    Switch,
    TextField,
    Typography,
    Grid,
    Box
} from "@mui/material";
import {t} from "i18next";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import {userApi} from "../../apis/user-api";
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {siteInfo} from "../../types/site";

interface IUserCreateFormProps {
    siteTotalList:siteInfo[];
}

const UserCreateForm: FC<IUserCreateFormProps> = (props) => {

    const { siteTotalList } = props;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            userId: '',
            userName: '',
            userPw: '',
            userPwConfirm: '',
            userRole:'',
            userSso: false,
            siteName:'',
            submit: null
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .min(5)
                .max(255)
                .required('아이디 is required'),

            userName: Yup
                .string()
                .min(3)
                .max(255)
                .required('Name is required'),

            userPw: Yup
                .string()
                .required('암호 is required'),

            userPwConfirm: Yup
                .string()
                .required('암호 is required'),

            userRole: Yup
                .string()
                .required('권한 is required')
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                // @ts-ignore
                const result = await userApi.createUser(values);
                if (result.code === 0) {
                    toast.success('User created!');
                    router.push('/users');
                }
            } catch (err: any) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    // const handleDeleteUser = useCallback(async ()=> {
    //     await userApi.deleteUser()
    // },[])

    // @ts-ignore
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
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
                                md={12}
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
                                    select
                                    label="사이트명"
                                    fullWidth
                                    required
                                    name={"siteName"}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.siteName}
                                    SelectProps={{
                                        MenuProps:{
                                            PaperProps:{
                                                style:{maxHeight:400}
                                            }
                                        }
                                    }}
                                >
                                    {
                                        siteTotalList?.map((site:any)=> (
                                            <MenuItem key={site.siteName} value={site.siteName}>
                                                {site.siteName}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>

                            </Grid>


                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.userPw && formik.errors.userPw)}
                                    fullWidth
                                    type="password"
                                    helperText={formik.touched.userPw && formik.errors.userPw}
                                    label="암호"
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
                                    type="password"
                                    helperText={formik.touched.userPwConfirm && formik.errors.userPwConfirm}
                                    label="암호 확인"
                                    name="userPwConfirm"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.userPwConfirm}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}

                        >
                            <TextField
                                select
                                fullWidth
                                label={"사용자 권한"}
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
                                <MenuItem key="system" value="admin">시스템 관리자</MenuItem>
                                <MenuItem key="admin" value="system">사이트 관리자</MenuItem>
                                <MenuItem key="user" value="user">사용자</MenuItem>
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
                                label={"sso"}
                                name="userSso"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                sx={{mt:2}}
                                value={formik.values.userSso}
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
                        <Divider sx={{my: 3}}/>
                    </CardContent>
                </Card>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'right',
                        mx: -1,
                        mb: -1,
                        mt: 3
                    }}
                >
                    <Button
                        sx={{m: 1}}
                        variant="outlined"
                        onClick={()=> router.push('/users')}
                    >
                        취소
                    </Button>
                    <Button
                        sx={{m: 1}}
                        type="submit"
                        variant="contained"
                    >
                        추가
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default UserCreateForm;