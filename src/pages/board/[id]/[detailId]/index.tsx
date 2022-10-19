import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../../../components/Layout/layout";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {Board} from "../../../../types/board";
import {boardApi} from "../../../../apis/board-api";
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
import BoardCommentAdd from "../../../../components/board/comment/commentAdd";
import {boardCommentApi} from "../../../../apis/boardComment-api";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import dynamic from "next/dynamic";
// const Viewer = dynamic(()=> import('@toast-ui/react-editor'),{ssr:false});
// import TuiEditorViewer from "../../../components/board/TuiEditorViewer";
const TuiEditorViewer = dynamic(()=>import('../../../../components/board/TuiEditorViewer'),{ssr:false})

import BoardComment from "../../../../components/board/comment";
import dynamic from "next/dynamic";

import { useGetBulletinDetailQuery } from '../../../../store/sliceApi/boardApiSlice';
import Loader from '../../../../components/loader';

interface IBoardDetailProps {

}

const BoardDetail:NextPage<IBoardDetailProps> = () => {

    // 로그인한 유저가 해당게시글 작성유저가 아닌경우, 수정 또는 삭제할수 없음?.
    // 로그인한 유저가 해당게시글 작성유저일경우 수정, 삭제할수있음?

    const router = useRouter();
    const {data, isLoading} = useGetBulletinDetailQuery({id:router.query.detailId});

    const handleBack = () => {
        router.back();
    }

    if(isLoading) {
        return <>...loading</>
    }

    if(!data) {
        return <></>;
    }

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
                            <CardContent>
                                <Box className='flex justify-between py-5'>
                                    <Box>{`작성자:  ${data.writer}`}</Box>
                                    <Box>{`작성일: ${data.regDate.slice(0,10)}`}</Box>
                                </Box>
                                <Box className='flex justify-between py-5'>
                                    <Box className='text-2xl'>{`제목: ${data.title}`}</Box>
                                    <Box>{`조회수: ${data.hits}`}</Box>
                                </Box>
                                <Divider className='pt-5' />
                                <Box className='h-96 mt-10 p-3'>
                                     <TuiEditorViewer content={data.content} />    
                                </Box>     
                            </CardContent>
                        </Card>
                    </Box>
                    {/* {dummycomments.map((data)=> (
                        <BoardComment
                            key={data.id}
                            {...data}
                        />
                    ))} */}
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