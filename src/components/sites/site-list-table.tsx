import React from 'react';
import {
    Box, Checkbox, FormControlLabel, FormGroup,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import type {FC} from 'react';
import {Site} from "../../types/site";

import NextLink from "next/link";
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {SortAsc} from "../../icons/sort-asc";
import {Search as SearchIcon} from "../../icons/search";
import { dateFormat } from '../../utils/date-formatter';
import PropTypes from "prop-types";
interface ISiteListTable {
    sites:Site[];
    total:number;
    size:number;
    page:number;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onPageChange:any;

}

const SiteListTable:FC<ISiteListTable> = (props) => {

    const {sites,total,size,page,onRowsPerPageChange,onPageChange,...rest} = props;

    return (
        <>
            <div {...rest}>
                <Table sx={{minWidth:700}}>
                    <TableHead>
                        <TableRow sx={{background:'lightGray'}}>
                            <TableCell sx={{ pl: 4,}}>
                                사이트이름
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                관리자
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                Sso 사용여부
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                생성일
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sites.map((site:any)=> (
                            <TableRow
                                hover
                                key={site.siteId}
                            >
                                <TableCell sx={{pl:5,width:"20%"}}>
                                    {/*<NextLink href={`/sites/${site.siteId}` }>*/}
                                    {/*    <Link>*/}
                                            <Typography sx={{cursor:'pointer'}}>
                                                {site.siteName}
                                            </Typography>
                                    {/*    </Link>*/}
                                    {/*</NextLink>*/}
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center'}}>
                                        {site.userName ?? "관리자 없음"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center'}}>
                                        {site.siteSso ? "Y": "N"}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{textAlign:'center'}}>
                                        {site.createdAt.slice(0,10)}
                                    </Typography>
                                </TableCell>

                                <TableCell align={"right"}>
                                    <NextLink
                                        href={`/sites/${site.siteId}/edit`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <PencilAltIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                    <NextLink
                                        href={`/sites/${site.siteId}`}
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

SiteListTable.propTypes = {
    onPageChange:PropTypes.func
}

export default SiteListTable;