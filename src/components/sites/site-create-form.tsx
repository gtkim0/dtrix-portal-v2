import React, { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel,
    Grid, MenuItem,
    TextField, Table, TableHead, TableRow, TableCell, TableBody

} from "@mui/material";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { siteApi } from "../../apis/site-api";
import { userApi } from "../../apis/user-api";
import { User } from "../../types/user";

interface ISiteCreateFormProps {

}

const SiteCreateForm: FC<ISiteCreateFormProps> = (props) => {
    const userList = ["test1", "user1", "serach1"]
    const router = useRouter();
    const [admin, setAdmin] = useState<string | null>()
    const [dbValue, setDbValue] = useState<any>('postgre');
    const [users, setUsers] = useState<User[]>([]);

    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [selectedCheckList, setSelectedCheckList] = useState<number[]>([]);

    const formik = useFormik({
        initialValues: {
            siteName: '',
            userName: '',
            siteDescription: '',
            siteSso: false,
            siteEnabled: false,
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
                helpers.setStatus({ success: false });
                // @ts-ignore
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        }
    });


    const getUser = async () => {
        const params = {
            page: 0,
            size: 100
        }

        try {
            const result = await userApi.getUsers(params);
            const { total, list }: any = result.data;
            if (result) {
                setUsers(list);
            }
        } catch (err) {
            console.error(err);
        }
    }

    // 사이트 이름 중복검사 함수
    const handleCheckSiteName = useCallback(async () => {
        try {
            // const result = await 
        } catch (err) {
            console.error(err);
        }

    }, [])

    const handleAllChange = () => {
        setAllChecked(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        let list = [...selectedCheckList];
        if (!list.includes(id)) {
            list = [...list].concat(id);
        } else {
            list = [...list].filter((data => data !== id))
        }
        setSelectedCheckList([...list]);
    }

    useEffect(()=> {
        if(allChecked) {
            let list:number[] = [];
            dummyData.map((data)=> {
                list.push(data.id);
            })
            setSelectedCheckList([...list]);
        }else{
            setSelectedCheckList([]);
        }
    },[allChecked])

    useEffect(() => {
        getUser();
    }, [])


    const dummyData = [
        {
            id: 1,
            application: 'board1',
            description: 'board설명',
            url: 'boardUrl'
        },
        {
            id: 2,
            application: 'board2',
            description: 'board설명',
            url: 'boardUrl'
        },
        {
            id: 3,
            application: 'board3',
            description: 'board설명',
            url: 'boardUrl'
        },
    ]

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <Card >
                    <CardHeader title="사이트 추가" />
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
                                <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                    <Box sx={{ width: '100%' }}>
                                        <TextField
                                            sx={{ width: '100%' }}
                                            error={Boolean(formik.touched.siteName && formik.errors.siteName)}
                                            fullWidth
                                            helperText={formik.touched.siteName && formik.errors.siteName}
                                            label="사이트 이름"
                                            name="siteName"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            // required
                                            value={formik.values.siteName}
                                        >

                                        </TextField>
                                    </Box>
                                    <Button onClick={handleCheckSiteName} sx={{ position: 'absolute', right: '0', my: 'auto' }}>중복검사</Button>
                                </Box>
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
                                    {
                                        users.map((data) => (
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
                                >
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <FormControlLabel control={<Checkbox name={"siteSso"} value={formik.values.siteSso} onChange={formik.handleChange} />} label={"Sso 여부"} />
                                <FormControlLabel control={<Checkbox name={"siteEnabled"} value={formik.values.siteEnabled} onChange={formik.handleChange} />} label={"사용여부"} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Divider />
                <Card>
                    <CardHeader title="서비스 정보" />
                    <CardContent>
                        <Grid>
                            <Grid>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><input type="checkbox" checked={allChecked} onChange={handleAllChange} /></TableCell>
                                            <TableCell>Application</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>URL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dummyData.map((data) => (
                                                <TableRow
                                                    key={data.id}
                                                >
                                                    <TableCell><input type="checkbox" onChange={(e) => handleChange(e,data.id)} checked={selectedCheckList.includes(data.id)} /></TableCell>
                                                    <TableCell>board</TableCell>
                                                    <TableCell>board 설명</TableCell>
                                                    <TableCell>boardUrl</TableCell>
                                                </TableRow>
                                            ))
                                        }

                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Divider />
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
                {/* </CardContent> */}
                {/* </Card> */}
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
                        sx={{ m: 1, ml: 'auto' }}
                        variant="outlined"
                        onClick={() => router.push('/sites')}
                    >
                        취소
                    </Button>

                    <Button
                        sx={{ m: 1 }}
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