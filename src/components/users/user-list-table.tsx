import type {ChangeEvent, FC, MouseEvent} from "react";
import {
    Avatar,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Link,
    TablePagination
} from "@mui/material";
import NextLink from "next/link";
import type {User} from '../../types/user';
import PropTypes from "prop-types";
import {getInitials} from "../../utils/get-initials";
import {PencilAlt as PencilAltIcon} from '../../icons/pencil-alt';
import {ArrowRight as ArrowRightIcon} from '../../icons/arrow-right';
import {dateFormat} from "../../utils/date-formatter";
import {SortAsc} from "../../icons/sort-asc";
import React from "react";
interface IUserListTableProps {
    users: User[];
    total: number;
    size: number;
    page: number;
    // onPageChange?: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    //TODO 타입 안맞아서 일단 any 형식 적용, 추후에 타입 넣어주기. (onPageChange)
    onPageChange:any;
    onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserListTable:FC<IUserListTableProps> = (props) => {

    const {users,total,size,page,onPageChange,onRowsPerPageChange,...rest} = props;
    console.log(users);


    return (
        <>
            <div {...rest}>
                <Table sx={{minWidth: 700}}>
                    <TableHead>
                        <TableRow sx={{background:'lightGray'}}>
                            <TableCell sx={{ pl: 4}}>
                                사용자
                            </TableCell>
                            <TableCell>
                                사이트
                            </TableCell>
                            <TableCell>
                                권한
                            </TableCell>
                            <TableCell>
                                SSO여부
                            </TableCell>
                            <TableCell>
                                생성일
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => {
                            return (
                                <TableRow
                                    hover
                                    key={user.userId}
                                >
                                    <TableCell sx={{ pl: 5, width: "50%" }}>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar
                                                src={user.avatar}
                                                sx={{
                                                    height: 42,
                                                    width: 42
                                                }}
                                            >
                                                {getInitials(user.userName)}
                                            </Avatar>
                                            <Box sx={{ml: 1}}>
                                                <NextLink
                                                    href={`/users/${user.userId}`}
                                                >
                                                        {user.userName}
                                                </NextLink>
                                                <Typography
                                                    color="textSecondary"
                                                    variant="body2"
                                                >
                                                    {user.userName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {user.siteName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {user.roleName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {user.userSso ? 'Y' : 'N'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2">
                                            {dateFormat(user.createdAt)}
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <NextLink
                                            href={`/users/${user.userId}/edit`}
                                            passHref
                                        >
                                            <IconButton component="a">
                                                <PencilAltIcon fontSize="small"/>
                                            </IconButton>
                                        </NextLink>
                                        <NextLink
                                            href={`/users/${user.userId}`}
                                            passHref
                                        >
                                            <IconButton component="a">
                                                <ArrowRightIcon fontSize="small"/>
                                            </IconButton>
                                        </NextLink>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={total}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={size}
                    rowsPerPageOptions={[20,50,100]}
                    sx={(theme) => ({
                        ".MuiTablePagination-toolbar": {
                            height: 56,
                        },
                        ".MuiTablePagination-selectLabel": {
                            color: theme.palette.text.secondary,
                            lineHeight: 1.66,
                        },
                    })}
                />
            </div>
        </>
    )
}

UserListTable.propTypes = {
    onPageChange: PropTypes.func
}

export default UserListTable;