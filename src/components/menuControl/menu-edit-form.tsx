import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import {
    Box, Container, Card, Divider, Grid,
    TextField, Typography, Button, FormControlLabel, Checkbox, MenuItem,
    TableHead, TableCell, Table, TableBody, TableRow

} from '@mui/material';
import { useFormik } from "formik";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index'
import { getSidePrivilegeMenus } from '../../store/slice/menuSlice';
import { privilegeApi } from '../../apis/privilege-api';
import _, { isElement, isEmpty } from 'lodash';
import { menuApi } from '../../apis/menu-api';

interface IMenuEditFormProps {
    handleClose: any;
    editMenuInfo: any;
    selectEditMenuInfo: any
}

const MenuEditForm: FC<IMenuEditFormProps> = (props) => {
    const dispatch = useDispatch();
    const sideMenuList: any = useSelector((state: RootState) => state.menu.menuList);
    const { handleClose, editMenuInfo, selectEditMenuInfo } = props;
    const [newSelect, setNewSelect] = useState(selectEditMenuInfo);
    const [privilege, setPrivilege] = useState<any>();
    const [newPrivilege, setNewPrivilege] = useState<any>();
    const [selectedPrivilegeGroup, setSelectedPrivilegeGroup] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [menuPublicYn, setMenuPublicYn] = useState(false);
    const [menuUseYn, setMenuUseYn] = useState(false);
    const [privilegeGroup, setPrivilegeGroup] = useState<any>({
        privilegeId: 0,
        selectYn: false,
        insertYn: false,
        updateYn: false,
        delYn: false
    });

    const formik = useFormik({
        initialValues: {
            siteId: 1,
            menuId: selectEditMenuInfo?.menuId,
            menuName: selectEditMenuInfo?.menuName,        //메뉴 이름
            menuParent: selectEditMenuInfo?.menuParent,       //상위 메뉴
            menuPublicYn: selectEditMenuInfo?.menuPublicYn,
            menuOrder: selectEditMenuInfo?.menuOrder ? selectEditMenuInfo.menuOrder : 0,
            menuPrivilege: '0' as any,
            menuDepth: selectEditMenuInfo?.menuDepth,
            menuUrl: selectEditMenuInfo?.menuUrl
        },
        onSubmit: async (values, helpers): Promise<void> => {
            const body = {
                siteId: values.siteId,
                menuId: values.menuId,
                menuName: values.menuName,
                menuPublicYn: menuPublicYn ? 'Y' : 'N',
                menuPrivilege: selectedPrivilegeGroup,
                menuOrder: values.menuOrder,
                menuUseYn: menuUseYn ? 'Y' : 'N',
                menuDepth: values.menuDepth,
                menuUrl: values.menuUrl,
                menuParent: values.menuParent
            }

            try {
                const result = await menuApi.updateMenu(body);
                if (Number(result) > 0) {
                    helpers.setSubmitting(false);
                    toast.success('menu updated!');
                    handleClose();
                } else {
                    toast.error('menu update fail')
                }
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong!');
                helpers.setStatus({ success: false });
                helpers.setSubmitting(false);
            }
        }
    })

    // 전체 권한 그룹 불러오는 api
    const getPrivileges = async ({ page, size }: any) => {
        try {
            const result = await privilegeApi.getPrivileges({ page: page, size: size });
            setPrivilege(result.data.list);
        } catch (err) {
            console.error(err);
        }
    }

    const handlePrivilegeChange = (e: any) => {
        setPrivilegeGroup({
            ...privilegeGroup,
            privilegeId: e.target.value
        })
    }

    const handleAddPrivilege = useCallback(() => {
        setSelectedPrivilegeGroup((prevState: any) => [...prevState, privilegeGroup])
        setPrivilegeGroup({
            privilegeId: 0,  //초기값으로 변경시켜야함.
            selectYn: false,
            insertYn: false,
            updateYn: false,
            delYn: false
        })
    }, [privilegeGroup])

    const handlePrivilegeRemove = (data1: any) => {
        let list: any = [];
        selectedPrivilegeGroup.filter((data: any) => data.privilegeId !== data1.privilegeId).map((data: any) => {
            list.push(data);
        })
        setSelectedPrivilegeGroup(list);
    }

     // 각 권한에 읽기,쓰기삭제 등 저장하는함수
     const handlePrivilegeCheckChange = (e: any) => {
        const { name, checked } = e.target;
        setPrivilegeGroup({
            ...privilegeGroup,
            [name]: checked
        })
    }

    const handleMenuPublicChange = () => {
        setMenuPublicYn(prev => !prev);
    }

    const handleMenuUseYn = () => {
        setMenuUseYn(prev => !prev);
    }

    useEffect(() => {
        if (selectEditMenuInfo) {
            setMenuPublicYn(selectEditMenuInfo.menuPublicYn === "Y" ? true : false);
            setSelectedPrivilegeGroup(selectEditMenuInfo.privilegeList);
        }
    }, [selectEditMenuInfo])

    const [restPrivilege, setRestPrivilege] = useState<any>();
    useEffect(() => {
        if (privilege) {
            let a = privilege.filter((item: any) => selectedPrivilegeGroup.every((i: any) => i.privilegeId !== item.privilegeId))
            setRestPrivilege(a);
        }

    }, [selectedPrivilegeGroup])

    useEffect(() => {
        getPrivileges({ page, size })
    }, [page, size])

    useEffect(() => {
        // TODO 사이트 아이디 우선 1번 고정, 추후 사이트 아이디 값 넣어줘야함.
        let body = {
            menu_id: editMenuInfo.menuId,
            site_id: 1
        }
        dispatch(getSidePrivilegeMenus(body))
    }, [editMenuInfo])

    useEffect(() => {
        if (!isEmpty(selectEditMenuInfo)) {
            formik.setValues({
                ...selectEditMenuInfo
            })
        }
    }, [selectEditMenuInfo])

    if (!selectEditMenuInfo) {
        return <></>;
    }

    return (
        <>
            <form
                onSubmit={formik.handleSubmit}
                {...props}
            >
                <Card>
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    메뉴명
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    name="menuName"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.menuName}
                                />
                            </Grid>

                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    상위메뉴
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                                <TextField
                                    name="menuParent"
                                    required
                                    select
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.menuParent}
                                    sx={{ width: 250 }}
                                >
                                    {
                                        sideMenuList.map((data: any) => (
                                            <MenuItem key={data.menuId} value={data.menuId}>{data.menuName}</MenuItem>
                                        ))
                                    }

                                </TextField>
                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    권한
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{ display: 'flex' }}
                                md={10}
                                xs={12}
                            >
                                <TextField
                                    name="menuPrivilege"
                                    select
                                    onChange={handlePrivilegeChange}
                                    sx={{ width: 250 }}
                                >
                                    <MenuItem key="0" value="0">권한 선택</MenuItem>
                                    {restPrivilege?.map((data: any) => (
                                        <MenuItem value={data.privilegeId} key={data.privilegeId}>{data.privilegeName}</MenuItem>
                                    ))}
                                </TextField>
                                {
                                    Number(privilegeGroup.privilegeId) !== 0 &&
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{ px: 2 }}>
                                            <label>select</label>
                                            <input name="selectYn" onChange={handlePrivilegeCheckChange} type="checkbox" />
                                        </Box>
                                        <Box sx={{ px: 2 }}>
                                            <label>insert</label>
                                            <input name="insertYn" onChange={handlePrivilegeCheckChange} type="checkbox" />
                                        </Box>
                                        <Box sx={{ px: 2 }}>
                                            <label>update</label>
                                            <input name="updateYn" onChange={handlePrivilegeCheckChange} type="checkbox" />
                                        </Box>
                                        <Box sx={{ px: 2 }}>
                                            <label>del</label>
                                            <input name="delYn" onChange={handlePrivilegeCheckChange} type="checkbox" />
                                        </Box>
                                        <Button onClick={handleAddPrivilege} variant="contained">추가</Button>
                                    </Box>
                                }
                            </Grid>
                            {
                                selectedPrivilegeGroup && selectedPrivilegeGroup.length > 0 &&
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableCell>
                                                권한명
                                            </TableCell>
                                            <TableCell>
                                                보기
                                            </TableCell>
                                            <TableCell>
                                                생성
                                            </TableCell>
                                            <TableCell>
                                                수정
                                            </TableCell>
                                            <TableCell>
                                                삭제
                                            </TableCell>
                                            <TableCell>

                                            </TableCell>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                selectedPrivilegeGroup.map((data: any) => (
                                                    <TableRow key={data.privilegeId}>
                                                        <TableCell>
                                                            {data.privilegeId}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.selectYn ? "Y" : "N"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.insertYn ? "Y" : "N"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.updateYn ? "Y" : "N"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {data.delYn ? "Y" : "N"}
                                                        </TableCell>
                                                        <TableCell sx={{ width: '100px' }}>
                                                            <Button onClick={() => handlePrivilegeRemove(data)} variant='contained'>삭제</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            }
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    public
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                                <FormControlLabel control={<Checkbox name="menuPublicYn" checked={menuPublicYn} value={menuPublicYn} onChange={handleMenuPublicChange} />} label="" />
                            </Grid>
                            <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    useYn
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                                <FormControlLabel control={<Checkbox name="menuUseYn" checked={menuUseYn} value={menuUseYn} onChange={handleMenuUseYn} />} label="" />
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                sx={{ textAlign: 'center' }}
                            >
                                <Button type="submit" sx={{ m: 2 }} variant='contained'>수정</Button>
                                <Button onClick={handleClose} variant='contained'>취소</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default MenuEditForm;