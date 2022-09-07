import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import _ from 'lodash';
import {useRouter} from "next/router";
import { styled } from '@mui/material/styles';
// @ts-ignore
import { TreeView, TreeItem, TreeItemProps, useTreeItem, TreeItemContentProps, treeItemClasses } from "@mui/lab";
import {Box, SvgIconProps, Typography} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
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
    const {bgColor,color,labelIcon,labelInfo,labelText,...other} = props;

    console.log(menuData);
    const [treeItem,setTreeItem] = useState<any>([]);

    useEffect(()=> {
        const cloneData = _.cloneDeep(menuData);
        const treeList:any = [];
        // treeList.push(cloneData[0]) // 여기 최상단
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

    return (
        <>
            {treeItem.map((data:any)=> {
                return <MenuComponent key={data.id} data={data} />
            })}
        </>
    )
}