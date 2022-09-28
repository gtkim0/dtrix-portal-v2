export interface PrivilegeBase {
    privilegeId: number,
}

export interface Privilege extends PrivilegeBase{
    privilegeName:string,
    createdAt: number,
    modifiedAt: number,
    delYn:boolean
}