import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Checkbox, Table, TableHead, TableRow, TableCell, Typography, Link, FormGroup, FormControlLabel, Button } from '@mui/material';
import NextLink from "next/link";
import TableBody from '@mui/material/TableBody';
import {styled} from '@mui/system';
import MenuEditModal from './modal/menuEditModal';
import MenuDeleteModal from './modal/menuDeleteModal';
import { menuApi } from '../../apis/menu-api';
import { toast } from 'react-hot-toast';

interface IMenuListTableProps {

}

const dummyData = [
    {
        id: 1,
        parentMenu: '',
        menuName: '메뉴1',
        public: true,
        use: true,
        level: 1
    },
    {
        id: 2,
        parentMenu: '메뉴1',
        menuName: '메뉴1-1',
        public: true,
        use: true,
        level: 2
    },
    {
        id: 3,
        parentMenu: '메뉴1',
        menuName: '메뉴1-2',
        public: true,
        use: true,
        level: 2
    },
    {
        id: 4,
        parentMenu: '메뉴1',
        menuName: '메뉴1-3',
        public: true,
        use: true,
        level: 2
    }
]

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


    const [filter,setFilter] = useState({
        page:1,
        limits:10,
        total:0,
    })

    const {page,limits,total} = filter;

    
    // 메뉴 리스트
    const [menuList,setMenuList] = useState<any>();

    // 메뉴 팝업 컨트롤
    
    const handleEditOpen = () => {
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

    
    // 데이터 fetch 함수

    //TODO 메뉴불러오는 api 적용해야함.
    const getMenuList = async() => {
        // try {
        //     const result = await menuApi.getMenus();
        //     setMenuList(result);
        // }catch(err:any){
        //     toast.error(err);
        // }
    }

    useEffect(()=> {
        getMenuList();
    },[page,limits,total])
    


    return (
        <>
            <div>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow sx={{ background: 'lightGray' }}>
                            <TableCell sx={{ pl: 4, }}>
                                No
                            </TableCell>
                            <StyledTableCell>
                                메뉴명
                            </StyledTableCell>
                            <StyledTableCell>
                                상위 메뉴
                            </StyledTableCell>
                            <StyledTableCell>
                                사용여부
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
                        {dummyData.map((menu) => (
                            <TableRow
                                hover
                                key={menu.id}
                            >
                                <TableCell sx={{ pl: 5, width: "20%" }}>
                                    <NextLink href={`/menu/${menu.id}`}>
                                        <Link>
                                            <Typography sx={{ cursor: 'pointer' }}>
                                                {menu.id}
                                            </Typography>
                                        </Link>
                                    </NextLink>
                                </TableCell>
                                <TableCell>
                                    <StyledTypography>
                                        {menu.parentMenu}
                                    </StyledTypography>
                                </TableCell>
                                <TableCell>
                                    <StyledTypography>
                                        {menu.menuName}
                                    </StyledTypography>
                                </TableCell>
                                <TableCell>
                                    <FormGroup >
                                        <FormControlLabel sx={{ justifyContent: "center", margin: '0 auto' }} control={<Checkbox disabled sx={{ cursor: 'text' }} checked={menu.public && true} onChange={() => { }} />} label={""} />
                                    </FormGroup>
                                </TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormControlLabel sx={{ justifyContent: "center", margin: '0 auto' }} control={<Checkbox disabled sx={{ cursor: 'text' }} checked={menu.use && false} onChange={() => { }} />} label={""} />
                                    </FormGroup>
                                </TableCell>
                                <TableCell sx={{display:'flex', justifyContent:'center'}}>
                                    <Button onClick={handleEditOpen}>수정</Button>
                                </TableCell>
                                <TableCell>
                                    <Button  onClick={()=>handleDeleteOpen(menu)}>삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <MenuEditModal open={editOpen} handleClose={editModalClose}/>
                <MenuDeleteModal deleteMenu={deleteMenu} open={deleteOpen} handleClose={deleteModalClose} />
            </div>
           
        </>
    )
}

export default MenuListTable;