import React, {useCallback, useEffect, useState} from 'react';
import { NextPage } from "next";

const Bulletin:NextPage = () => {

    const [bulletin, setBulletin] = useState<any>();
    const [page, setPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    const getBulletin = useCallback(async (params: {page:number,size:number})=> {
        try {
            // const result = await
        } catch (err) {

        }
    },[])

    useEffect(()=> {
        const params = {
            page: page,
            size: size,
        }

        getBulletin(params);
    }, [page,size])


    return (
        <>

        </>
    )
}

export default Bulletin;