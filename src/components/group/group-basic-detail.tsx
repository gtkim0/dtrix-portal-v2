import type {FC} from 'react';
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IGroupBasicDetailProps {
    groupId:number;
    groupName:string;
    groupDescription:string;
}

const GroupBasicDetail:FC<IGroupBasicDetailProps> = (props) => {

    const {groupId,groupName,groupDescription, ...rest } = props;

    const align =  'horizontal' ;


    return (
        <>
            <Card {...rest}>
                <CardHeader title="그룹 정보"/>
                <Divider/>
                <PropertyList>
                    <PropertyListItem
                        align={align}
                        divider
                        label="그룹 아이디"
                        value={groupId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="그룹 이름"
                        value={groupName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="그룹 설명"
                        value={groupDescription}
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

export default GroupBasicDetail;