//TODO board api 정리 필요
import instance from "./index";
export interface Result<T = any> {

}
import { Board,BoardInfo } from '../types/board';

const path ='/board'

class BoardApi {

    // 게시물 전체 리스트 api
    getBoards(params?:any) :Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/page`,{params});
    }

    // 게시물 검색 서치 api
    getSearchBoard(params?:any) : Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}`,{params});
    }

    // 게시물 상세 정보
    getBoard(id:number): Promise<any> {
        return instance.get<Result<any>,Result<any>>(`${path}/pageDetail/${id}`);
    }

    updateBoard(board:BoardInfo) : Promise<Result<Board>> {
        return instance.post<Result<Board>,Result<Board>>(`${path}/modify`,board)
    }

    // TODO parameter 타입생성, 추가
    createBoard(board:Board): Promise<Result<any>> {
        return instance.post<Result<any>,Result<any>>(path,board);
    }

    // 게시물 삭제
    deleteBoard(params:any): Promise<Result<any>> {
        return instance.delete<Result<any>,Result<any>>(`${path}/remove`,params)
    }

}

export const boardApi = new BoardApi();