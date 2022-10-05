import type { FC } from 'react';
import { Card, CardActions, CardHeader, Divider,
    Table,TableHead,TableRow, TableCell, TableBody, styled } from "@mui/material";

interface ISiteServiceDetail {
    // siteId: number;
    // siteName: string;
    // siteDomain: string;
    // siteEnabled:boolean;
    // siteDefault:boolean;
}

const StyledTableCell = styled(TableCell)({
   textAlign:'center'
   
})
    

const SiteServiceDetail: FC<ISiteServiceDetail> = (props) => {

    return (
        <>
            <Card>
                <CardHeader title="구독 정보" />
                <Divider />
                <Table>
                    <TableHead>
                        <TableRow>
                            {/* <TableCell><input type="checkbox" /></TableCell> */}
                            <StyledTableCell>Application</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Url</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {/* <TableCell></TableCell> */}
                            <StyledTableCell>1</StyledTableCell>
                            <StyledTableCell>2</StyledTableCell>
                            <StyledTableCell>3</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>

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

export default SiteServiceDetail;