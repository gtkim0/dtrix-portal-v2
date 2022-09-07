import type {FC} from 'react';
import {Button, Card, CardActions, CardHeader, Divider, List} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IUserBasicDetailProps {
    userId: string
    username: string;
    name: string;
    userRole:string
    userSso:boolean
}

const UserBasicDetail:FC<IUserBasicDetailProps> = (props) => {

    const {userId,username,name, userRole,userSso,...rest} = props;

    const align =  'horizontal' ;
    return (
        <>
            <Card {...rest}>
                <CardHeader title="Basic Details"/>
                <Divider/>
                <PropertyList>
                    <PropertyListItem
                        align={align}
                        divider
                        label="아이디"
                        value={userId}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="사용자명"
                        value={username}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="사용자권한"
                        value={userRole}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="sso 인증여부"
                        value={userSso? "Y": "N"}
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

export default UserBasicDetail;