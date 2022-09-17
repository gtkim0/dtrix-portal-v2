import React from 'react';
import type {FC} from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
    IconButton,
} from '@mui/material';
import {createStyles, makeStyles} from "@mui/styles";
import NextLink from "next/link";
import Typography from '@mui/material/Typography';
import {PencilAlt as PencilAltIcon} from "../../icons/pencil-alt";
import {ArrowRight as ArrowRightIcon} from "../../icons/arrow-right";
import {useAuth} from "../../hooks/use-auth";

interface IBoardListTableProps {
    board:any;
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

    const { board } = props;
    if(!board){
        return null;
    }
    // window.open(`/board/${board.bulletinId}`)
    const getSelectWindow = (board:any) => {
        if(false){
            return (
                // TODO 팝업인지 새창인지 모르겠네.
                <Link onClick={()=>window.open(`/board/${board.bulletinId}`)}>
                    <Typography sx={{cursor:'pointer'}}>
                        {board.bulletinId}
                    </Typography>
                </Link>
            )
        }else{
            return (
                <NextLink href={`/board/${board.bulletinId}`}>
                    <Link sx={{textDecoration:'none'}}>
                        <Typography sx={{cursor:'pointer'}}>
                            {board.bulletinId}
                        </Typography>
                    </Link>
                </NextLink>
            )
        }
    }
    //TODO 유저정보 받아와서, 내가 적은 게시글이 아니라면, 수정아이콘이 안나오게해야함.
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
                                {/*{*/}
                                {/*    // TODO 팝업 true 이면 새창으로 open*/}
                                {/*    // board.ispopup && window.open()*/}
                                {/*    <NextLink href={`/board/${board.bulletinId}`}>*/}
                                {/*        <Link sx={{textDecoration:'none'}}>*/}
                                {/*            <Typography sx={{cursor:'pointer'}}>*/}
                                {/*                {board.bulletinId}*/}
                                {/*            </Typography>*/}
                                {/*        </Link>*/}
                                {/*    </NextLink>*/}
                                {/*}*/}
                                {
                                    getSelectWindow(board)
                                }
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
                                {/*TODO 아래 */}
                                {/*{*/}
                                {/*    // 현재 로그인유저와, 게시글 작성자 번호가 같을때만 수정표시.*/}
                                {/*    user.id === board.bulletinId ?*/}
                                {/*        <NextLink*/}
                                {/*            href={`/board/${board.bulletinId}/edit`}*/}
                                {/*            passHref*/}
                                {/*        >*/}
                                {/*            <IconButton component="a">*/}
                                {/*                <PencilAltIcon fontSize="small"/>*/}
                                {/*            </IconButton>*/}
                                {/*        </NextLink>*/}
                                {/*        :*/}
                                {/*        ""*/}
                                {/*}*/}

                                    <NextLink
                                        href={`/board/${board.bulletinId}/edit`}
                                        passHref
                                    >
                                        <IconButton component="a">
                                            <PencilAltIcon fontSize="small"/>
                                        </IconButton>
                                    </NextLink>
                                    <NextLink
                                        href={`/board/${board.bulletinId}`}
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
        </>
    )
}

export default BoardListTable;