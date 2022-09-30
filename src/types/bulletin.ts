export interface BaseBulletinType {
    bulletinId: number
}


export interface BulletInType extends BaseBulletinType {
    title: string,
    content: string,
    writer: String,
    hits: number,
    regDate: string,
    modDate: string
}