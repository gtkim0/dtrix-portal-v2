import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import _ from 'lodash';
import {useRouter} from "next/router";
import { styled } from '@mui/material/styles';
// @ts-ignore
import { TreeView, TreeItem, TreeItemProps, useTreeItem, TreeItemContentProps, treeItemClasses } from "@mui/lab";
import {Box, SvgIconProps, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface IMenuComponent {
    key:number,
    data: any
}

// type StyledTreeItemProps = TreeItemProps & {
//     bgColor?: string;
//     color?: string;
//     labelIcon: React.ElementType<SvgIconProps>;
//     labelInfo?: string;
//     labelText: string;
// };


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
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));


const StyledTreeItem = (props:any) => {
    const {bgColor,color,labelIcon:LabelIcon,labelInfo,labelText,...other} = props;

    return (
        <StyledTreeItemRoot
            label = {
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
        />
    )
}
interface ITreeComponentProps  {
    menuData : any
}

export const TreeComponent:FC<ITreeComponentProps> = (props) => {
    const {menuData} = props;
    const router = useRouter();
    // const {bgColor,color,labelIcon,labelInfo,labelText,...other} = props;

    console.log(menuData);
    const [treeItem,setTreeItem] = useState<any[]>([]);

    useEffect(()=> {
        const cloneData = _.cloneDeep(menuData);
        const treeList:any = [];
        cloneData?.map((data:any)=> {
            if(data && data.level===1){
                treeList.push(data);
            }
        })

        const findChildren = (parentNode:any) => {
                parentNode.children = cloneData?.filter((data: any) => {
                    const isChild = parentNode.id === data.parentId;
                    if (isChild) {
                        findChildren(data);
                    }
                    return isChild;
                })
        }

        treeList.forEach((data:any)=> {
            findChildren(data);
        })

        setTreeItem(treeList);
    },[menuData])

    if(!menuData){
        return null;
    }

    const routeFunc = (route:string):void => {
        if(route)
        router.push(route);
    }

    const renderItem = (node:any) => {
        const {id,name,type,level,route} = node;
        return (
            <TreeItem onClick={(e)=>routeFunc(route)} nodeId={id} key={id} label={name} >
                {node.children?.map((data:any)=> renderItem(data))}
            </TreeItem>
        )
    }

    const renderItems = (treeItem:any):React.ReactNode => {
       const elements:any = [];

        Array.from(treeItem).forEach((node)=> {
           elements.push(renderItem(node));
       })

        return elements;
    }

    if(!treeItem){
        return null;
    }

    return (
        <>
           <TreeView
               aria-label="file system navigator"
               defaultCollapseIcon={<ExpandMoreIcon />}
               defaultExpandIcon={<ChevronRightIcon />}
               sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
           >
               {renderItems(treeItem)}
               {/* <TreeItem nodeId="1" label="사용자">*/}
               {/*     <TreeItem nodeId="2" label="Calander" />*/}
               {/* </TreeItem>*/}
               {/*<TreeItem nodeId="3" label="보드">*/}
               {/*    <TreeItem nodeId="4" label="보드1" />*/}
               {/*    <TreeItem nodeId="5" label="보드2" />*/}
               {/*    <TreeItem nodeId="6" label="보드3" />*/}
               {/*</TreeItem>*/}
           </TreeView>
        </>
    )
}