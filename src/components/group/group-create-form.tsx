import React from 'react';
import type {FC} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {groupApi} from "../../apis/group-api";
import {useRouter} from "next/router";
import {
    Box, Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    TextField
} from "@mui/material";
interface IGroupCreateFormProps {

}

interface IGroupForm {
    groupName:string,
    groupDescription:string,
    delYn:boolean
}

const GroupCreateForm:FC<IGroupCreateFormProps> = (props) => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            groupName: '',
            groupDescription:'',
            delYn:false
        },
        validationSchema: Yup.object({
            groupName: Yup
                .string()
                .required('name is required'),
            groupDescription: Yup
                .string()
                .required('description is required')
        }),
        onSubmit: async (values:IGroupForm, helpers): Promise<void> => {
            try {
                const result = await groupApi.createGroup(values);
                if(result) {
                    toast.success('created!');
                    router.push('/group');
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
    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <Card >
                    <CardHeader title="그룹 추가"/>
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
                                    error={Boolean(formik.touched.groupName && formik.errors.groupName)}
                                    fullWidth
                                    helperText={formik.touched.groupName && formik.errors.groupName}
                                    label="그룹 이름"
                                    name="groupName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    required
                                    value={formik.values.groupName}
                                />
                            </Grid>

                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                                <TextField
                                    error={Boolean(formik.touched.groupDescription && formik.errors.groupDescription)}
                                    fullWidth
                                    helperText={formik.touched.groupDescription && formik.errors.groupDescription}
                                    label={"그룹 설명"}
                                    name={"groupDescription"}
                                    rows={5}
                                    multiline
                                    placeholder={"그룹 설명"}
                                    onChange={formik.handleChange}
                                    value={formik.values.groupDescription}
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
                        onClick={()=> router.push('/group')}
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

export default GroupCreateForm;