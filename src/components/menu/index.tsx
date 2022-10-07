import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {TreeComponent} from "./treeComponent";
import {TreeComponent1} from "./treeComponent1";


interface MenuProps {
    menuData: any;
}

const Menu:FC<MenuProps> = (props) => {

    const {menuData} = props;
    // return <TreeComponent1 menuData={menuData} />;
    return <TreeComponent menuData={menuData} />;
}

export default Menu;