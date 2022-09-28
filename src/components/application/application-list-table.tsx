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

import NextLink from "next/link";
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import PropTypes from "prop-types";
import {Application} from "../../types/application";
interface ISiteListTable {
    applications:Application[];
    total:number;
    size:number;
    page:number;
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // onPageChange?: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onPageChange:any;

}

const ApplicationListTable:FC<ISiteListTable> = (props) => {

    const {applications,total,size,page,onRowsPerPageChange,onPageChange,...rest} = props;

    return (
        <>
            <div {...rest}>
                <Table sx={{minWidth:700}}>
                    <TableHead>
                        <TableRow sx={{background:'lightGray'}}>
                            {/*<TableCell sx={{ pl: 4,}}>*/}
                            {/*    No*/}
                            {/*</TableCell>*/}
                            <TableCell sx={{textAlign:'center'}}>
                                이름
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                설명
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                url
                            </TableCell>
                            <TableCell sx={{textAlign:'center'}}>
                                생성일
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application:Application)=> (
                            <TableRow
                                hover
                                key={application.applicationId}
                            >
                                {/*<TableCell sx={{pl:5,width:"20%"}}>*/}
                                {/*    <NextLink href={`/sites/${application.applicationId}` }>*/}
                                {/*        <Link>*/}
                                {/*            <Typography sx={{cursor:'pointer'}}>*/}
                                {/*                {application.applicationId}*/}
                                {/*            </Typography>*/}
                                {/*        </Link>*/}
                                {/*    </NextLink>*/}
                                {/*</TableCell>*/}

                                <TableCell>
                                    <Typography sx={{textAlign:'center'}}>
                                        {application.applicationName}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{pl:5}}>
                                    <Typography>
                                        {application.applicationDescription}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{margin:'0 auto'}}>
                                        {application.applicationUrl}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{margin:'0 auto'}}>
                                         {application.createdAt.slice(0,10)}
                                    </Typography>
                                </TableCell>
                                <TableCell align={"right"}>
                                    <NextLink
                                        href={`/application/${application.applicationId}/edit`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <PencilAltIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                    <NextLink
                                        href={`/application/${application.applicationId}`}
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

ApplicationListTable.propTypes = {
    onPageChange:PropTypes.func
}

export default ApplicationListTable;