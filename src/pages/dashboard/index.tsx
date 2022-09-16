import React, { ReactElement, ReactNode }  from 'react';
import { AuthGuard } from '../../components/authentication/auth-guard';
import Layout from '../../components/Layout/layout';

const DashBoard = () => {
    return (
        <>
        </>
    )
}

DashBoard.getLayout =(page:ReactElement):ReactNode => (
    <>
        <Layout>
            {page}
        </Layout>
    </>
    // <AuthGuard>
    //     <Layout>
    //         {page}
    //     </Layout>
    // </AuthGuard>
)

export default DashBoard;