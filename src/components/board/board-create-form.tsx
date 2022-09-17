import React, {useRef, useCallback, forwardRef, useState, useEffect} from 'react';
import type {FC} from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
    Card,
    Divider,
    MenuItem,
    Switch,
    FormGroup,
    FormControlLabel, Typography, Autocomplete
} from '@mui/material';
// import { Editor as EditorType1, EditorProps } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor/dist/i18n/ko-kr';
import {Editor, Viewer} from '@toast-ui/react-editor';
import {useRouter} from "next/router";

// const Editor = dynamic<EditorProps>(() => import('@toast-ui/react-editor').then(m => m.Editor), { ssr: false });

const BoardCreateForm: FC<any> = (props) => {

    const router = useRouter();
    const editorRef = useRef<Editor>(null);
    const [content, setContent] = useState({html: '', md: ''})
    const [anony, setAnony] = useState(false); // 익명여부
    const [popup, setPopup] = useState(false); // popup여부

    const options = ["영업부","자재부","생산부"];

    const [group,setGroup] = useState<string | null>(options[0]);     //
    const [inputValue, setInputValue] = React.useState(''); //검색

    const handleChange = useCallback((e: any) => {
        // const instance = editorRef.current?.getInstance();
        // console.log(instance?.getHTML());
        //
        // if (!editorRef.current) {
        //     return;
        // }
    }, [props, editorRef])


    const handleSubmit = () => {
        const instance = editorRef.current?.getInstance();

        console.log(instance?.getHTML());
        if (instance) {
            setContent({
                html: instance.getHTML(),
                md: instance.getMarkdown()
            })
        }
    }

    // 익명여부
    const handleAnony = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnony(prev => !prev);
    }
    const handlePopup = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPopup(prev=>!prev);
    }

    const handleCancle = () => {
        router.push("/board");
    }

    //TODO 게시판 메뉴 불러오는 API 생성

    useEffect(()=> {
        if(editorRef.current){
            editorRef.current.getInstance().setHTML("");
        }
    },[])

    // @ts-ignore


    return (
        <>
            <Box>
                <Typography sx={{mb:1}} variant={"h5"}>게시글 생성</Typography>
                <Divider />
                <Box sx={{
                    display: 'flex',
                    mt:1
                }}>
                    <Autocomplete
                        value={group}
                        onChange={(e:any,newValue:string | null)=> {
                            setGroup(newValue)
                        }}
                        options={options}
                        onInputChange={(e,newInputValue)=> {
                            setInputValue(newInputValue);
                        }}

                        inputValue={inputValue}
                        sx={{width:'20%',display:'flex',justifyContent:'center',alignItems:'center'}}
                        renderInput={(params)=>
                            <TextField {...params} label={"그룹"} />
                        }
                    />
                    <TextField
                        sx={{
                            flexGrow: 1,
                            flexBasis: 200,
                            m: 1.5
                        }}
                        fullWidth
                        label="게시판 유형"
                        select

                    >
                        <MenuItem>일반게시판</MenuItem>
                        <MenuItem>일반게시판</MenuItem>
                        <MenuItem>일반게시판</MenuItem>

                    </TextField>

                    {/*익명 여부는 체크박스로 표시.*/}
                    <FormGroup sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <FormControlLabel sx={{m: 0}} labelPlacement={"start"}
                                          control={<Switch value={anony} onChange={handleAnony}/>} label={"익명여부"}/>
                        <FormControlLabel sx={{m: 0}} labelPlacement={"start"}
                                          control={<Switch value={popup} onChange={handlePopup}/>} label={"팝업여부"}/>
                    </FormGroup>
                </Box>

                <Box
                    component={"form"}
                    sx={{
                        flexGrow: 1,
                        flexBasis: 300,
                        my: 1.5
                    }}
                >
                    <TextField
                        label="게시글 제목"
                        variant='outlined'
                        fullWidth
                    />
                </Box>
                <Box>
                    {
                        typeof window !== "undefined" && <Editor
                            ref={editorRef}
                            initialValue={""}
                            initialEditType={"wysiwyg"}
                            hideModeSwitch={true}
                            events={{change: handleSubmit}}
                            onChange={handleChange}
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