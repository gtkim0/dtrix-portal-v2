import React from 'react';
import type {FC} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader, Checkbox,
    Divider,
    FormControlLabel, FormGroup,
    Grid, MenuItem, Switch, TextareaAutosize,
    TextField
} from "@mui/material";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import Link from "next/link";
import {siteApi} from "../../apis/site-api";

interface ISiteCreateFormProps {

}

const SiteCreateForm: FC<ISiteCreateFormProps> = (props) => {

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            siteName: '',
            siteDomain: '',
            siteEnabled:true,
            siteDefault:true,
        },
        validationSchema: Yup.object({
            siteName: Yup
                .string()
                .max(255)
                .required('이름 is required'),
            siteDomain: Yup
                .string()
                .max(255)
                .required('도메인 is required'),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                // @ts-ignore
                const result = await siteApi.createSite(values);
                if (result.code === 200) {
                    toast.success('Site created!');
                    router.push('/sites');
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

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <Card >
                    <CardHeader title="사이트 추가"/>
                    <CardContent >
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
                                    label="사이트 이름"
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
                                    label="관리자"
                                    select
                                    name="siteDomain"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.siteDomain}
                                >
                                    <MenuItem>테스트1</MenuItem>
                                    <MenuItem>테스트2</MenuItem>
                                    <MenuItem>테스트3</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                   rows={5}
                                   fullWidth
                                   multiline
                                   placeholder={"사이트 설명"}
                                />

                            </Grid>
                            {/*<Grid*/}
                            {/*    item*/}
                            {/*    md={6}*/}
                            {/*    xs={12}*/}
                            {/*>*/}
                            {/*    <FormGroup>*/}
                            {/*        <FormControlLabel control={<Checkbox name={"siteEnabled"} checked={formik.values.siteEnabled} onChange={formik.handleChange} />} label={"사이트허용"}/>*/}
                            {/*    </FormGroup>*/}
                            {/*</Grid>*/}

                            {/*<Grid*/}
                            {/*    item*/}
                            {/*    md={6}*/}
                            {/*    xs={12}*/}
                            {/*>*/}
                            {/*    <FormGroup>*/}
                            {/*        <FormControlLabel control={<Checkbox name={"siteDefault"} checked={formik.values.siteDefault} onChange={formik.handleChange} />} label={"사이트허용"}/>*/}
                            {/*    </FormGroup>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </CardContent>
                    {/*<Divider sx={{my: 3}}/>*/}
                </Card>
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
                    <Link href={"/sites"}>
                        <Button
                            sx={{m: 1,ml:'auto'}}
                            variant="outlined"
                        >
                            취소
                        </Button>
                    </Link>
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