import React, {ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useSelect} from "@mui/base";
import Layout from "../../components/Layout/layout";
import {NextPage} from "next";
import Head from "next/head";
import {Box, Button, Card, Container, Divider, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import NextLink from "next/link";
import {useTranslation} from "react-i18next";
import {Search as SearchIcon} from "../../icons/search";
import SiteListTable from "../../components/sites/site-list-table";
import type {Site} from '../../types/site'
import {SortAsc} from '../../icons/sort-asc';
import {siteApi} from "../../apis/site-api";
import {AuthGuard} from "../../components/authentication/auth-guard";
interface Filters {
    siteName? : string
}

type Sort =
    | 'createAt-DESC'
    | 'createAt-ASC';

interface SortOption {
    value: Sort;
    label: string;
}

const sortOptions: SortOption[] = [
    {
        label: '등록순 (newest)',
        value: 'createAt-DESC'
    },
    {
        label: '등록순 (oldest)',
        value: 'createAt-ASC'
    },
];


const Sites:NextPage = () => {
    const {t} = useTranslation();
    const [sites,setSites] = useState<Site[]>([]);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const queryRef = useRef<HTMLInputElement | null>(null);
    const [sort,setSort] = useState<Sort>(sortOptions[0].value);

    const [filters,setFilters] = useState<Filters >({
        siteName:''
    })
    const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };

    const handleRowsPerPageChange =(event:React.ChangeEvent<HTMLInputElement>):void => {
        setSize(parseInt(event.target.value,10));
    }

    const handleQueryChange = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault();
        setFilters({
            ...filters,
            siteName:queryRef.current?.value
        })
    }
    const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSort(event.target.value as Sort);
    };

    const getSite = useCallback(async (params:any)=> {
        try {
            const result = await siteApi.getSites(params);
            const {totalElements, content}:any = result.data;
            console.log(result);
            if(result.code ===200){
                setTotal(totalElements);
                setSites(content);
            }
        }catch (err){

        }
    },[])

    const getSearchSite = useCallback(async (params:any) => {
        try {
            const result = await siteApi.getSearchSites(params);
            const {data}:any = result;
            if(result.code === 200) {
                setTotal(data.totalElements);
                setSites(data.content);
            }
        }catch (err){

        }
    },[])


    useEffect(()=> {
        const params = {
            page:page,
            size:size,
            sortBy: sort
        }
        getSite(params);
    },[page,size,sort])

    useEffect(()=> {
        const params = {
            page:page,
            size:size,
            sortBy: sort,
            siteName: filters.siteName
        }
        getSearchSite(params);
    },[filters])

    return (
        <>
            <Head>
                사이트관리
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:2,
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
                                <Typography variant={"h5"}>
                                    사이트 목록
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href={"/sites/new"}
                                    passHref
                                >
                                        <Button
                                            // startIcon={<PlusIcon fontSize="small"/>}
                                            variant="contained"
                                        >
                                            {t('Add')}
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
                                m: -1.5,
                                p:3
                            }}
                        >
                            <Box
                                component="form"
                                onSubmit={handleQueryChange}
                                sx={{
                                    flexGrow: 1,
                                    flexBasis: 300,
                                    m: 1.5
                                }}>
                                <TextField
                                    defaultValue=""
                                    fullWidth
                                    inputProps={{ ref: queryRef }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small"/>
                                            </InputAdornment>
                                        )
                                    }}
                                    label="사이트 검색"
                                    placeholder="사이트 검색"
                                />
                            </Box>
                            <TextField
                                label="정렬"
                                name="sort"
                                onChange={handleSortChange}
                                select
                                SelectProps={{ native: true }}
                                sx={{ m: 1.5 }}
                                value={sort}
                            >
                                {sortOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>
                        </Box>
                        <SiteListTable
                            sites={sites}
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
Sites.getLayout = (page) => (
    // <AuthGuard>
    //     <Layout>
    //         {page}
    //     </Layout>
    // </AuthGuard>
    <Layout>
        {page}
    </Layout>
)

export default Sites