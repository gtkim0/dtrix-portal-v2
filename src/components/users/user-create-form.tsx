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

interface IMenuType {
    id:string,
    value:string
}

interface IUserCreateFormProps {
    siteTotalList:siteInfo[];
    menu: IMenuType[];
}



const UserCreateForm: FC<IUserCreateFormProps> = (props) => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const { siteTotalList ,menu} = props;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            userLoginId: '',
            userPassword: '',
            userPasswordConfirm:'',
            userName: '',
            userPhone: '',
            userEmail:'',
            userSso: false,
            positionName:'',
            groupId:0,
            roleId:0,
            siteId:0
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
                .string().matches(phoneRegExp,'phone number is not valid')
                .required("phone is required"),
            userEmail : Yup
                .string()
                .email()
                .required('email is required'),
            siteId : Yup
                .string()
                .required("site is required")
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
                // helpers.setErrors({submit: err.message});
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
                    <CardHeader title="사용자 추가"/>
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
                                    label="패스워드"
                                    name="userPassword"
                                    onBlur={formik.handleBlur}
                                    type="password"
                                    onChange={formik.handleChange}
                                    required
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
                                    label="패스워드 확인"
                                    name="userPasswordConfirm"
                                    type={"password"}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.userPasswordConfirm}
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
                                    label="이름"
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


                            {/*<Grid*/}
                            {/*    item*/}
                            {/*    md={6}*/}
                            {/*    xs={12}*/}
                            {/*>*/}
                            {/*    <TextField*/}
                            {/*        error={Boolean(formik.touched.userName && formik.errors.userName)}*/}
                            {/*        fullWidth*/}
                            {/*        helperText={formik.touched.userName && formik.errors.userName}*/}
                            {/*        label="사용자명"*/}
                            {/*        name="userName"*/}
                            {/*        onBlur={formik.handleBlur}*/}
                            {/*        onChange={formik.handleChange}*/}
                            {/*        required*/}
                            {/*        value={formik.values.userName}*/}
                            {/*    />*/}
                            {/*</Grid>*/}

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
                                                style: {maxHeight: 400}
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
                                    select
                                    fullWidth
                                    label={"사용자 권한"}
                                    name="roleId"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.roleId}
                                    SelectProps={{
                                        MenuProps: {
                                            PaperProps: {
                                                style: {maxHeight: 400}
                                            }
                                        },
                                    }}
                                >
                                    {
                                        menu.map((data)=> (
                                            <MenuItem key={data.id} value={data.value}>{data.value}</MenuItem>
                                        ))
                                    }
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
                                    select
                                    fullWidth
                                    label={"sso"}
                                    name="userSso"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
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

                        </Grid>

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