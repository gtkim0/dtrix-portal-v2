import { NextPage } from 'next';
import React, {useRef, useEffect, useCallback, useState, MouseEvent} from 'react';
import { Container, Box, Grid, Typography, Card,Button, Divider, TextField, InputAdornment ,List, MenuItem } from '@mui/material'
import Layout from '../../../components/Layout/layout';
import {Search as SearchIcon} from "../../../icons/search";
import BoardListTable from '../../../components/board/board-list-table';
import { boardApi } from '../../../apis/board-api';
import NextLink from "next/link";
import {useTranslation} from "react-i18next";
import { useGetBoardQuery } from '../../../store/sliceApi/boardApiSlice';
import { useRouter } from 'next/router';

interface Filters {
    title?: string;
}

const Board:NextPage = () => {

    const router = useRouter();
    
    const {t} = useTranslation();
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const id = router.query.id;
    const {data, refetch} = useGetBoardQuery({id:router.query.id});

    const queryRef = useRef(null);
    const [filters, setFilters] = useState<Filters>({
        title:''
    });

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSize(parseInt(event.target.value, 10));
    }
    // 게시물 필터
    const handleQueryChange = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    if(!data) {
        return <></>;
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
                                    href={`/board/${id}/new`}
                                    passHref
                                >
                                    <Button
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
                            routeId={router.query.id}
                            board={data.dtoList}
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

export async function getServerSideProps() {
    return {
        props: {},
    };
}

// @ts-ignore
Board.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Board;