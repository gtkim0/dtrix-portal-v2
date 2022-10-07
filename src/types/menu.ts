export interface MenuType {
    siteId:number,
    menuId:string,
    upMenuId:string,
    menuName:string,
    sortOrder:string,
    
    publicYn:string,
    menuComment:string,

    fullMenuName?:string,
    useYn?:string,
}

export interface SideMenuType {
    menuId:number,
    menuName:string,
    menuDepth:number,
    menuUrl:string,
    menuUseYn:string,
    menuPublicYn:string,
    siteId:number,
    menuParent:number
}