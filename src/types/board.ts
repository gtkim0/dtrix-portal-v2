export interface BoardInfo {
    boardId: number
}

export interface Board extends BoardInfo {
 
    boardNm : string,
    isPublic: boolean,
    isReply: boolean,
    isComment: boolean

}

