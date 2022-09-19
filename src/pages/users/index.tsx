import Head from "next/head";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    Card,
    Divider,
    TextField,
    InputAdornment,
    MenuItem
} from "@mui/material";
import NextLink from 'next/link';
import {useTranslation} from "react-i18next";
import {Search as SearchIcon} from '../../icons/search';
import UserListTable from "../../components/users/user-list-table";
import {NextPage} from "next";
import {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import type {User} from '../../types/user';
import type {Paging} from '../../types/paging';
import type {ChangeEvent, MouseEvent} from "react";
import Layout from "../../components/Layout/layout";
import axios from "axios";
import {userApi} from "../../apis/user-api";

type Sort =
    | 'createDate|desc'
    | 'createDate|asc'
    | 'name|asc'
    | 'groupId|asc';

interface SortOption {
    value: Sort;
    label: string;
}

const sortOptions: SortOption[] = [
    {
        label: '등록순 (newest)',
        value: 'createDate|desc'
    },
    {
        label: '등록순 (oldest)',
        value: 'createDate|asc'
    },
    {
        label: '사용자명',
        value: 'name|asc'
    },
    {
        label: '소속',
        value: 'groupId|asc'
    }
];

interface Filters {
    user?: string;
}

const User: NextPage = () => {

    const {t} = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(0);
    const [role, setRole] = useState<string>('');
    const [sort, setSort] = useState<Sort>(sortOptions[0].value);
    const queryRef = useRef<HTMLInputElement | null>(null);

    const [filters, setFilters] = useState<Filters>({
        user: '',
    });

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
        setPage(newPage);
    };

    const handleRoleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setRole(event.target.value);
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSize(parseInt(event.target.value, 10));
    }

    const handleQueryChange = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setFilters({
            ...filters,
            user: queryRef.current?.value
        })
    }
    const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSort(event.target.value as Sort);
    };

    const getUsers = useCallback(async (params: any) => {
        try {
            const result = await userApi.getUsers(params);
            console.log(result);
            // @ts-ignore
            const {total, list} = result.data;
            if (result) {
                setTotal(total);
                setUsers(list);
            }
        } catch (err) {
            console.error(err);
        }
    }, [])

    console.log(sort);
    useEffect(() => {
        const params = {
            user: filters.user,
            // siteName: siteName
            userRole: role,
            page: page,
            size: size,
            // sort:"true",
            // sortBy:sort
            // TODO 아직 구현 안된상황, 정렬부분이랑 사이트 네임부분 구현필요
        }
        getUsers(params);
    }, [role, page, size, filters, sort])

    let userLevel = '2';

    const menu = userLevel === '1' ?
    [
        {id:'',value:"전체"},
        {id:'system', value:'사이트 관리자'},
        {id:'user', value:'사용자'}
    ]
     : 
    [
        {id:'',value:"전체"},
        {id:'admin',value:'시스템 관리자'},
        {id:'system',value:'사이트 관리자'},
        {id:'user',value:'사용자'}
    ]
 
    return (
        <>
            <Head>
                유저관리
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
                                    사용자 목록
                                </Typography>
                            </Grid>
                            <Grid item>
                                <NextLink
                                    href="/users/new"
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
                                    label="사용자 검색"
                                    placeholder="사용자 검색"
                                />
                            </Box>
                            <TextField
                                sx={{
                                    flexGrow: 1,
                                    flexBasis: 200,
                                    m: 1.5
                                }}
                                label="소속"
                                name="groupId"
                                // value={groupId}
                                // onChange={handleGroupIdChange}
                                select
                                SelectProps={{
                                    MenuProps: {
                                        PaperProps: {
                                            style: {maxHeight: 400, width: 240}
                                        }
                                    },
                                }}
                            >
                                <MenuItem value="">전체</MenuItem>
                                {/*{groups.map(group => (*/}
                                {/*    <MenuItem key={group.[id]} value={group.[id]}*/}
                                {/*              sx={{*/}
                                {/*                  pl: 2 + 2 * (group.level - 1)*/}
                                {/*              }}>*/}
                                {/*        {group.name}*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                            </TextField>
                            <TextField
                                sx={{
                                    flexGrow: 1,
                                    flexBasis: 200,
                                    m: 1.5
                                }}
                                label="사용자 구분"
                                name="userRole"
                                value={role}
                                onChange={handleRoleChange}
                                select
                                SelectProps={{}}
                            >
                                {
                                    //TODO
                                    // 로그인한 유저의 권한을 받아서
                                    // 메뉴ITEM 을 동적으로 부여해야함.
                                    menu.map(data=> (
                                        <MenuItem key={data.id} value={data.id}>{data.value}</MenuItem>
                                    ))
                                }
                                {/*<MenuItem value="">전체</MenuItem>*/}
                                {/*<MenuItem value="admin">시스템 관리자</MenuItem>*/}
                                {/*<MenuItem value="system">사이트 관리자</MenuItem>*/}
                                {/*<MenuItem value="user">사용자</MenuItem>*/}
                            </TextField>

                            <TextField
                                label="정렬"
                                name="sort"
                                onChange={handleSortChange}
                                select
                                SelectProps={{native: true}}
                                sx={{m: 1.5}}
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
                        <UserListTable
                            users={users}
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
User.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default User;
