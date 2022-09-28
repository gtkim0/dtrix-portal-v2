import React from 'react';
import type {FC} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField
} from "@mui/material";
import {privilegeApi} from "../../apis/privilege-api";
interface IPrivilegeCreateFormProps {

}

interface IPrivilegeForm {
    privilegeName:string,
    delYn:boolean
}

const PrivilegeCreateForm:FC<IPrivilegeCreateFormProps> = (props) => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            privilegeName: '',
            delYn:false
        },
        validationSchema: Yup.object({
            privilegeName: Yup
                .string()
                .required('name is required'),
        }),
        onSubmit: async (values:IPrivilegeForm, helpers): Promise<void> => {
            try {
                const result = await privilegeApi.createPrivilege(values);
                if(result) {
                    toast.success('created!');
                    router.push('/privilege');
                }

            } catch (err: any) {
                toast.error('Something went wrong!');
                helpers.setStatus({success: false});
                // @ts-ignore
                helpers.setErrors({submit: err.message});
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
                    <CardHeader title="권한 추가"/>
                    <CardContent >
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.privilegeName && formik.errors.privilegeName)}
                                    fullWidth
                                    helperText={formik.touched.privilegeName && formik.errors.privilegeName}
                                    label="권한 이름"
                                    name="privilegeName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.privilegeName}
                                />
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
                        onClick={()=> router.push('/privilege')}
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

export default PrivilegeCreateForm;