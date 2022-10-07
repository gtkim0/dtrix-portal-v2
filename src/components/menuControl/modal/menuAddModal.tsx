import React from 'react';
import type { FC } from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import MenuCreateForm from '../menu-create-form';

interface IMenuAddModalProps {
    open: boolean,
    handleClose: any;
}

const MenuAddModal: FC<IMenuAddModalProps> = (props) => {

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
                        메뉴 생성
                    </DialogTitle>
                    <DialogContent>
                        <MenuCreateForm handleClose={handleClose} />
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default MenuAddModal;