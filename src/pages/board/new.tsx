import React from 'react';
import {NextPage} from 'next';
import {Box,Container} from '@mui/material';
import Layout from '../../components/Layout/layout';

import dynamic from 'next/dynamic';

// toast-ui-editor 는 ssr 지원안함.  dynamic import 사용
// import BoardCreateForm from '../../components/board/board-create-form';
const BoardCreateForm = dynamic(()=>import('../../components/board/board-create-form'),{ssr:false})

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