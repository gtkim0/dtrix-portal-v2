import type {FC} from 'react';
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IPrivilegeBasicDetailProps {
    privilegeId:number;
    privilegeName:string;
}

const PrivilegeBasicDetail:FC<IPrivilegeBasicDetailProps> = (props) => {

    const {privilegeId,privilegeName, ...rest } = props;

    const align =  'horizontal' ;


    return (
        <>
            <Card {...rest}>
                <CardHeader title="권한 정보"/>
                <Divider/>
                <PropertyList>
                    <PropertyListItem
                        align={align}
                        divider
                        label="권한 아이디"
                        value={privilegeId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="그룹 이름"
                        value={privilegeName}
                    />
                </PropertyList>
                <CardActions
                    sx={{
                        flexWrap: 'wrap',
                        px: 3,
                        py: 2,
                        m: -1
                    }}
                >
                    {/*<Button
                        sx={{m: 1}}
                        variant="outlined"
                    >
                        Reset Password
                    </Button>*/}
                    {/*<Button sx={{m: 1}}>
                    Login as Customer
                </Button>*/}
                </CardActions>
            </Card>
        </>
    )
}

export default PrivilegeBasicDetail;