export interface BoardComment  {
    commentId:string,  //댓글 번호
    userId:string,  // 댓글 번호
    content:string, // 내용
    regDate:number, // 등록일자
    modDate:number, // 수정일자
    bulletinId: string, // 게시글 번호
    [key: string]: any;
}

