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
import {applicationApi} from "../../apis/application-api";
import {Application} from '../../types/application';
import { relationApi } from '../../apis/relation-api';
interface ISiteCreateFormProps {

}

const SiteCreateForm: FC<ISiteCreateFormProps> = (props) => {
    const router = useRouter();
    const [admin, setAdmin] = useState<string | null>()
    const [users, setUsers] = useState<User[]>([]);
    const [applications,setApplications] = useState<Application[]>([]);
    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [selectedCheckList, setSelectedCheckList] = useState<number[]>([]);

    const [siteName,setSiteName] = useState<string>('');

    const [nameOverlapCheck,setNameOverlapCheck] = useState(false);


    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    const formik = useFormik({
        initialValues: {
            siteName: '',
            userId: '',
            siteDescription: '',
            siteSso: false,
            // delYn: false,
            // board:false,
            // dashboard:false,
            // dbDriver:'postgre',
            // dbUrl:'',
            // dbUser:'',
            // dbPassword:''
        },
        validationSchema: Yup.object({
            siteName: Yup
                .string()
                .max(255)
                .required('이름 is required'),
        }),
        
        onSubmit: async (values, helpers): Promise<void> => {
            
            try {
                // @ts-ignore
                if(!nameOverlapCheck) {
                    alert("사이트 이름 중복검사 필요");
                    return ;
                }

                const result = await siteApi.createSite(values);
                // TODO api 만든후 여기붙혀야함.
                if(result && result.code ===200) {
                    const {data} = result; 
                    if(data) {
                        const result:any = await relationApi.createSiteRelation({siteId:data.siteId,applicationIdList:selectedCheckList})
                        if(result.code===200){
                            toast.success('Site created!');
                            router.push('/sites');
                        }      
                    }  
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
        // TODO 추후 수정, 인피니티 스크롤로 받아와야하나?
        const params = {
            page: 0,
            size: 100
        }
        try {
            const result = await userApi.getUsers(params);
            const { list }: any = result.data;
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
            if(siteName === ""){
                toast.error("아이디를 입력해주세요");
                return ;
            }
            const result = await siteApi.getExistsSiteName(siteName);
            if(result.data === true){
                setNameOverlapCheck(false);
            }else{
                setNameOverlapCheck(true);
            }
        } catch (err) {
            console.error(err);
        }
    }, [siteName])

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

    const getApplication = useCallback(async (params:any)=> {
        try {
            const result = await applicationApi.getApplications(params);
            const {totalElements, content}:any = result.data;
            if(result.message === 'Success'){
                setApplications(content);
            }
        }catch (err){

        }
    },[])

    useEffect(()=> {
        const params = {
            page:page,
            size:size,
        }
        getApplication(params);
    },[page,size])

    useEffect(()=> {
        if(allChecked) {
            let list:number[] = [];
            applications.map((data)=> {
                list.push(data.applicationId);
            })
            setSelectedCheckList([...list]);
        }else{
            setSelectedCheckList([]);
        }
    },[allChecked])
    

    useEffect(() => {
        getUser();
    }, [])

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
                                            // onChange={formik.handleChange}
                                            onChange={e => {
                                                formik.handleChange(e)
                                                setNameOverlapCheck(false);
                                                setSiteName(e.currentTarget.value);
                                            }}

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
                                    error={Boolean(formik.touched.userId && formik.errors.userId)}
                                    fullWidth
                                    helperText={formik.touched.userId && formik.errors.userId}
                                    label="관리자"
                                    select
                                    name="userId"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    // required
                                    value={formik.values.userId}
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
                                <FormControlLabel control={<Checkbox name={"siteSso"} value={formik.values.siteSso} onChange={formik.handleChange} />} label={"SSO 여부"} />
                                {/* <FormControlLabel control={<Checkbox name={"delYn"} value={formik.values.delYn} onChange={formik.handleChange} />} label={"사용여부"} /> */}
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
                                            <TableCell>Application name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>URL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            applications.map((data) => (
                                                <TableRow
                                                    key={data.applicationId}
                                                >
                                                    <TableCell><input type="checkbox" onChange={(e) => handleChange(e,data.applicationId)} checked={selectedCheckList.includes(data.applicationId)} /></TableCell>
                                                    <TableCell>{data.applicationName}</TableCell>
                                                    <TableCell>{data.applicationDescription}</TableCell>
                                                    <TableCell>{data.applicationUrl}</TableCell>
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
                {/* <Card>
                   <CardHeader title={"db"} />
                   <CardContent>
                       <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    select
                                    error={Boolean(formik.touched.dbDriver && formik.errors.dbDriver)}
                                    helperText={formik.touched.dbDriver && formik.errors.dbDriver}
                                    name={"dbDriver"}
                                    value={formik.touched.dbDriver}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    >
                                    <MenuItem key={"postgre"} value={"postgre"}>PostgreSQL</MenuItem>
                                    <MenuItem key={"maria"} value={"maria"}>Maria</MenuItem>
                                    <MenuItem key={"oracle"} value={"oracle"}>Oracle</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={Boolean(formik.touched.dbUrl && formik.errors.dbUrl)}
                                    fullWidth
                                    helperText={formik.touched.dbUrl && formik.errors.dbUrl}
                                    label="dbUrl"
                                    name="dbUrl"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.dbUrl}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={Boolean(formik.touched.dbUser && formik.errors.dbUser)}
                                    fullWidth
                                    helperText={formik.touched.dbUser && formik.errors.dbUser}
                                    label="id"
                                    name="dbUser"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.dbUser}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    error={Boolean(formik.touched.dbPassword && formik.errors.dbPassword)}
                                    fullWidth
                                    helperText={formik.touched.dbPassword && formik.errors.dbPassword}
                                    label="password"
                                    name="dbPassword"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.dbPassword}
                                />
                            </Grid>
                        </Grid>
                 </CardContent> 
                 </Card>  */}
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