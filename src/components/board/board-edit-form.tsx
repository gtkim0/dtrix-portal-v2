import React, {FC, useEffect, useRef, useState} from 'react';
import {Card, Box, TextField, Button, Typography, Divider} from "@mui/material";
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr';
import {useRouter} from "next/router";
import { boardApi } from '../../apis/board-api';
import { BoardType } from '../../types/board';
import { useUpdateBulletinMutation, useDeleteBulletinMutation } from '../../store/sliceApi/boardApiSlice';

interface IBoardEditFormProps {
    board : BoardType;
}

const BoardEditForm:FC<IBoardEditFormProps> = (props) => {
    const {board} = props;

    const [updateBulletin, updateResult ] = useUpdateBulletinMutation();
    const [deleteBulletin, deleteResult ] = useDeleteBulletinMutation();

    const [title,setTitle] = useState<string>('');
    const router = useRouter();
    const editorRef = useRef<Editor>(null);
    
    const handleSubmit = async() => {
        const instance = editorRef.current?.getInstance();
        const params = {
            bulletinId: board.bulletinId,
            title: title,
            content: instance?.getHTML(),
        }
        const result = await updateBulletin(params);
    }

    const handleCancle = () => {
        router.push(`/board/${board.menuId}`);
    }

    const handleDeleteBoard = async() => {
        const params = {
            bulletinId: board.bulletinId,
        }
        try {
            const result = await deleteBulletin(params);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(()=> {
        setTitle(board.title);
        if(editorRef.current){
            editorRef.current.getInstance().setHTML(board.content);
        }
    },[board])

    useEffect(()=> {
        // TODO
        // url 을 타고 edit 페이지를 들어올수 있으므로 로그인한 유저와, 게시글 작성자가
        // 같지 않다면, redirect 시켜서 board 로 보내는 작업 필요.
    },[])


    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    if(!board) {
        return <></>;
    }

    return (
        <>
            <Box
                component={"form"}
                sx={{
                    flexGrow:1,
                    flexBasis:300,
                    my:1.5
                }}
            >
                <Box sx={{display:'flex',justifyContent:'space-between',mb:2}}>
                    <Typography sx={{mb:1}} variant={"h5"}>게시글 수정</Typography>
                    <Button onClick={handleDeleteBoard} variant={"contained"}>삭제</Button>
                </Box>
                <Divider />
                <TextField
                    label="게시글 제목"
                    variant={"outlined"}
                    fullWidth
                    onChange={handleChange}
                    value={title}
                />
            </Box>
            <Box>
                {
                    <Editor
                        ref={editorRef}
                        initialValue={""}
                        initialEditType={"wysiwyg"}
                        hideModeSwitch={true}
                        events={{change: handleSubmit}}
                        height={"700px"}
                        plugins={[colorSyntax]}
                    />
                }
            </Box>
            <Box sx={{float: 'right', py: 1}}>
                <Button sx={{mx: 1}} variant={"contained"} onClick={handleCancle}>취소</Button>
                <Button variant={"contained"} onClick={handleSubmit}>수정</Button>
            </Box>
        </>
    )
}

export default BoardEditForm;