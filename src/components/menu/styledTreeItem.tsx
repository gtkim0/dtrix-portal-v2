import { styled } from '@mui/material/styles';
import { TreeView, TreeItem, TreeItemProps, useTreeItem, TreeItemContentProps, treeItemClasses } from "@mui/lab";
import {useRouter} from "next/router";
import {Box, IconProps, SvgIcon, SvgIconProps, Typography} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faCircle } from '@fortawesome/free-solid-svg-icons';

const faPlusIcon = faPlus as IconProps;

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
    const {bgColor,color,labelIcon:LabelIcon,labelInfo,labelText,onClick,node,...other} = props;
    const router = useRouter();

    const viewPage = (e:any,node:any) => {
        console.log(e);
        console.log(node);
        if(node.route){
            router.push(`${node.route}`);
        }
    }

    //node 정보 즉 메뉴 정보에 url ,id 값 다들어있어야지.
    // 그래야 + 버튼 누를때  url/new 를 하던가 , url/id 를 해서 조회할수있잖아
    return (
        <StyledTreeItemRoot
            label = {
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    {
                        node.children && node.children.length > 0 ?
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        :
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        // 여기 라벨 아이콘을, 
                        // 하위 아이템이 있으면 폴더 아이콘으로,
                        // 아니면 파일 아이콘으로 만들자.
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