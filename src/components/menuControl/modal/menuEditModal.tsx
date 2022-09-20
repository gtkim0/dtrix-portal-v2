import React from 'react';
import type { FC } from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MenuEditForm from '../menu-edit-form';

interface IMenuEditModalProps {
    open: boolean,
    // openId?: number,
    handleClose: any;
}

const MenuEditModal:FC<IMenuEditModalProps> = (props) => {
    
    const { open,  handleClose } = props;

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
                        <MenuEditForm handleClose={handleClose} />
                    </DialogContent>
                </Dialog> 
            </div>
        </>
    )
}

export default MenuEditModal;