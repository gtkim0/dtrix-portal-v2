import type {FC} from 'react';
import {Avatar, Box, Typography} from "@mui/material";
import { formatDistanceToNow } from 'date-fns';
interface IBoardCommentProps {
    id:number,
    authorName:string,
    content:string,
    createdAt?:number
}

const BoardComment:FC<IBoardCommentProps> = (props) => {

    const {id,authorName, content,createdAt} = props;
    // @ts-ignore
    return (
        <Box
            sx={{display:'flex',pb:2}}
        >
            <Avatar />
            <Box
                sx={{
                    background:'#f8f9fa',
                    borderRadius:1,
                    ml:2,
                    p:1,
                    width:'100%'
                }}
            >
                <Box
                    sx={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="subtitle2">
                        {authorName}

                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="caption"
                    >
                        {formatDistanceToNow(Date.now(), { addSuffix: true })}
                    </Typography>
                </Box>
                <Typography
                    variant="body2"
                    sx={{ mt: 1 }}
                >
                    {content}
                </Typography>
            </Box>
        </Box>
    )
}

export default BoardComment;