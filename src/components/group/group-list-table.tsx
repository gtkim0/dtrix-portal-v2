import React from 'react';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import type {FC} from 'react';
import NextLink from "next/link";
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";;
import PropTypes from "prop-types";
import {Group} from "../../types/group";
import {dateFormat} from "../../utils/date-formatter";

interface IGroupListTable {
    groups:Group[];
    total:number;
    size:number;
    page:number;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPageChange:any;
}

const GroupListTable:FC<IGroupListTable> = (props) => {

    const {groups,total,size,page,onRowsPerPageChange,onPageChange,...rest} = props;

    return (
        <>
            <div {...rest}>
                <Table sx={{minWidth:700}}>
                    <TableHead>
                        <TableRow sx={{background:'lightGray'}}>
                            <TableCell sx={{ pl: 4,width:'40%'}}>
                                그룹 이름
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                그룹 설명
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                생성일
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map((group:Group)=> (
                            <TableRow
                                hover
                                key={group.groupId}
                            >
                                <TableCell sx={{pl:5}}>
                                    <Typography sx={{cursor:'pointer'}}>
                                        {group.groupName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center',textOverflow:'ellipsis'}}>
                                        {group.groupDescription}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center'}}>
                                        {dateFormat(group.createdAt)}
                                    </Typography>
                                </TableCell>
                                <TableCell align={"right"}>
                                    <NextLink
                                        href={`/group/${group.groupId}/edit`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <PencilAltIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                    <NextLink
                                        href={`/group/${group.groupId}`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <ArrowRightIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={total}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                    page={page}
                    rowsPerPage={size}
                    rowsPerPageOptions={[10,50,100]}
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

GroupListTable.propTypes = {
    onPageChange:PropTypes.func
}

export default GroupListTable;