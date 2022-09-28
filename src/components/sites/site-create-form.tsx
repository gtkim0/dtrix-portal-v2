import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel, FormGroup,
    Grid, MenuItem, Switch, TextareaAutosize,
    TextField, Typography
} from "@mui/material";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import Link from "next/link";
import {siteApi} from "../../apis/site-api";
import {userApi} from "../../apis/user-api";
import {User} from "../../types/user";

interface ISiteCreateFormProps {

}

const SiteCreateForm: FC<ISiteCreateFormProps> = (props) => {
    const userList = ["test1","user1","serach1"]
    const router = useRouter();
    const [admin,setAdmin] = useState<string | null>()
    const [dbValue,setDbValue] = useState<any>('postgre');


    const formik = useFormik({
        initialValues: {
            siteName:'',
            userName:'',
            siteDescription:'',
            siteSso:false,

            // board:false,
            // dashboard:false,
            // dbDriver:'',
            // dbUrl:'',
            // dbUser:'',
            // dbPassword:''
        },
        validationSchema: Yup.object({
            // siteName: Yup
            //     .string()
            //     .max(255)
            //     .required('이름 is required'),
            // siteDomain: Yup
            //     .string()
            //     .max(255)
            //     .required('도메인 is required'),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                // @ts-ignore
                console.log(values);
                const result = await siteApi.createSite(values);
                if (result.code === 200) {
                    toast.success('Site created!');
                    router.push('/sites');
                }
            } catch (err: any) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({success: false});
                // @ts-ignore
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    });

    const [users, setUsers] = useState<User[]>([]);
    const getUser =  async () => {

        const params = {
            page:0,
            size:100
        }

        try {
            const result =  await userApi.getUsers(params);
            const {total, list}:any = result.data;
            if(result){
                setUsers(list);
            }
        }catch (err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        getUser();
    },[])


    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                {/*<Typography variant={"h3"}>사이트 추가</Typography>*/}
                <Card >
                    <CardHeader title="사이트 추가"/>
                    <CardContent >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.siteName && formik.errors.siteName)}
                                    fullWidth
                                    helperText={formik.touched.siteName && formik.errors.siteName}
                                    label="사이트 이름"
                                    name="siteName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // required
                                    value={formik.values.siteName}
                                />
                            </Grid>

                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                {/*TODO 유저리스트 받아와서 목록에 보여줘야함.*/}
                                {/*<Autocomplete*/}
                                {/*    value={userList}*/}
                                {/*    onChange={(e:any,newValue:string | null)=> {*/}
                                {/*        setGroup(newValue)*/}
                                {/*    }}*/}
                                {/*    options={options}*/}
                                {/*    onInputChange={(e,newInputValue)=> {*/}
                                {/*        setInputValue(newInputValue);*/}
                                {/*    }}*/}
                                {/*    inputValue={inputValue}*/}
                                {/*    sx={{width:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}*/}
                                {/*    renderInput={(params)=>*/}
                                {/*        <TextField {...params} label={"그룹"} />*/}
                                {/*    }*/}
                                {/*/>*/}
                                <TextField
                                    error={Boolean(formik.touched.userName && formik.errors.userName)}
                                    fullWidth
                                    helperText={formik.touched.userName && formik.errors.userName}
                                    label="관리자"
                                    select
                                    name="userName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // required
                                    value={formik.values.userName}
                                >
                                    {/*TODO UserList 받아와서 보여줘야함.*/}
                                    {
                                        users.map((data)=> (
                                            <MenuItem value={data.userId} key={data.userId}>{data.userName}</MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.siteDescription && formik.errors.siteDescription)}
                                    fullWidth
                                    helperText={formik.touched.siteDescription && formik.errors.siteDescription}
                                   label={"사이트 설명"}
                                   name={"siteDescription"}
                                   rows={5}
                                   multiline
                                   placeholder={"사이트 설명"}
                                    onChange={formik.handleChange}
                                    value={formik.values.siteDescription}
                                />

                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                {/*<TextField*/}
                                {/*    error={Boolean(formik.touched.siteSso && formik.errors.siteSso)}*/}
                                {/*    // fullWidth*/}
                                {/*    helperText={formik.touched.siteSso && formik.errors.siteSso}*/}
                                {/*    label={"sso 여부"}*/}
                                {/*    name={"siteSso"}*/}
                                {/*    // rows={5}*/}
                                {/*    // multiline*/}
                                {/*    placeholder={"sso 여부"}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    value={formik.values.siteSso}*/}
                                {/*/>*/}
                                <FormControlLabel control={<Checkbox name={"siteSso"} value={formik.values.siteSso} onChange={formik.handleChange} />} label={"Sso 여부"} />

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Divider />
                {/*<Card>*/}
                {/*    <CardHeader title="서비스 정보"/>*/}
                {/*    <CardContent>*/}
                {/*        <Grid>*/}
                {/*            <Grid>*/}
                {/*                /!*TODO 여기는 추후에 데이터불러와서 동적으로 변하게처리해야함*!/*/}

                {/*                /!*{*!/*/}
                {/*                /!*    data.map((data)=> (*!/*/}
                {/*                /!*        <FormControlLabel control={<Switch />} label={} />*!/*/}
                {/*                /!*    ))*!/*/}
                {/*                /!*}*!/*/}


                {/*                <FormControlLabel*/}
                {/*                    control={*/}
                {/*                    <Switch*/}
                {/*                        onBlur={formik.handleBlur}*/}
                {/*                        onChange={formik.handleChange}*/}
                {/*                        value={formik.values.board}*/}
                {/*                        name={"board"}*/}
                {/*                    />}*/}
                {/*                    label={"보드"}*/}
                {/*                />*/}
                {/*                <FormControlLabel*/}
                {/*                    control={*/}
                {/*                    <Switch*/}
                {/*                        onBlur={formik.handleBlur}*/}
                {/*                        onChange={formik.handleChange}*/}
                {/*                        value={formik.values.dashboard}*/}
                {/*                        name={"dashboard"}*/}
                {/*                    />*/}
                {/*                } label={"대시보드"}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
                {/*<Divider />*/}
                {/*<Card>*/}
                {/*    <CardHeader title={"db"} />*/}
                {/*    <CardContent>*/}
                {/*        <Grid*/}
                {/*            container*/}
                {/*            spacing={2}*/}
                {/*        >*/}
                {/*            <Grid*/}
                {/*                item*/}
                {/*                xs={12}*/}
                {/*                md={6}*/}
                {/*            >*/}
                {/*                <TextField*/}
                {/*                    fullWidth*/}
                {/*                    select*/}
                {/*                    error={Boolean(formik.touched.dbDriver && formik.errors.dbDriver)}*/}
                {/*                    helperText={formik.touched.dbDriver && formik.errors.dbDriver}*/}
                {/*                    name={"dbDriver"}*/}
                {/*                    // value={dbValue}*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    >*/}
                {/*                    <MenuItem key={"postgre"} value={"postgre"}>PostgreSQL</MenuItem>*/}
                {/*                    <MenuItem key={"maria"} value={"maria"}>Maria</MenuItem>*/}
                {/*                    <MenuItem key={"oracle"} value={"oracle"}>Oracle</MenuItem>*/}
                {/*                </TextField>*/}
                {/*            </Grid>*/}
                {/*            <Grid*/}
                {/*                item*/}
                {/*                xs={12}*/}
                {/*                md={6}*/}
                {/*            >*/}
                {/*                <TextField*/}
                {/*                    error={Boolean(formik.touched.dbUrl && formik.errors.dbUrl)}*/}
                {/*                    fullWidth*/}
                {/*                    helperText={formik.touched.dbUrl && formik.errors.dbUrl}*/}
                {/*                    label="dbUrl"*/}
                {/*                    name="dbUrl"*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    // required*/}
                {/*                    value={formik.values.dbUrl}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*            <Grid*/}
                {/*                item*/}
                {/*                xs={12}*/}
                {/*                md={6}*/}
                {/*            >*/}
                {/*                <TextField*/}
                {/*                    error={Boolean(formik.touched.dbUser && formik.errors.dbUser)}*/}
                {/*                    fullWidth*/}
                {/*                    helperText={formik.touched.dbUser && formik.errors.dbUser}*/}
                {/*                    label="id"*/}
                {/*                    name="dbUser"*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    // required*/}
                {/*                    value={formik.values.dbUser}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*            <Grid*/}
                {/*                item*/}
                {/*                xs={12}*/}
                {/*                md={6}*/}
                {/*            >*/}
                {/*                <TextField*/}
                {/*                    error={Boolean(formik.touched.dbPassword && formik.errors.dbPassword)}*/}
                {/*                    fullWidth*/}
                {/*                    helperText={formik.touched.dbPassword && formik.errors.dbPassword}*/}
                {/*                    label="password"*/}
                {/*                    name="dbPassword"*/}
                {/*                    onBlur={formik.handleBlur}*/}
                {/*                    onChange={formik.handleChange}*/}
                {/*                    // required*/}
                {/*                    value={formik.values.dbPassword}*/}
                {/*                />*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        mx: -1,
                        mb: -1,
                        mt: 3
                    }}
                >

                        <Button
                            sx={{m: 1,ml:'auto'}}
                            variant="outlined"
                            onClick={()=> router.push('/sites')}
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

export default SiteCreateForm;