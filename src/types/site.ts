export interface SiteBase {

}

export interface Site extends SiteBase {
    siteId: number;
    siteName?:string,
    userName?:string,  //관리자
    siteSso?:boolean,


    userId:number,
    siteDescription?:string,
    board:boolean,
    dashboard:boolean,
    dbDriver:string,
    dbUrl:string,
    dbUser:string,
    dbPassword:string
    // siteEnabled:false,
    // siteDefault:false,
    createAt:number,
    modifiedAt:number,
    // userId: string,
    // id:number,
    [key: string]: any;
}

export interface siteInfo {
    siteId: number,
    siteName:string
}