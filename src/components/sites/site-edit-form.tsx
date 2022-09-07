import React from 'react';
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
    Grid,
    TextField
} from "@mui/material";
import {siteApi} from "../../apis/site-api";

interface ISiteEditFormProps {
    site: Site;
}

const SiteEditForm:FC<ISiteEditFormProps> = (props) => {
    const {site,...rest} = props;
    console.log(site);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            id: null,
            siteId:site.siteId,
            siteName: '',
            siteDomain: '',
            siteEnabled: true,
            siteDefault:true,
            submit: null
        },
        validationSchema: Yup.object({
            siteName: Yup
                .string()
                .max(255)
                .required('아이디 is required'),
            siteDomain: Yup
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
                                error={Boolean(formik.touched.siteDomain && formik.errors.siteDomain)}
                                fullWidth
                                helperText={formik.touched.siteDomain && formik.errors.siteDomain}
                                label="사이트도메인"
                                name="siteDomain"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.siteDomain}
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name={"siteEnabled"} checked={formik.values.siteEnabled} onChange={formik.handleChange} />} label={"사이트허용"}/>
                            </FormGroup>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name={"siteDefault"} checked={formik.values.siteDefault} onChange={formik.handleChange} />} label={"사이트허용"}/>
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