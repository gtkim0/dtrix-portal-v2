export interface BoardInfo {
    bulletinId:number,  // 게시글번호
    title:string,       // 제목
    content:string | any,     // 내용
}

export interface Board extends BoardInfo {
 
    writer:string,
    hits:number,        // 조회수
    reg_date:number,    // 등록일자
    mod_date:number,    // 수정일자
 
    // board_type:string,  // 게시판유형
    // is_anony:boolean,   // 익명여부
    // is_popup:boolean,   // 팝업여부
    // is_public:boolean,  // 공개여부
    // munu_id:number,     // 메뉴아이디
    // user_id:number      // 회원아이디
}

