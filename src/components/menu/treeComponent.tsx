import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import _ from 'lodash';
import {useRouter} from "next/router";
import { styled } from '@mui/material/styles';
// @ts-ignore
import { TreeView, TreeItem, TreeItemProps, useTreeItem, TreeItemContentProps, treeItemClasses } from "@mui/lab";
import { StyledTreeItem } from './styledTreeItem';
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


    const renderItem = (node:any) => {
        const {id,name,type,level,route} = node;
        return (
                <StyledTreeItem nodeId={id} key={id} labelText={name} node={node} >
                    {node.children?.map((data:any)=> renderItem(data))}
                </StyledTreeItem>
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
               sx={{ height: 240, flexGrow: 1, maxWidth: 1000, overflowY: 'auto' }}
           >
               {renderItems(treeItem)}
           </TreeView>
        </>
    )
}