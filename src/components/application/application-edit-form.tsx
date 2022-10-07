import React, {useState, useEffect} from 'react';
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

import {Application} from "../../types/application";
import {applicationApi} from "../../apis/application-api";

interface IApplicationEditFormProps {
    application: Application;
}

const ApplicationEditForm:FC<IApplicationEditFormProps> = (props) => {
    const {application,...rest} = props;
    console.log(application);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            applicationId: application.applicationId,
            applicationName: application.applicationName,
            applicationDescription: application.applicationDescription,
            applicationUrl: application.applicationUrl,
            delYn:false,
            submit: null
        },
        validationSchema: Yup.object({
            applicationName: Yup
                .string()
                .max(255)
                .required('아이디 is required'),
            applicationDescription: Yup
                .string()
                .max(255)
                .required('domain is required'),
        }),
        onSubmit: async (values, helpers): Promise<void> => {
            try {
                // @ts-ignore
                const result = await applicationApi.updateApplication(values);
                console.log(result);
                if (result.code === 200) {
                    helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('site updated!');
                    router.push('/application');
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
            const result = await applicationApi.deleteApplication({ applicationId: application.applicationId, delYn:true});
            if (result.message === 'Success') {
                toast.success('application delete!');
                router.push('/application');
            }
        }catch(err){
            console.error(err);
        }
    }

    const [url,setUrl] = useState<any[]>([]);

    const getRegisted = async () => {
        try {
            let list = [];
            let newList =[];
            const response =  await applicationApi.getApplicationUnRegisterd();
            list.push(response.data);
            newList = list[0].concat(application.applicationUrl);
            setUrl(newList);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        getRegisted();
    },[])

    if(!application) {
        return null;
    }

    return (
        <form
            onSubmit={formik.handleSubmit}
            {...rest}
        >
            <Card>
                <CardHeader title="어플리케이션 정보"/>
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
                                error={Boolean(formik.touched.applicationName && formik.errors.applicationName)}
                                fullWidth
                                helperText={formik.touched.applicationName && formik.errors.applicationName}
                                label="어플리케이션 이름"
                                name="applicationName"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.applicationName}
                            />
                        </Grid>

                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.applicationDescription && formik.errors.applicationDescription)}
                                fullWidth
                                helperText={formik.touched.applicationDescription && formik.errors.applicationDescription}
                                label="설명"
                                name="applicationDescription"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                value={formik.values.applicationDescription}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                error={Boolean(formik.touched.applicationUrl && formik.errors.applicationUrl)}
                                fullWidth
                                helperText={formik.touched.applicationUrl && formik.errors.applicationUrl}
                                label="url"
                                name="applicationUrl"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                required
                                select
                                value={formik.values.applicationUrl}
                            >
                                {
                                    url.map((data)=> (
                                        <MenuItem key={data} value={data}>{data}</MenuItem>
                                    ))
                                }
                            </TextField>
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
                        Delete application
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

export default ApplicationEditForm;