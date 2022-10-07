import React, {ChangeEvent, FormEvent, MouseEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useSelect} from "@mui/base";
import Layout from "../../components/Layout/layout";
import {NextPage} from "next";
import Head from "next/head";
import {Box, Button, Card, Container, Divider, Grid, InputAdornment, Link, TextField, Typography} from "@mui/material";
import NextLink from "next/link";
import {useTranslation} from "react-i18next";
import {Search as SearchIcon} from "../../icons/search";
import {SortAsc} from '../../icons/sort-asc';
import {AuthGuard} from "../../components/authentication/auth-guard";
import {applicationApi} from "../../apis/application-api";
import ApplicationListTable from "../../components/application/application-list-table";
import {Application} from "../../types/application";
interface Filters {
    applicationName? : string
}

type Sort =
    | 'createdAt,DESC'
    | 'createdAt,ASC';

interface SortOption {
    value: Sort;
    label: string;
}

const sortOptions: SortOption[] = [
    {
        label: '등록순 (newest)',
        value: 'createdAt,DESC'
    },
    {
        label: '등록순 (oldest)',
        value: 'createdAt,ASC'
    },
];

const Applications:NextPage = () => {
    const {t} = useTranslation();
    const [applications,setApplications] = useState<Application[]>([]);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const queryRef = useRef<HTMLInputElement | null>(null);
    const [sort,setSort] = useState<Sort>(sortOptions[0].value);

    const [filters,setFilters] = useState<Filters >({
        applicationName:''
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
            applicationName:queryRef.current?.value
        })
    }
    const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSort(event.target.value as Sort);
    };

    const getApplication = useCallback(async (params:any)=> {
        try {
            const result = await applicationApi.getApplications(params);
            const {totalElements, content}:any = result.data;
            if(result.message === 'Success'){
                setTotal(totalElements);
                setApplications(content);
            }
        }catch (err){

        }
    },[])

    const getSearchApplication = useCallback(async (params:any) => {
        try {
            const result = await applicationApi.getSearchApplication(params);
            console.log(result);
            const {data}:any = result;
            if(result.message === 'Success') {
                setTotal(data.totalElements);
                setApplications(data.content);
            }
        }catch (err){
    
        }
    },[])

    useEffect(()=> {
        const params = {
            page:page,
            size:size,
            sort: sort,
        }
        getApplication(params);
    },[page,size])

    useEffect(()=> {
        const params = {
            page:page,
            size:size,
            sort: sort,
            applicationName: filters.applicationName
        }
        getSearchApplication(params);
    },[filters])

    return (
        <>
            <Head>
                어플리케이션 관리
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
                                    어플리케이션 목록
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href={"/application/new"}
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
                                    label="어플리케이션 검색"
                                    placeholder="어플리케이션 검색"
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
                        <ApplicationListTable
                            applications={applications}
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
Applications.getLayout = (page) => (
    // <AuthGuard>
    //     <Layout>
    //         {page}
    //     </Layout>
    // </AuthGuard>
    <Layout>
        {page}
    </Layout>
)

export default Applications