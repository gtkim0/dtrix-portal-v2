export interface SiteBase {

}

export interface Site extends SiteBase {
    siteId: number;
    siteName:string,
    siteDomain:string,
    siteEnabled:false,
    siteDefault:false,
    createAt:number,
    modifiedAt:number,
    userId: string,
    id:number,
    [key: string]: any;
}

export interface siteInfo {
    siteId: number,
    siteName:string
}