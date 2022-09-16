import { NextPage } from 'next';
import React, {useRef, useEffect, useCallback} from 'react';
import { Container, Box, Grid, Typography, Card, Divider, TextField, InputAdornment } from '@mui/material'
import Layout from '../../components/Layout/layout';
import {Search as SearchIcon} from "../../icons/search";
import BoardListTable from '../../components/board/board-list-table';
import { boardApi } from '../../apis/board-api';

const Board:NextPage = () => {

    const queryRef = useRef(null);


    // const getBoardList = useCallback(async(params:any)=> {
    //     try {
    //         const result = await boardApi.getBoards(params);
    //     }catch(err){
    //         console.error(err);
    //     }
    // },[])

    useEffect(()=> {
        //게시글 api 호출
    },[])


    const dummyData = [
        {
            bulletinId: 1,
            id: 'kkt',
            title:'임시 게시물',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 2,
            id: 'kkt',
            title:'임시 게시물',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 3,
            id: 'kkt',
            title:'임시 게시물',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 4,
            id: 'kkt',
            title:'임시 게시물',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
    ]


    // 게시물 필터
    const handleQueryChange = () => {

    }

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:3,
                    px:3
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{mb:4}}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography variant={"h4"}>
                                    게시글 목록
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Card>
                        <Divider />
                        <Box
                            sx={{
                                alignItems:'center',
                                display:'flex',
                                flexWrap:'wrap',
                                m:-1.5,
                                p:3
                            }}
                        >
                            <Box
                                component={"form"}
                                onSubmit={handleQueryChange}
                                sx={{
                                    flexGrow:1,
                                    flexBasis:300,
                                    m:1.5
                                }}
                            >
                                <TextField
                                    defaultValue={""}
                                    fullWidth
                                    inputProps={{ref:queryRef}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small"/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <TextField
                                label="정렬"
                                name="sort"
                                select
                                SelectProps={{native:true}}
                                sx={{m:1.5}}
                            >
                                <option>작성일</option>
                            </TextField>
                        </Box>
                        <BoardListTable
                            board={dummyData}
                        />
                    </Card>
                </Container>


            </Box>
        </>
    )
}
// @ts-ignore
Board.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Board;