import React from 'react';
import {Box, Typography} from "@mui/material";
import Link from 'next/link';

const CoLogo = () => {
    return (
        <>
            <Link href="/">
                <Box
                    sx={{cursor:'pointer',width:'200px',pl:"20px"}}
                >
                    <Typography sx={{fontSize:"25px",fontWeight:'bold',display:'flex'}}>
                        <img src={"https://static.wixstatic.com/media/88a304_d771582acb794183bbf41cff6a02cdc2~mv2.png/v1/fill/w_140,h_24,al_c,q_85,enc_auto/88a304_d771582acb794183bbf41cff6a02cdc2~mv2.png"} />
                    </Typography>

                    {/*<img src={"\thttps://ezportal.bizmeka.com/companyImage/T39633/T39633_100_0d332c6ffff041d383cf4120a283fed7.png"} />*/}
                    {/*<Box component={"span"}>*/}
                    {/*    여기로고*/}
                    {/*</Box>*/}
                </Box>
            </Link>
        </>
    )
}
export default CoLogo;