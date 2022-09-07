import type { NextPage } from 'next'
import Layout from "../components/Layout/layout";
import {AuthGuard} from "../components/authentication/auth-guard";
import {useAuth} from "../hooks/use-auth";
import {useEffect, useState} from "react";
import axios from "axios";

const Home: NextPage = (props:any,context) => {

    // const { user } = useAuth();

    const user = {
        userRole:"system",
        userMainContent:"시스템 관리자 영역"
    }

    const user1 = {
        userRole: "admin",
        userMainContent:"사용자 영역"
    }


    const content = (
        <div>
            {user.userMainContent}
        </div>
    )

    useEffect(()=> {


    },[])



  return (
    <div style={{fontSize:'50px'}}>
        {content}
    </div>
  )
}

// @ts-ignore
Home.getLayout = (page) => (
    <>
        {/*<AuthGuard>*/}
            <Layout>
                {page}
            </Layout>
        {/*</AuthGuard>*/}
    </>
)

export default Home
