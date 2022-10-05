import type { FC } from 'react';
import { Card, CardActions, CardHeader, Divider,Box,Grid,
    Table,TableHead,TableRow, TableCell, TableBody, styled, TextField, FormControlLabel, FormLabel, Typography } from "@mui/material";

interface ISiteDbDetailProps {

}


const SiteDbDetail: FC<ISiteDbDetailProps> = (props) => {

    return (
        <>
            <Card>
                <CardHeader title="DB 정보" />
                <Divider />

                <Grid
                    container
                    spacing={1}
                    sx={{py:3}}
                >
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{px:10,fontSize:'1.2rem',fontWeight:500}}>DB Url</Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{textAlign:'left'}}>http://localhost:3030</Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{px:10,fontSize:'1.2rem',fontWeight:500}}>DB Category</Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{textAlign:'left'}}>mysql</Typography>
                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{px:10,fontSize:'1.2rem',fontWeight:500}}>DB User</Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{textAlign:'left'}}>;;</Typography>
                    </Grid>

                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{px:10,fontSize:'1.2rem',fontWeight:500}}>DB Password</Typography>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={6}
                        sx={{py:2}}
                    >
                        <Typography sx={{textAlign:'left'}}>;;</Typography>
                    </Grid>

                </Grid>
                

                <CardActions
                    sx={{
                        flexWrap: 'wrap',
                        px: 3,
                        py: 2,
                        m: -1
                    }}
                >
                </CardActions>
            </Card>
        </>
    )
}

export default SiteDbDetail;