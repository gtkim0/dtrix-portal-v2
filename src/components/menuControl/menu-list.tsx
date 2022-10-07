import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Checkbox, Table, TableHead, 
    TableRow, TableCell, Typography, Link, FormGroup,
     FormControlLabel, Button , TablePagination } from '@mui/material';
import NextLink from "next/link";
import TableBody from '@mui/material/TableBody';
import {styled} from '@mui/system';
import MenuEditModal from './modal/menuEditModal';
import MenuDeleteModal from './modal/menuDeleteModal';
import { menuApi } from '../../apis/menu-api';
import { toast } from 'react-hot-toast';
import {MenuType} from '../../types/menu';

interface IMenuListTableProps {

}
const StyledTableCell = styled(TableCell)({
    textAlign:'center',
    whiteSpace:'nowrap'
})

const StyledTypography = styled(Typography)({
    textAlign:'center',
    whiteSpace:"nowrap"
})


const MenuListTable: FC<IMenuListTableProps> = () => {

    // 수정 modal state
    const [editOpen,setEditOpen] = useState(false);
    // 삭제 modal state
    const [deleteOpen,setDeleteOpen] = useState(false);
    const [deleteMenu,setDeleteMenu] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);

    // 메뉴 리스트
    const [menuList,setMenuList] = useState<any>();

    const [editMenuInfo,setEditMenuInfo] = useState<any>();
    // 메뉴 팝업 컨트롤
    
    const handleEditOpen = async (menu:any) => {
        await setEditMenuInfo(menu)
        setEditOpen(true);
    }
    const handleDeleteOpen = (menu:any) => {
        setDeleteOpen(true);
        setDeleteMenu(menu);
    }
    // 수정 팝업
    const editModalClose = () => {
        setEditOpen(false);
    }
    // 삭제 팝업
    const deleteModalClose = () => {
        setDeleteOpen(false);
    }
    
    //TODO 메뉴불러오는 api 적용해야함.
    const getMenuList = async({siteId,currentPage}:any) => {
        try {
            // TODO site_id 현재 하드코딩 , 추후 변경필요
            const result:any = await menuApi.getMenus({site_id:1,currentPage:currentPage});
            console.log(result);
            setMenuList(result.menuInfoList);
            setTotalCount(result.menuInfoPaging.totalRecordCount);
        }catch(err:any){
            toast.error(err);
        }
    }

    const handlePageChange = (e:any, newPage:number) => {
        setCurrentPage(newPage);
    }

    useEffect(()=> {
        getMenuList({site_id:1,currentPage:currentPage});
    },[currentPage])

    if(!menuList) {
        return <></>
    }

    return (
        <>
            <div>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow sx={{ background: 'lightGray' }}>
                            <TableCell sx={{ pl: 4, }}>
                                메뉴 아이디
                            </TableCell>
                            <StyledTableCell>
                                메뉴 이름
                            </StyledTableCell>
                            <StyledTableCell>
                                상위 메뉴
                            </StyledTableCell>
                            <StyledTableCell>
                                메뉴 설명
                            </StyledTableCell>
                            <StyledTableCell>
                                public
                            </StyledTableCell>
                            <StyledTableCell>
                                수정
                            </StyledTableCell>
                            <StyledTableCell>
                                삭제
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {menuList.map((menu:any) => (
                            <TableRow
                                hover
                                key={menu.menuId}
                            >
                                <TableCell sx={{ pl: 5, width: "20%" }}>
                                    <NextLink href={`/menu/${menu.menuId}`}>
                                        <Link>
                                            <Typography sx={{ cursor: 'pointer' }}>
                                                {menu.menuId}
                                            </Typography>
                                        </Link>
                                    </NextLink>
                                </TableCell>
                                <TableCell>
                                    <StyledTypography>
                                        {menu.menuName}
                                    </StyledTypography>
                                </TableCell>
                                <TableCell>
                                    <StyledTypography>
                                        {menu.upMenuId}
                                    </StyledTypography>
                                </TableCell>
                                <TableCell>
                                    <StyledTypography>
                                        {menu.menuComment}
                                    </StyledTypography>
                                </TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormControlLabel sx={{ justifyContent: "center", margin: '0 auto' }} control={<Checkbox disabled sx={{ cursor: 'text' }} checked={ menu.menuPublicYn=== "Y" ? true : false} onChange={() => { }} />} label={""} />
                                    </FormGroup>
                                </TableCell>
                                <TableCell sx={{textAlign:'center'}}>
                                    <Button onClick={()=>handleEditOpen(menu)}>수정</Button>
                                </TableCell>
                                <TableCell sx={{textAlign:'center'}}>
                                    <Button  onClick={()=>handleDeleteOpen(menu)}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={totalCount}
                    onPageChange={handlePageChange}
                    // onRowsPerPageChange={onRowsPerPageChange}
                    page={currentPage}
                    rowsPerPage={10}
                    rowsPerPageOptions={[10,50,100]}
                    sx={(theme) => ({
                        ".MuiTablePagination-toolbar": {
                            height: 56,
                        },
                        ".MuiTablePagination-selectLabel": {
                            color: theme.palette.text.secondary,
                            lineHeight: 1.66,
                        },
                    })}
                />
                <MenuEditModal editMenuInfo={editMenuInfo} open={editOpen} handleClose={editModalClose}/>
                <MenuDeleteModal deleteMenu={deleteMenu} open={deleteOpen} handleClose={deleteModalClose} />
            </div>
           
        </>
    )
}

export default MenuListTable;