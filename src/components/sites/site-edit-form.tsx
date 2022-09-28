import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {Site} from "../../types/site";
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {useRouter} from "next/router";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel, FormGroup,
    Grid, MenuItem,
    TextField
} from "@mui/material";
import {siteApi} from "../../apis/site-api";
import {User} from "../../types/user";
import {userApi} from "../../apis/user-api";

interface ISiteEditFormProps {
    site: Site;
}

const SiteEditForm:FC<ISiteEditFormProps> = (props) => {
    const {site,...rest} = props;
    console.log(site);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            // id: null,
            siteId:site.siteId,
            siteName: site.siteName,
            userName: site.userId,
            siteDescription: site.siteDescription,
            siteSso:site.siteSso,
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
                // @ts-ignore
                const result = await siteApi.updateSite(values);
                console.log(result);
                if (result.code === 200) {
                    helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('site updated!');
                    router.push('/sites');
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
        try{
            const result = await siteApi.deleteSite(site.siteId);
            if (result.message === 'Success') {
                toast.success('site delete!');
                router.push('/sites');
            }
        }catch(err){
            console.error(err);
        }
    }

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
        <form
            onSubmit={formik.handleSubmit}
            {...rest}
        >
            <Card>
                <CardHeader title="사이트 정보"/>
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
                                error={Boolean(formik.touched.siteName && formik.errors.siteName)}
                                fullWidth
                                helperText={formik.touched.siteName && formik.errors.siteName}
                                label="사이트이름"
                                name="siteName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.siteName}
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
                                label="관리자"
                                name="userName"
                                select
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.userName}
                            >
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
                                <FormControlLabel control={<Checkbox name={"siteSso"} checked={formik.values.siteSso} onChange={formik.handleChange} />} label={"Sso 사용 여부"}/>
                            </FormGroup>
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
                        Delete site
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default SiteEditForm;