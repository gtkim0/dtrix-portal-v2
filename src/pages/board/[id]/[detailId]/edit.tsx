import React, {useCallback, useEffect} from 'react';
import Layout from "../../../../components/Layout/layout";
import { NextPage } from "next";
import {useRouter} from "next/router";
import {Box, Container } from "@mui/material";
import dynamic from 'next/dynamic';
const BoardEditForm = dynamic(()=> import('../../../../components/board/board-edit-form'),{ssr:false});
import { useGetBulletinDetailQuery } from '../../../../store/sliceApi/boardApiSlice';

const EditBoard:NextPage = () => {
    const router = useRouter();
   
    const {data, isLoading} = useGetBulletinDetailQuery({id:router.query.detailId});

    if(isLoading) {
        return <>...loading</>
    }

    if(!data) {
        return <></>;
    }

    return (
        <>
            <Box
                component={"main"}
                sx={{
                    flexGrow:1,
                    py:8
                }}
            >
                <Container maxWidth={"md"}>
                    <Box mt={3}>
                        <BoardEditForm board={data}/>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

// @ts-ignore
EditBoard.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default EditBoard;