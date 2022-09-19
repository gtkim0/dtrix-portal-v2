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


interface IBoardEditFormProps {
    board:any
}


const BoardEditForm:FC<IBoardEditFormProps> = (props) => {
    const router = useRouter();
    const id = Number(router.query.id);
    const editorRef = useRef<Editor>(null);
    const [title,setTitle] = useState<string>('');
    const [content, setContent] = useState({html: '', md: ''})

    const handleSubmit = () => {
        const instance = editorRef.current?.getInstance();

        //TODO 업데이트 api 제대로 실행되는지 확인.
        //이미지 같은거 넣을수 있는지 확인
        // const params = {
        //     title: title,
        //     content: instance?.getHTML()
        // }

        // const result = boardApi.updateBoard(id,params);
        // if(result === 'true'){
        //     // 성공했을떄,
        //     router.push(`/board`);
        // }


        if (instance) {
            setContent({
                html: instance.getHTML(),
                md: instance.getMarkdown()
            })
        }
    }



    const handleCancle = () => {
        router.push("/board");
    }

    const handleDeleteBoard = () => {
        // const result = boardApi.deleteBoard(id);
        // if(result) {
        //     // TODO
        //     // result 가 성공일때 성공메세지같은거 띄워주고
        // }else{
        //     // 실패하면 에러메세지 띄워주기.
        // }
    }



    // 게시글 수정시, 전에 저장되었던 content, title 불러와서 setHTML 해주기.
    useEffect(()=> {
        setTitle(props.board.title);
        if(editorRef.current){
            editorRef.current.getInstance().setHTML(props.board.content);
        }
    },[props.board])

    useEffect(()=> {
        // TODO
        // url 을 타고 edit 페이지를 들어올수 있으므로 로그인한 유저와, 게시글 작성자가
        // 같지 않다면, redirect 시켜서 board 로 보내는 작업 필요.
    },[])

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

                        // hooks={{
                        // 이미지 저장 할때 사용할 훅
                        // addImageBlobHook: async (blob,callback)=> {
                        //     const url = await
                        // }
                        // }}
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