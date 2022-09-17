import React from 'react';
import {NextPage} from 'next';
import {Box,Container} from '@mui/material';
import Layout from '../../components/Layout/layout';
import BoardCreateForm from '../../components/board/board-create-form';


const BoardCreate: NextPage = () => {

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow:1,
                    py:6,
                    border:1
                }}
            >
                <Container>
                    <BoardCreateForm/>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
BoardCreate.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default BoardCreate;