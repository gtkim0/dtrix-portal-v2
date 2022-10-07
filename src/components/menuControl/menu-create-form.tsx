import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import {
    Card,
    Grid,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    MenuItem,
    Autocomplete,
    Table, TableRow, TableCell, TableHead, TableBody, Box
} from '@mui/material';
import { useFormik } from "formik";
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader/CardHeader';
import { menuApi } from '../../apis/menu-api';
import { privilegeApi } from '../../apis/privilege-api';
import { MenuType } from '../../types/menu';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {closeMenu, openMenu} from '../../store/slice/menuSlice';


interface IMenuCreateFormProps {
    handleClose: any;
}

const MenuCreateForm: FC<IMenuCreateFormProps> = (props) => {

    const dispatch = useDispatch(); 
    // dispatch(openMenu());   
    const { handleClose } = props;
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(100);
    const [privilege, setPrivilege] = useState<any>();
    const [upMenuList, setUpMenuList] = useState<any>([]);
    const [privilegeGroup, setPrivilegeGroup] = useState<any>({
        privilegeId: 0,
        selectYn: false,
        insertYn: false,
        updateYn: false,
        delYn: false
    });
    const [selectedPrivilegeGroup, setSelectedPrivilegeGroup] = useState<any>([]);
    const [menuPublicYn, setMenuPublicYn] = useState(false);

    const formik = useFormik({
        initialValues: {
            siteId: 1,
            menuName: '',        //메뉴 이름
            menuParent: '0',       //상위 메뉴
            menuPrivilege: '0' as any ,   //권한 설정
        },
        onSubmit: async (values, helpers): Promise<void> => {
            const body = {
                siteId:values.siteId,
                menuName:values.menuName,
                menuParent:values.menuParent,
                menuPublicYn:menuPublicYn ? 'Y' : 'N',
                menuPrivilege: selectedPrivilegeGroup
            }
            try {
                const result = await menuApi.createMenu(body);
                if(Number(result) > 0) {
                    handleClose();
                    toast.success('메뉴 생성완료');
                    dispatch(closeMenu());
                }else{
                    toast.error('메뉴 생성 오류')
                }
            } catch (err) {
                console.error('메뉴 생성 오류',err);
            }
        }
    })

    // 권한 그룹 불러오는 api
    const getPrivileges = async ({ page, size }: any) => {
        try {
            const result = await privilegeApi.getPrivileges({ page: page, size: size });
            let namePrivilege: String[] = [];
            if (result) {
                result.data.list.map((data: any) => {
                    namePrivilege.push(data);
                })
            }
            setPrivilege(namePrivilege);
        } catch (err) {

        }
    }

    // 페이징 없이 메뉴 리스트 불러오는 api
    const getSideMenus = useCallback(async () => {
        const site_id = 1;
        try {
            const result = await menuApi.getSideMenus({ site_id: site_id });
            setUpMenuList(result);
        } catch (err) {

        }
    }, [])

    const handlePrivilegeChange = (e: any) => {
        setPrivilegeGroup({
            ...privilegeGroup,
            privilegeId: e.target.value
        })
    }

    const handlePrivilegeCheckChange = (e: any) => {
        const { name, checked } = e.target;
        setPrivilegeGroup({
            ...privilegeGroup,
            [name]: checked
        })
    }

    const handleMenuPublicChange = () => {
        setMenuPublicYn(prev=>!prev);
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

    useEffect(()=> {
        let list:any = [];
        if(privilege){
            privilege.map((data:any)=> {
                let id = data.privilegeId;
                selectedPrivilegeGroup.map((data1:any)=> {
                    if(id !== data1.privilegeId) {
                        list.push(data);
                    }
                })
            })
        }
        setPrivilege([...list]);
    },[selectedPrivilegeGroup])

    useEffect(() => {
        getSideMenus();
    }, [])

    useEffect(() => {
        getPrivileges({ page, size })
    }, [page, size])

    if (!privilege) {
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
                                    {/* TODO 추후에 데이터받아와서 넣어주기 */}
                                    {/* <MenuItem key=" " value=" ">없음</MenuItem> */}
                                    {
                                        upMenuList.map((data: any) => (
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
                                {/* <Autocomplete
                                    value={formik.values.menuAuthority}
                                    onChange={formik.handleChange}
                                    options={privilege}
                                    onInputChange={(e,newInputValue)=> {
                                        setInputValue(newInputValue);
                                    }}

                                    inputValue={inputValue}
                                    sx={{width:250}}
                                    renderInput={(params)=>
                                        <TextField {...params} label={"그룹 추가"} />
                                    }
                                /> */}
                                <TextField
                                    select
                                    name="menuPrivilege"
                                    // onBlur={formik.handleBlur}
                                    // value={formik.values.menuPrivilege}
                                    // value={}
                                    onChange={handlePrivilegeChange}
                                    sx={{ width: 250 }}
                                >
                                    <MenuItem key="0" value="0">권한 선택</MenuItem>
                                    {privilege.map((data: any) => (
                                        <MenuItem value={data.privilegeId} key={data.privilegeId}>{data.privilegeName}</MenuItem>
                                    ))}


                                </TextField>
                                {
                                    privilegeGroup.privilegeId !== 0 &&
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
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </Grid>
                            }
                            
                            <Grid
                                item
                                md={12}
                                xs={12}
                            >
                            </Grid>

                            {/* <Grid
                                item
                                md={2}
                                xs={12}
                                sx={{ display: "flex" }}
                            >
                                <Typography sx={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    설명
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                md={10}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    name="menuDescription"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.menuDescription}
                                >
                                </TextField>
                            </Grid> */}
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
                                <FormControlLabel control={<Checkbox name="menuPublicYn" value={menuPublicYn} onChange={handleMenuPublicChange} />} label="" />
                            </Grid>
                            <Grid
                                item
                                md={12}
                                xs={12}
                                sx={{ textAlign: 'center' }}
                            >
                                <Button type="submit" sx={{ m: 2 }} variant='contained'>생성</Button>
                                <Button onClick={handleClose} variant='contained'>취소</Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </form>
        </>
    )
}

export default MenuCreateForm;