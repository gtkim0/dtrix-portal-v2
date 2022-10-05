import React, { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { Site } from "../../types/site";
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from "next/router";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel, FormGroup,
    Grid, MenuItem,
    TextField,
    Table,TableHead,TableBody, TableRow,TableCell,Box
} from "@mui/material";
import { siteApi } from "../../apis/site-api";
import { User } from "../../types/user";
import { userApi } from "../../apis/user-api";
import { relationApi } from '../../apis/relation-api';

interface ISiteEditFormProps {
    site: Site;
    applicationList: any;
    relationList:any;
}

const SiteEditForm: FC<ISiteEditFormProps> = (props) => {
    const { site, applicationList,relationList, ...rest } = props;
    console.log(site);
    const [siteName,setSiteName] = useState<any>('');
    const [nameOverlapCheck,setNameOverlapCheck] = useState(false);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            // id: null,
            siteId: site.siteId,
            siteName: site.siteName,
            userId: site.userId,
            siteDescription: site.siteDescription,
            siteSso: site.siteSso,
            delYn: site.delYn,
            submit: null
        },
        validationSchema: Yup.object({
            siteName: Yup
                .string()
                .max(255)
                .required('아이디 is required'),
            siteDescription: Yup
                .string()
                .max(255)
                .required('domain is required'),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {

                if(!nameOverlapCheck) {
                    alert("사이트 이름 중복검사 필요");
                    return ;
                }

                // @ts-ignore
                const result = await siteApi.updateSite(values);
                if (result && result.code === 200) {

                    await relationApi.deleteSiteRelation(site.siteId);
                    await relationApi.createSiteRelation({siteId:site.siteId,applicationIdList:selectedCheckList})

                    helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('site updated!');
                    router.push('/sites');
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
        try {
            const result = await siteApi.deleteSite(site.siteId);
            if (result.message === 'Success') {
                toast.success('site delete!');
                router.push('/sites');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [users, setUsers] = useState<User[]>([]);
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


    const [allChecked, setAllChecked] = useState<boolean>(false);
    const [selectedCheckList, setSelectedCheckList] = useState<number[]>([]);

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
            applicationList?.content.map((data:any)=> {
                list.push(data.applicationId);
            })
            setSelectedCheckList([...list]);
        }else{
            setSelectedCheckList([]);
        }
    },[allChecked])

    useEffect(()=> {
        if(relationList && relationList.length >0) {
            let list:number[] = []
            relationList.map((data:any)=> {
                list.push(data.applicationId);
            })
            setSelectedCheckList(list);
        }
    },[relationList])

    useEffect(()=> {
        if(site){
            setSiteName(site?.siteName);
        }
    },[site])


    useEffect(() => {
        getUser();
    }, [])

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


    if(!applicationList) {
        return <></>
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            {...rest}
        >
            <Card>
                <CardHeader title="사이트 정보" />
                <Divider />
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
                            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                            <Box sx={{width:'100%'}}>
                            <TextField
                                error={Boolean(formik.touched.siteName && formik.errors.siteName)}
                                fullWidth
                                helperText={formik.touched.siteName && formik.errors.siteName}
                                label="사이트이름"
                                name="siteName"
                                onBlur={formik.handleBlur}
                                onChange={e => {
                                    formik.handleChange(e)
                                    setNameOverlapCheck(false);
                                    setSiteName(e.currentTarget.value);
                                }}
                                required
                                value={formik.values.siteName}
                            />
                            </Box>
                            <Button onClick={handleCheckSiteName} sx={{ position: 'absolute', right: '0', my: 'auto' }}>중복검사</Button>
                            </Box>
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.userId && formik.errors.userId)}
                                fullWidth
                                helperText={formik.touched.userId && formik.errors.userId}
                                label="관리자"
                                name="userId"
                                select
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
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
                                label="목적"
                                name="siteDescription"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.siteDescription}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name={"siteSso"} checked={formik.values.siteSso} onChange={formik.handleChange} />} label={"Sso 사용 여부"} />
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Grid
                        container
                        spacing={3}
                    >
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
                                    applicationList.content.map((data:any) => (
                                        <TableRow
                                            key={data.applicationId}
                                        >
                                            <TableCell><input type="checkbox" onChange={(e) => handleChange(e, data.applicationId)} checked={selectedCheckList.includes(data.applicationId)} /></TableCell>
                                            <TableCell>{data.applicationName}</TableCell>
                                            <TableCell>{data.applicationDescription}</TableCell>
                                            <TableCell>{data.applicationUrl}</TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>

                    </Grid>
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
                            router.push('/sites')
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        disabled={formik.isSubmitting}
                        onClick={handleDelete}
                    >
                        Delete site
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default SiteEditForm;