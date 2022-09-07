import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {TreeComponent} from "./treeComponent";

interface MenuProps {
    menuData: any;
}

const Menu:FC<MenuProps> = (props) => {

    const {menuData} = props;
    return <TreeComponent menuData={menuData} />;
}

export default Menu;