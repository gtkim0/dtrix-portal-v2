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
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

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

export const TreeComponent1:FC<ITreeComponentProps> = (props) => {
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
    function CloseSquare(props: SvgIconProps) {
        return (
          <SvgIcon
            className="close"
            fontSize="inherit"
            style={{ width: 14, height: 14 }}
            {...props}
          >
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
          </SvgIcon>
        );
      }

    if(!treeItem){
        return null;
    }

    return (
        <>
           <TreeView
               aria-label="file system navigator"
               defaultCollapseIcon={<ExpandMoreIcon  />}
               defaultExpandIcon={<ChevronRightIcon  />}
               sx={{ height: 240, flexGrow: 1, maxWidth: 1000, overflowY: 'auto' }}
           >
               {renderItems(treeItem)}
           </TreeView>
        </>
    )
}