import type { FC } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
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
import {Group} from "../../types/group";
import {groupApi} from "../../apis/group-api";

interface GroupEditFormProps {
    group: Group;
}

export const GroupEditForm: FC<GroupEditFormProps> = (props) => {
    const { group, ...rest } = props;
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            groupId: group.groupId,
            groupName: group.groupName,
            groupDescription: group.groupDescription,
            submit: null
        },
        validationSchema: Yup.object({
            groupName: Yup
                .string()
                .max(255)
                .required('이름 is required'),
            groupDescription: Yup
                .string()
                .required('설명 is required'),
        }),
        onSubmit: async (values: any, helpers: any): Promise<void> => {
            try {
                // @ts-ignore
                const result = await groupApi.updateGroup(group.groupId, values);
                console.log(result);
                // TODO 여기 처리해야함
                if (result.code === 0) {
                    // helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                    toast.success('User updated!');
                    router.push('/group');
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
        const result = await groupApi.deleteGroup(group.groupId);
        console.log(result);
        // TODO 처리
        if (result && result.code === 0) {
            toast.success('User delete!');
            router.push('/group');
        }
    }

    return (
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
                                error={Boolean(formik.touched.groupName && formik.errors.groupName)}
                                fullWidth
                                helperText={formik.touched.groupName && formik.errors.groupName}
                                label="그룹 아이디"
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
                                label="설명"
                                name="groupDescription"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.groupDescription}
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
    );
};

GroupEditForm.propTypes = {
    // @ts-ignore
    user: PropTypes.object
};
