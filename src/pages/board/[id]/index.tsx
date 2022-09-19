import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../../components/Layout/layout";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {Board} from "../../../types/board";
import {boardApi} from "../../../apis/board-api";
import toast from "react-hot-toast";
import Head from "next/head";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    TextField,
    Typography,
    Button,
    IconButton
} from "@mui/material";
// import {Viewer} from "@toast-ui/react-editor";
// import '@toast-ui/editor/dist/toastui-editor.css'

import BoardCommentAdd from "../../../components/board/comment/commentAdd";
import {boardCommentApi} from "../../../apis/boardComment-api";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import dynamic from "next/dynamic";
// const Viewer = dynamic(()=> import('@toast-ui/react-editor'),{ssr:false});
// import TuiEditorViewer from "../../../components/board/TuiEditorViewer";

const TuiEditorViewer = dynamic(()=>import('../../../components/board/TuiEditorViewer'),{ssr:false})

interface IBoardDetailProps {

}
import BoardComment from "../../../components/board/comment";
import dynamic from "next/dynamic";
// const BoardComment = dynamic(()=> import("../../../components/board/comment/commentAdd"),{
//     ssr:false
// })


const BoardDetail:NextPage<IBoardDetailProps> = () => {

    const router = useRouter();
    const id = Number(router.query.id);

    const [board,setBoard] = useState<Board | any>(null);
    const [comments, setComments] = useState<any[]>([]);

    const getBoardInfo = useCallback(async ()=> {
        // try {
        //     const res = await boardApi.getBoard(id);
        //     const result = res.data;
        //     setBoard(result);
        // }catch (err:any) {
        //     toast.error(err);
        // }
    },[])

    const getBoardComments = useCallback(async()=> {
        // try {
        //     const result = await boardCommentApi.getBoardComments(Number(id));
        //     const {data} = result;
        //     setComments(data);
        // }catch(err) {
        //     toast.error(err);
        // }
    },[])

    const handleBack = () => {
        router.back();
    }

    // const handleDeleteBoard = useCallback(async ()=> {
    //     try {
    //         const result = await boardCommentApi.deleteBoardComment(id);
    //         console.log(result);
    //         if(result.data == "success") {
    //             getBoardComments();
    //         }
    //     }catch (err){
    //         toast.error(err);
    //     }
    // },[])


    //boardinfo 에서 내가작성한 content 내용을 html로 보내고 다시 viewer 로 받는다.
    // board 에 title 이랑 content 내용이 들어올테니까 그걸받아서 뿌린다.
    // board.title, board.content  이렇게 뽑을수있게하자.

    // const viewer = (
    //     // <></>
    //     <Viewer
    //         initialValue={"<table><thead><tr><th><p>1</p></th><th><p>2</p></th><th><p>3</p></th><th><p>4</p></th><th><p>5</p></th></tr></thead><tbody><tr><td><p>1</p></td><td><p>23</p></td><td><p>4</p></td><td><p>5</p></td><td><p>6</p></td></tr><tr><td><p>13</p></td><td><p>3</p></td><td><p>2</p></td><td><p>5</p></td><td><p>4</p></td></tr><tr><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td></tr><tr><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td></tr></tbody></table><p>Write</p><p>Preview</p><p><br></p><p>Markdown</p><p>WYSIWYG</p>"}
    //     />
    // )

    const dummyContent = "<table><thead><tr><th><p>1</p></th><th><p>2</p></th><th><p>3</p></th><th><p>4</p></th><th><p>5</p></th></tr></thead><tbody><tr><td><p>1</p></td><td><p>23</p></td><td><p>4</p></td><td><p>5</p></td><td><p>6</p></td></tr><tr><td><p>13</p></td><td><p>3</p></td><td><p>2</p></td><td><p>5</p></td><td><p>4</p></td></tr><tr><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td></tr><tr><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td><td><p><br></p></td></tr></tbody></table><p>Write</p><p>Preview</p><p><br></p><p>Markdown</p><p>WYSIWYG</p>"

    useEffect(()=> {
        getBoardInfo();
        getBoardComments();
    },[])

    const dummyTitle = "임시 제목 영역"
    const dummycomments = [
        {
            id:1,
            authorName:'테스트1',
            content:'임시 데이터 영역',
            createId:"김규태1",
        },
        {
            id:2,
            authorName:'테스트2',
            content:'임시 데이터 영역',
            createId:"김규태2",
        },
        {
            id:3,
            authorName:'테스트3',
            content:'임시 데이터 영역',
            createId:"김규태3",
        }
    ]

    //TODO 실데이터로 채워서 적용해야하고, 유저정보받아와서 삭제할때 조건 걸기

    // if(!board) {
    //     return null;
    // }
    return (
        <>
            <Head>
                <title>
                    게시판 상세정보
                </title>
            </Head>
            <Box
                component={"main"}
                sx={{flexGrow:1, py:2,px:8}}
            >
                <Container>
                    <Box sx={{mb:5}}>
                        <Card>
                            <IconButton aria-label="delete" size="large" onClick={handleBack}>
                                <ArrowBackIcon
                                    fontSize="small"
                                    sx={{mr: 1}}
                                />
                                <Typography variant="subtitle2">
                                    back
                                </Typography>
                            </IconButton>
                            <CardHeader title={`제목: ${dummyTitle}`} />
                            <CardContent>
                                {/*{viewer}*/}
                                <TuiEditorViewer content={dummyContent} />
                            </CardContent>
                        </Card>
                    </Box>
                    {/*<Divider sx={{my:3}}/>*/}
                    {dummycomments.map((data)=> (
                        <BoardComment
                            key={data.id}
                            {...data}
                        />
                    ))}
                    <Divider sx={{my:3}} />
                    <BoardCommentAdd />
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
BoardDetail.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default BoardDetail;