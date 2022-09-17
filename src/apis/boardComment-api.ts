import instance from "./index";
import type {BoardComment} from "../types/boardComment";

const path = '/board';

// 댓글영역 api
export interface Result<T = any> {

}


class BoardCommentApi {

    //id 는 게시글 아이디임.  게시글에 해당되는 모든 댓글을 불러오는 api
    getBoardComments(boardId:number):Promise<Result<any>>{
        return instance.get<Result<any>>(`${path}/${boardId}/boardComments`);
    }

    // 게시글에 댓글 추가 , boardComment에 form data 있어야 하고 , 게시글 아이디 값
    createBoardComment(boardId:any,boardComment:any):Promise<Result<any>> {
        return instance.post<Result<any>,Result<any>>(`${path}/${boardId}/boardComment`,boardComment);
    }

    // 게시글 댓글 수정 api
    updateBoardComment(boardId:string,boardComment:any): Promise <Result<any>> {
        return instance.put<Result<any>, Result<any>>(`${path}/${boardId}/boardComment`,boardComment)
    }

    // 게시글 댓글 삭제 api
    deleteBoardComment(boardId:string,boardCommentId:string ): Promise <Result<any>> {
        return instance.delete<Result<any>,Result<any>>(`${path}/${boardId}/boardComment/${boardCommentId}`)
    }

}

export const boardCommentApi = new BoardCommentApi();