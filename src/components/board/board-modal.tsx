import React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { boardApi } from '../../apis/board-api';
import { toast, Toaster } from 'react-hot-toast';


interface IBoardModalProps {
    open: boolean,
    openId:number,
    handleClose: any;
}


export default function BoardModal(props:IBoardModalProps) {
 
  const {open,openId,handleClose} = props;
  // TODO 아직 board 에 타입정해지지않음 추후 타입추가
  const [boardInfo, setBoardInfo] = useState<any>();

    //TODO 팝업 테스트 , result 에 들어있는값을 boardInfo 에 set 한다음 redner 한다
  const getBoardDetail = (openId:number) => {
        try {
            const result = boardApi.getBoard(openId);
            console.log(result);
            setBoardInfo(result);
        }catch(err:any){
            toast.error(err);
        }
  }

  useEffect(()=> {
    if(openId !== 0) {
        getBoardDetail(openId)
    }
  },[openId])
  

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
            {/* TODO 타이틀 넣기. */}
          제목:{"임시 데이터 제목임. 추후에 불러와서 수정해야함"}
        </DialogTitle>
        <DialogContent>
          본문 : {"데이터 가져와서 추가해야함"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
