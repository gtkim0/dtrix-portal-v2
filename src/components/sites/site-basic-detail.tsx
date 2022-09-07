import type {FC} from 'react';
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IUserBasicDetailProps {
    siteId: number;
    siteName: string;
    siteDomain: string;
    siteEnabled:boolean;
    siteDefault:boolean;
}

const SiteBasicDetail:FC<IUserBasicDetailProps> = (props) => {

    const {siteId,siteName,siteDomain,siteEnabled,siteDefault,...rest} = props;

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
                        label="domain"
                        value={siteDomain}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="활성화"
                        value={siteEnabled ? "Y": "N"}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="기본값"
                        value={siteDefault ? "Y": "N"}
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