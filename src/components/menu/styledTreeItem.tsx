import { styled } from '@mui/material/styles';
import {  TreeItem, treeItemClasses } from "@mui/lab";
import {useRouter} from "next/router";
import {Box, Typography} from "@mui/material";



const StyledTreeItemRoot:any = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'normal',
            color: 'white',
            fontSize:24
        },
    },
    [`& .${treeItemClasses.group}`]: {

        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(3),
        },
    },
}));


export const StyledTreeItem = (props:any) => {
    console.log(props);
    const {menuUrl,bgColor,color,labelIcon:LabelIcon,labelInfo,labelText,onClick,node,...other} = props;
    const router = useRouter();

    const viewPage = (e:any,node:any) => {
        //TODO child 가 있으면??  아니면 route 가 있으면? push 아니면 하위페이지 오픈
        if(node){
            console.log(node);
            // router.push(`${node.menuUrl}`);
            router.push(`${node.route}`);

        }
    }

    return (
        <StyledTreeItemRoot
            label = {
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    {
                        node.children && node.children.length > 0 ?
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        :
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    }

                    <Typography onClick={(e)=>viewPage(e,node)} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, fontSize:'1rem' }}>
                        {labelText}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
              }}
              {...other}
        />
    )
}