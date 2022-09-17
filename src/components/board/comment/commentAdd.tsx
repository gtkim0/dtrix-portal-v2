import React, {useRef, useCallback, useEffect, useState} from 'react';
import type {FC} from 'react';
import {Avatar, Box, Button, TextField} from '@mui/material'
import {useRouter} from "next/router";
import {boardCommentApi} from "../../../apis/boardComment-api";
import toast from "react-hot-toast";

interface IBoardCommentAddProps {

}

const BoardCommentAdd:FC<IBoardCommentAddProps> = (props) => {

    const router = useRouter();
    const id = router.query.id;
    const contentRef = useRef<HTMLInputElement>(null);
    const [content,setContent] = useState<string>('');
    const handleAddComment = useCallback(async ()=> {
        try {
            //id 값이랑 form data 인데,
            const params = {
                data : content
            }
            const result = await boardCommentApi.createBoardComment(id,params);
            console.log(result);
        }catch (err:any) {
            toast.error(err);
        }
    },[])

    const handleCommentChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    
    return (
        <div {...props}>
            <Box sx={{display:'flex'}}>
                <Avatar
                    // src={}
                    sx={{
                        height:40,
                        mr:2,
                        width:40
                    }}
                >
                    {/*TODO 유저정보 받아와서 아바타 만들기*/}
                    김
                </Avatar>
                <Box sx={{flexGrow:1}}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={handleCommentChange}
                        placeholder={"댓글영역"}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'background.paper'
                            }
                        }}
                    />
                    <Button sx={{my:1,float:'right'}} variant={"contained"} onClick={handleAddComment}>등록</Button>
                </Box>
            </Box>
        </div>
    )
}

export default BoardCommentAdd;