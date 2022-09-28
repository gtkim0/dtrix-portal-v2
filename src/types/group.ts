
export interface GroupBase {
    groupId: number
}

export interface Group extends GroupBase{
    groupName:string,
    groupDescription:string,
    createdAt:number,
    modifiedAt:number,
    delYn:boolean
}