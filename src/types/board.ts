export interface BoardInfo {
    boardId: number
}

export interface Board extends BoardInfo {
 
    boardNm : string,
    isPublic: boolean,
    isReply: boolean,
    isComment: boolean

}

export interface BoardType {
    title:string,
    writer:string,
    regDate:string,
    modDate:string,
    menuId:number,
    hits:number,
    content:string,
    bulletinId:number
}