import React from 'react';
import type {FC} from 'react';
import {Dialog, DialogTitle, DialogContent, Button, Box} from '@mui/material';
import { toast } from 'react-hot-toast';
import Divider from '@mui/material/Divider';
import {menuApi} from '../../../apis/menu-api';

interface IMenuDeleteModalProps {
    open:boolean,
    handleClose:any,
    deleteMenu:any
}

const MenuDeleteModal:FC<IMenuDeleteModalProps> = (props) => {

    const {open, handleClose, deleteMenu} = props;

    console.log(deleteMenu);
    const handleDeleteMenu = async () => {

        const body = {
            menu_id: deleteMenu.menuId,
            site_id: 1
        }
        try {
            const result = menuApi.deleteMenu(body);
            console.log(result);
            // if(result == true) {

            // }
        }catch(err:any) {
            toast.error(err);
        }
    }

    return (
        <>
           <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                >
                    {/* <DialogTitle>메뉴 삭제</DialogTitle> */}
                    <DialogContent>
                        <span style={{fontWeight:'bold',color:'red'}}>{deleteMenu?.menuName}</span> 삭제하시겠습니까?
                        <Divider sx={{my:1}} />
                        <Box sx={{display:'flex',justifyContent:'center'}}>
                            <Button onClick={handleDeleteMenu}>확인</Button>
                            <Button onClick={handleClose}>취소</Button>
                        </Box>
                    </DialogContent>
                    
                </Dialog> 
            </div> 
        </>
    )
}

export default MenuDeleteModal;