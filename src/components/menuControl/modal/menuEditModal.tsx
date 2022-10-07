import React from 'react';
import type { FC } from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MenuEditForm from '../menu-edit-form';
import { useSelector} from 'react-redux';
import {RootState} from '../../../store/index';
interface IMenuEditModalProps {
    open: boolean,
    // openId?: number,
    handleClose: any;
    editMenuInfo:any;
}

const MenuEditModal:FC<IMenuEditModalProps> = (props) => {
    const selectEditMenuInfo:any = useSelector((state:RootState)=>state.menu.editMenuInfo);
    console.log(selectEditMenuInfo);
    const { open,handleClose ,editMenuInfo } = props;
 
    return (
        <>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                >
                    <DialogTitle>
                        메뉴 수정
                    </DialogTitle>
                    <DialogContent>
                        <MenuEditForm selectEditMenuInfo={selectEditMenuInfo} editMenuInfo={editMenuInfo} handleClose={handleClose} />
                    </DialogContent>
                </Dialog> 
            </div>
        </>
    )
}

export default MenuEditModal;