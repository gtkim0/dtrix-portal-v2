import type {FC} from 'react';
import {Button, Card, CardActions, CardHeader, Divider, List} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IUserBasicDetailProps {
    userLoginId: string
    userName: string;
    userPhone: string;
    userEmail:string;
    positionName:string;
    userSso:boolean;
    groupId:number;
    roleId:number;
    siteId:number;
}

const UserBasicDetail:FC<IUserBasicDetailProps> = (props) => {

    const {userLoginId,userName,userPhone, userEmail,positionName,userSso,groupId,roleId,siteId,...rest} = props;

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
                        value={userLoginId}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="사용자명"
                        value={userName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="휴대폰 번호"
                        value={userPhone}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="이메일"
                        value={userEmail}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="sso 인증여부"
                        value={userSso? "Y": "N"}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="직책"
                        value={positionName}
                    />

                    <PropertyListItem
                        align={align}
                        divider
                        label="sso 인증여부"
                        value={userSso? "Y": "N"}
                    />

                    <PropertyListItem
                        align={align}
                        divider
                        label="그룹"
                        value={groupId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="권한"
                        value={roleId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="사이트"
                        value={siteId?.toString()}
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