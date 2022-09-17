import React, {useCallback, useEffect, useState} from 'react';
import Layout from "../../../components/Layout/layout";
import { NextPage } from "next";
import {useRouter} from "next/router";
import {Box, Chip, Container, Typography} from "@mui/material";
import BoardEditForm from '../../../components/board/board-edit-form';
import {boardApi} from "../../../apis/board-api";

const EditBoard:NextPage = () => {
    const router = useRouter();
    const [board,setBoard] = useState<any>();
    const id = router.query.id;
    console.log(id);

    const getBoard = useCallback(async ()=> {
        try {
            // const result = await boardApi.getBoard(id);
            // const {data} = result;
            // setBoard(data);
        } catch (err){
            console.error(err);
        }
    },[])

    useEffect(() => {
        getBoard();
    },[])


    const dummyBoard = {
        title: "테스트 게시글",
        content: "<h1>테스트 게시글 </h1><ul><li><p>test1</p></li><li><p>test2</p></li><li class=\"task-list-item\" data-task=\"true\"><p>test3</p></li></ul><p>테이블 테스트</p><table><thead><tr><th><p>테</p></th><th><p>이</p></th><th><p>블</p></th></tr></thead><tbody><tr><td><p>1</p></td><td><p>2</p></td><td><p>3</p></td></tr></tbody></table><p><br></p><p><span style=\"color: #ab4642\">컬러 테스트</span></p><p>컬러 테스트</p><p><span style=\"color: #a16946\">컬러 테스트</span></p><p><br></p><p><em>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</em></p><p><br></p><p><strong>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</strong></p><p><br></p><p><br></p>"
    }


    // if(!board) {
    //     return null;
    // }

    return (
        <>
            <Box
                component={"main"}
                sx={{
                    flexGrow:1,
                    py:8
                }}
            >
                <Container maxWidth={"md"}>
                    <Box mt={3}>
                        <BoardEditForm board={dummyBoard}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
EditBoard.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default EditBoard;