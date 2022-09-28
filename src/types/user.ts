export interface UserBase {
    userId:number;
}

// export interface User extends UserBase{
//     // avatar: string;
//     // email: string;
//     id:number;
//     userId:string;
//     userName: string;
//     userRole:string;
//     userSso:boolean;
//     deptId:string;
//     deptName:string;
//     siteName:string;
//     createAt:string;
//     [key: string]: any;
// }

export interface User extends UserBase {
    userId:number;
    avatar:string;
    userLoginId : string;
    userPassword: string;
    userName:string;
    userPhone:string;
    userEmail:string;
    userSso:boolean;
    positionName:string;
    groupId:number;
    roleId:number;
    roleName:string;
    siteId:number;
    siteName:string;
    createAt:string;
    delYn:boolean;
    createdAt:number;
    modifiedAt:number;
}