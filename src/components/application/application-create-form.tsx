import React, {useEffect, useState, useCallback} from 'react';
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
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/router";
import {useFormik} from "formik";
import Link from "next/link";
import {applicationApi} from "../../apis/application-api";

interface IApplicationCreateFormProps {

}

const ApplicationCreateForm:FC<IApplicationCreateFormProps> = (props) => {
    const router = useRouter();
    const [nameOverlapCheck,setNameOverlapCheck] = useState(false);
    const [applicationName,setApplicationName] = useState<string>('');
    const [url,setUrl] = useState<any[]>([]);

    const formik = useFormik({
        initialValues: {
            applicationName:'',
            applicationDescription:'',
            applicationUrl:''
        },
        validationSchema:Yup.object({

        }),
        onSubmit: async (values,helpers) : Promise<void> => {
            try {

                if(!nameOverlapCheck) {
                    toast.error("이름 중복검사 필요")
                }

                const result = await applicationApi.createApplication(values);
                if(result && result.code ===200) {
                    toast.success("application created!");
                    router.push('/application');
                }
            } catch (err) {
                toast.error('fail');
                helpers.setStatus({success: false});
                // @ts-ignore
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        }
    })

    const handleCheckExist = useCallback( async ()=> {
        try {
            if(applicationName === ""){
                toast.error('이름을 입력해주세요')
                setNameOverlapCheck(false);
                return ;
            }
            const result = await applicationApi.getExistsApplication(applicationName);
            if (result.data === true) {
                toast.error('중복된 이름입니다.');
                setNameOverlapCheck(false);
            } else {
                toast.success('사용 가능한 이름입니다.');
                setNameOverlapCheck(true);
            }
        } catch (err) {
            console.error(err);
        }
    },[applicationName])

    const getRefisted = async () => {
        try {
           const response =  await applicationApi.getApplicationUnRegisterd();
           console.log(response);
           setUrl(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        getRefisted();
    },[])


    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                {/*<Typography variant={"h3"}>사이트 추가</Typography>*/}
                <Card >
                    <CardHeader title="어플리케이션 추가"/>
                    <CardContent >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={12}
                                xs={12}
                                // sx={{display:'flex'}}
                            >
                                <Box sx={{ position: 'relative' }}>
                                    <Box sx={{ width: '100%',display: 'flex', alignItems: 'center' }}>
                                        <TextField
                                            error={Boolean(formik.touched.applicationName && formik.errors.applicationName)}
                                            fullWidth
                                            helperText={formik.touched.applicationName && formik.errors.applicationName}
                                            label="이름"
                                            name="applicationName"
                                            onBlur={formik.handleBlur}
                                            onChange={e => {
                                                formik.handleChange(e)
                                                setNameOverlapCheck(false);
                                                setApplicationName(e.currentTarget.value);
                                            }}
                                            required
                                            value={formik.values.applicationName}
                                        />
                                        <Button onClick={handleCheckExist} sx={{ position: 'absolute', right: '0', my: 'auto',mr:2 }} variant={"contained"}>중복 체크</Button>
                                    </Box>
                                </Box>
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
                                    label={"사이트 설명"}
                                    name={"applicationDescription"}
                                    rows={5}
                                    multiline
                                    placeholder={"사이트 설명"}
                                    onChange={formik.handleChange}
                                    value={formik.values.applicationDescription}
                                />

                            </Grid>

                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                {/*<TextField*/}
                                {/*    error={Boolean(formik.touched.applicationUrl && formik.errors.applicationUrl)}*/}
                                {/*    fullWidth*/}
                                {/*    helperText={formik.touched.applicationUrl && formik.errors.applicationUrl}*/}
                                {/*    label="어플리케이션 url"*/}
                                {/*    name="applicationUrl"*/}
                                {/*    onBlur={formik.handleBlur}*/}
                                {/*    onChange={formik.handleChange}*/}
                                {/*    // required*/}
                                {/*    value={formik.values.applicationUrl}*/}
                                {/*/>*/}
                                <TextField
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name={"applicationUrl"}
                                    fullWidth
                                    label={"어플리케이션 url"}
                                    helperText={formik.touched.applicationUrl && formik.errors.applicationUrl}
                                >
                                    {
                                        url.map((data,index)=>(
                                            <MenuItem value={data} key={data}>{data}</MenuItem>
                                        ))
                                    }
                                </TextField>


                            </Grid>
                        </Grid>
                    </CardContent>
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

                    <Button
                        sx={{m: 1,ml:'auto'}}
                        variant="outlined"
                        onClick={()=> router.push('/application')}
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

export default ApplicationCreateForm;