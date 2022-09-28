import type { FC } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast, {Toaster} from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField, MenuItem
} from '@mui/material';
import React from "react";
import {Privilege} from "../../types/privilege";
import {privilegeApi} from "../../apis/privilege-api";

interface PrivilegeEditFormProps {
    privilege: Privilege;
}

export const PrivilegeEditForm: FC<PrivilegeEditFormProps> = (props) => {
    const { privilege, ...rest } = props;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            privilegeId: privilege.privilegeId,
            privilegeName: privilege.privilegeName,
            submit: null
        },
        validationSchema: Yup.object({
            privilegeName: Yup
                .string()
                .max(255)
                .required('이름 is required'),
        }),
        onSubmit: async (values: any, helpers: any): Promise<void> => {
            try {
                // @ts-ignore
                const result = await privilegeApi.updatePrivilege(privilege.privilegeId, values);
                console.log(result);
                // TODO 여기 처리해야함
                if (result.code === 0) {
                    // helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('User updated!');
                    router.push('/privilege');
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
        const result = await privilegeApi.deletePrivilege(privilege.privilegeId);
        console.log(result);
        // TODO 처리
        if (result && result.code === 0) {
            router.push('/privilege');
            toast.success('privilege delete!');
        }else {
            toast.error('delete error')
        }
    }

    return (
        <>
        <form
            onSubmit={formik.handleSubmit}
        >
            <Card>
                <CardHeader title="사용자 정보" />
                <Divider />
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
                    <Divider sx={{ my: 3 }} />
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
                        Delete user
                    </Button>
                </CardActions>
            </Card>
        </form>
        </>
    );
};

PrivilegeEditForm.propTypes = {
    // @ts-ignore
    user: PropTypes.object
};
