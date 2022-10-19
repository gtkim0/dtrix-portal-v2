import React,{useState} from 'react';
import type {FC, ChangeEvent} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    IconButton,
    TablePagination
} from '@mui/material';
import {createStyles, makeStyles} from "@mui/styles";
import NextLink from "next/link";
import Typography from '@mui/material/Typography';
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {useAuth} from "../../hooks/use-auth";
import BoardModal from './board-modal';

interface IBoardListTableProps {
    routeId:any;
    board:any;
    total:number;
    size:number;
    page:number;
    onPageChange: any;
    onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

// @ts-ignore
const useStyles = makeStyles((theme:Theme)=> createStyles({
    tableRow : {
        height:'20px',
    },
    tableCell : {
        textAlign:'center',
    }
}))



const BoardListTable:FC<IBoardListTableProps> = (props) => {
    const classes = useStyles();
    const user = useAuth();
    const [open,setOpen] = useState(false);
    const [openId,setOpenId] = useState<number>(0);

    const { board,total,size,page, onPageChange,onRowsPerPageChange,routeId } = props;
   
    const handleOpenPopup = (id:any) => {
        setOpen(true);
        setOpenId(id);
    }

    const handleClose = () => {
        setOpen(false);
    }

    if(!board){
        return null;
    }

    return (
        <>
            <Table sx={{minWidth:700}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{pl:4,width:'8%'}}>
                            No
                        </TableCell>
                        <TableCell sx={{width:'40%'}}>
                            제목
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            작성자
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            작성시간
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            조회수
                        </TableCell>
                        <TableCell align="right">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {board.map((board:any)=>(
                        <TableRow
                            className={classes.tableRow}
                            hover
                            key={board.bulletinId}
                        >
                            <TableCell sx={{pl:5}}>
                            </TableCell>
                            <TableCell>
                                <Typography >
                                    {board.title}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{textAlign:'center'}}>
                                    {board.id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{textAlign:'center'}}>
                                    {board.reg_date}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{textAlign:'center'}}>
                                    {board.hits}
                                </Typography>
                            </TableCell>
                            <TableCell align={"right"}>
                                <NextLink
                                    href={`/board/${routeId}/${board.bulletinId}/edit`}
                                    passHref
                                >
                                    <IconButton component="a">
                                        <PencilAltIcon fontSize="small"/>
                                    </IconButton>
                                </NextLink>
                                <NextLink
                                    href={`/board/${routeId}/${board.bulletinId}`}
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
                rowsPerPageOptions={[10,20,50]}
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
             <BoardModal open={open} openId={openId} handleClose={handleClose} />
        </>
    )
}

export default BoardListTable;