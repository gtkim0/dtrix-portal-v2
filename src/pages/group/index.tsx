import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import Layout from "../../components/Layout/layout";
import {NextPage} from "next";
import Head from "next/head";
import {Box, Button, Card, Container, Divider, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import NextLink from "next/link";
import {useTranslation} from "react-i18next";
import {Search as SearchIcon} from "../../icons/search";
import {SortAsc} from '../../icons/sort-asc';
import {AuthGuard} from "../../components/authentication/auth-guard";
import GroupListTable from "../../components/group/group-list-table";
import {groupApi} from "../../apis/group-api";
import {Group} from "../../types/group";

interface Filters {
    groupName? : string
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


const Groups:NextPage = () => {
    const {t} = useTranslation();
    const [groups,setGroups] = useState<Group[]>([]);
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const queryRef = useRef<HTMLInputElement | null>(null);
    const [sort,setSort] = useState<Sort>(sortOptions[0].value);

    const [filters,setFilters] = useState<Filters >({
        groupName:'',
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
            groupName:queryRef.current?.value
        })
    }
    const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSort(event.target.value as Sort);
    };

    const getGroups = useCallback(async (params: any) => {
        try {
            const result = await groupApi.getGroups(params);
            if(result) {
                // TODO TYPE 수정필요
                const {data}:any = result;
                setGroups(data.list);
                setTotal(data.total)
            }
        } catch (err) {
            console.error(err);
        }
    }, [])

    useEffect(() => {
        const params = {
            page: page,
            size: size,
        }
        getGroups(params);
    }, [ page, size ])

    if(!groups) {
        return <></>
    }


    return (
        <>
            <Head>
                그룹 관리
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
                                    그룹 관리
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href={"/group/new"}
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
                                    label="그룹 검색"
                                    placeholder="그룹 검색"
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
                        <GroupListTable
                            groups={groups}
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
Groups.getLayout = (page) => (
    // <AuthGuard>
    //     <Layout>
    //         {page}
    //     </Layout>
    // </AuthGuard>
    <Layout>
        {page}
    </Layout>
)

export default Groups