import React, {ChangeEvent} from 'react';
import type {FC} from 'react';
import {Privilege} from "../../types/privilege";
import {IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography} from "@mui/material";
import {Group} from "../../types/group";
import {dateFormat} from "../../utils/date-formatter";
import NextLink from "next/link";
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";

interface IPrivilegeListTableProps {
    privileges: Privilege[];
    total: number;
    size: number;
    page: number;
    onPageChange:any;
    onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PrivilegeListTable:FC<IPrivilegeListTableProps> = (props) => {

    const {privileges, total, size, page, onPageChange, onRowsPerPageChange, ...rest} = props;


    return (
        <>
            <div {...rest}>
                <Table sx={{minWidth:700}}>
                    <TableHead>
                        <TableRow sx={{background:'lightGray'}}>
                            <TableCell sx={{ pl: 4,width:'50%'}}>
                                권한명
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                생성일자
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {privileges.map((privilege:Privilege)=> (
                            <TableRow
                                hover
                                key={privilege.privilegeId}
                            >
                                <TableCell sx={{pl:5}}>
                                    <Typography sx={{cursor:'pointer'}}>
                                        {privilege.privilegeName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center',textOverflow:'ellipsis'}}>
                                        {dateFormat(privilege.createdAt)}
                                    </Typography>
                                </TableCell>
                                <TableCell align={"right"}>
                                    <NextLink
                                        href={`/privilege/${privilege.privilegeId}/edit`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <PencilAltIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                    <NextLink
                                        href={`/privilege/${privilege.privilegeId}`}
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

export default PrivilegeListTable;