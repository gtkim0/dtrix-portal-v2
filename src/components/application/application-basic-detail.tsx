import type {FC} from 'react';
import {Card, CardActions, CardHeader, Divider} from "@mui/material";
import {PropertyList} from "../property-list";
import {PropertyListItem} from "../property-list-item";

interface IApplicationBasicDetailProps {
    applicationId:number;
    applicationName:string;
    applicationDescription:string;
    applicationUrl:string;
    createdAt:string;
}

const ApplicationBasicDetail:FC<IApplicationBasicDetailProps> = (props) => {

    const {applicationId,applicationName,applicationDescription,applicationUrl,createdAt,...rest} = props;

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
                        value={applicationId?.toString()}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="이름"
                        value={applicationName}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="목적"
                        value={applicationDescription}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="url"
                        value={applicationUrl}
                    />
                    <PropertyListItem
                        align={align}
                        divider
                        label="생성일"
                        value={createdAt.slice(0,10)}
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

export default ApplicationBasicDetail;