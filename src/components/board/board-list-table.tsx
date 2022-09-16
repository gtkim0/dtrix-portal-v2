import React from 'react';
import type {FC} from 'react';
import {Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';


interface IBoardListTableProps {
    board:any;
}

const BoardListTable:FC<IBoardListTableProps> = (props) => {

    const {board} = props;


    if(!board){
        return null;
    }

    return (
        <>
            <Table sx={{minWidth:700}}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{pl:4}}>
                            번호
                        </TableCell>
                        <TableCell sx={{textAlign:'center'}}>
                            제목
                        </TableCell>
                        <TableCell sx={{textAlign:'center'}}>
                            작성자
                        </TableCell>
                        <TableCell sx={{textAlign:'center'}}>
                            날짜
                        </TableCell>
                        <TableCell sx={{textAlign:'center'}}>
                            조회수
                        </TableCell>
                        <TableCell align="right">
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {board.map((board)=>(
                        <TableRow
                            hover
                            key={board.bulletinId}
                        >

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default BoardListTable;