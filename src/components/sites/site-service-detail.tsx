import type { FC } from 'react';
import { Card, CardActions, CardHeader, Divider,
    Table,TableHead,TableRow, TableCell, TableBody, styled } from "@mui/material";
import {Application} from '../../types/application';


interface ISiteServiceDetail {
    relation : Application[]
    siteId: number;
}

const StyledTableCell = styled(TableCell)({
   textAlign:'center'
   
})
    

const SiteServiceDetail: FC<ISiteServiceDetail> = (props) => {

    const {relation} = props;

    console.log(relation);
    if(!relation) {
        return <></>
    }
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
                        {
                            relation.map((data:any)=> (
                                <TableRow key={data.applicationid}>
                                    <StyledTableCell>{data.applicationName}</StyledTableCell>
                                    <StyledTableCell>{data.applicationName}</StyledTableCell>
                                    <StyledTableCell>{data.applicationName}</StyledTableCell>
                                </TableRow>
                            ))
                        }

                        {/* <TableRow>
                            <StyledTableCell>1</StyledTableCell>
                            <StyledTableCell>2</StyledTableCell>
                            <StyledTableCell>3</StyledTableCell>
                        </TableRow> */}
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