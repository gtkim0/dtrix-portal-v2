import React, {useRef, useState, useEffect} from 'react';
import type {FC} from 'react';
import {
    Box,
    TextField,
    Button,
    Divider,
    Typography
} from '@mui/material';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import {useRouter} from "next/router";
import dynamic from 'next/dynamic';
import { boardApi } from '../../apis/board-api';
import {useCreateBulletinMutation} from '../../store/sliceApi/boardApiSlice';

const Editor = dynamic(()=> import('../../components/board/wrappedEditor'),{ssr:false});

const EditorWithForwardedRef = React.forwardRef((props:any, ref) => {
    return  (
        <Editor {...props} forwardedRef={ref} />
    )}
);
EditorWithForwardedRef.displayName="EditorWithForwardedRef";

const BoardCreateForm: FC<any> = (props) => {
    const [createBulletin, result] = useCreateBulletinMutation();

    const { boardId } = props;
    const router = useRouter();
   
    const editorRef = useRef<any>(null);
    const [title,setTitle] = useState<string>('');

    const handleSubmit = async() => {
        const instance = editorRef.current?.getInstance();
        const params = {
            menuId: boardId ,
            title: title,
            content: instance.getHTML()
        }
        // TODO 성공 실패여부에따른 코드 정리필요
        const result = await createBulletin(params);

        // 성공일때
        // router.push(`/board/${boardId}`);
    }

    const handleChangeTitle = (e:any) => {
        setTitle(e.target.value);
    }

    const handleCancle = () => {
        router.push(`/board/${boardId}`);
    }

    useEffect(()=> {
        if(editorRef.current){
            editorRef.current.getInstance().setHTML("");
        }
    },[])

    return (
        <>
            <Box>
                <Typography sx={{mb:1}} variant={"h5"}>게시글 생성</Typography>
                <Divider />
                <Box
                    component={"form"}
                    sx={{
                        flexGrow: 1,
                        flexBasis: 300,
                        my: 1.5
                    }}
                >
                    <TextField
                        value={title}
                        onChange={handleChangeTitle}
                        label="게시글 제목"
                        variant='outlined'
                        fullWidth
                    />
                </Box>
                <Box>
                    {
                        typeof window !== "undefined" && <EditorWithForwardedRef
                            {...props}
                            ref={editorRef}
                            initialValue={""}
                            initialEditType={"wysiwyg"}
                            hideModeSwitch={true}
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
                    <Button variant={"contained"} onClick={handleSubmit}>저장</Button>
                </Box>
            </Box>
        </>
    )
}

export default BoardCreateForm;