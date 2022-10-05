import type {FC} from 'react';
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IUserBasicDetailProps {
    siteId: number;
    siteName: string;
    siteDescription: string;
    siteEnabled:boolean;
    siteDefault:boolean;
    userName:string;
    modifiedAt:string;
    siteSso:boolean;
}

const SiteBasicDetail:FC<IUserBasicDetailProps> = (props) => {

    const {siteId,siteName,siteDescription,siteEnabled,siteDefault,userName,modifiedAt,siteSso,...rest} = props;

    const align =  'horizontal' ;
    return (
        <>
            <Card {...rest}>
                <CardHeader title="사이트 정보"/>
                <Divider/>
                <PropertyList>
                    <PropertyListItem
                        align={align}
                        divider
                        label="아이디"
                        value={siteId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="이름"
                        value={siteName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="설명"
                        value={siteDescription}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="관리자"
                        value={userName ? userName: "없음"}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="SSO 여부"
                        value={siteSso ? "Y": "N"}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="사용여부"
                        value={siteEnabled ? "Y": "N"}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="최근수정일자"
                        value={modifiedAt?.slice(0,10)}
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

export default SiteBasicDetail;