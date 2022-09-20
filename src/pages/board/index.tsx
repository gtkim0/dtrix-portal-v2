import { NextPage } from 'next';
import React, {useRef, useEffect, useCallback, useState, MouseEvent} from 'react';
import { Container, Box, Grid, Typography, Card,Button, Divider, TextField, InputAdornment } from '@mui/material'
import Layout from '../../components/Layout/layout';
import {Search as SearchIcon} from "../../icons/search";
import BoardListTable from '../../components/board/board-list-table';
import { boardApi } from '../../apis/board-api';
import NextLink from "next/link";
import {useTranslation} from "react-i18next";

interface Filters {
    title?: string;
}


const Board:NextPage = () => {

    const {t} = useTranslation();

    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);



    const queryRef = useRef(null);


    // @TODO 게시판 정보받아서 실데이터로 교체
    const getBoardList = useCallback(async(params:any)=> {
        try {
            const result = await boardApi.getBoards(params);
            console.log(result);
        }catch(err){
            console.error(err);
        }
    },[])

    const [filters, setFilters] = useState<Filters>({
        title:''
    });

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSize(parseInt(event.target.value, 10));
    }

    useEffect(()=> {
        // 게시글 api 호출
        // TODO 페이징 기능 처리필요
        // const params = {
        //     page:page,
        //     size:size
        // }
        // getBoardList(params);
    },[page,size,filters])


    const dummyData = [
        {
            bulletinId: 1,
            id: 'kkt',
            title:'임시 게시물1',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 2,
            id: 'kkt',
            title:'임시 게시물2',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 3,
            id: 'kkt',
            title:'임시 게시물3',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
        {
            bulletinId: 4,
            id: 'kkt',
            title:'임시 게시물4',
            content:'임시작성 ',
            reg_date:'2022-01-01',
            hits:999
        },
    ]

    // 게시물 필터
    const handleQueryChange = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:3,
                    px:1
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{mb:2}}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography variant={"h5"}>
                                    게시글 목록
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href={"/board/new"}
                                    passHref
                                >
                                    <Button
                                        // startIcon={<PlusIcon fontSize="small"/>}
                                        variant="contained"
                                    >
                                        {t('글쓰기')}
                                    </Button>
                                </NextLink>
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
                            total={total}
                            size={size}
                            page={page}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onPageChange={handlePageChange}
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