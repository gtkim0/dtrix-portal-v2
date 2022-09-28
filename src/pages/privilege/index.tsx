import React, {useCallback, useState, useEffect, useRef, MouseEvent, ChangeEvent, FormEvent} from 'react';
import {NextPage} from "next";
import Layout from "../../components/Layout/layout";
import {privilegeApi} from "../../apis/privilege-api";
import {Privilege} from "../../types/privilege";
import Head from "next/head";
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    InputAdornment,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import NextLink from "next/link";
import {Search as SearchIcon} from "../../icons/search";
import UserListTable from "../../components/users/user-list-table";
import {useTranslation} from "react-i18next";
import PrivilegeListTable from "../../components/privilege/privilege-list-table";


interface IParamsProps {
    page:number,
    size:number
}

interface Filters {
    privilege?: string;
}

const Privilege:NextPage = () => {

    const [total , setTotal] = useState<number>(0);
    const [size , setSize] = useState<number>(10);
    const [page , setPage] = useState<number>(0);
    const [privileges, setPrivileges] = useState<Privilege[]>([]);
    const {t} = useTranslation();
    const queryRef = useRef<HTMLInputElement | null>(null);
    const [filters, setFilters] = useState<Filters>({
        privilege: '',
    });



    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSize(parseInt(event.target.value, 10));
    }

    const handleQueryChange = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setFilters({
            ...filters,
            privilege: queryRef.current?.value
        })
    }


    const getAutority = useCallback(async (params:IParamsProps)=> {
        try {
            const result = await privilegeApi.getPrivileges(params);
            if(result) {
                const {total ,list} = result.data;
                setTotal(total);
                setPrivileges(list);
            }

        } catch (err) {
            console.error(err);
        }
    },[])

    useEffect(()=> {
        const params = {
            page: page,
            size: size
        }
        getAutority(params);
    },[page,size])

    return (
        <>
            <Head>
                권한 관리
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 2,
                    px: 3
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{mb: 4}}>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={3}
                        >
                            <Grid item>
                                <Typography variant={"h5"}>
                                    권한 목록
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href="/privilege/new"
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
                        <Divider/>
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                flexWrap: 'wrap',
                                m: -1.5,
                                p: 3
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
                                    inputProps={{ref: queryRef}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small"/>
                                            </InputAdornment>
                                        )
                                    }}
                                    label="권한 검색"
                                    placeholder="권한 검색"
                                />
                            </Box>

                            {/*<TextField*/}
                            {/*    label="정렬"*/}
                            {/*    name="sort"*/}
                            {/*    onChange={handleSortChange}*/}
                            {/*    select*/}
                            {/*    SelectProps={{native: true}}*/}
                            {/*    sx={{m: 1.5}}*/}
                            {/*    value={sort}*/}
                            {/*>*/}
                            {/*    {sortOptions.map((option) => (*/}
                            {/*        <option*/}
                            {/*            key={option.value}*/}
                            {/*            value={option.value}*/}
                            {/*        >*/}
                            {/*            {option.label}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</TextField>*/}
                        </Box>
                        <PrivilegeListTable
                            privileges={privileges}
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
Privilege.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Privilege;