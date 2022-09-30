export interface PrivilegeBase {
    privilegeId: number,
}

export interface PrivilegeType extends PrivilegeBase{
    privilegeName:string,
    createdAt: number,
    modifiedAt: number,
    delYn:boolean
}