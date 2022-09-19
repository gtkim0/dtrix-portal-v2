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
    userLoginId : string;
    userPassword: string;
    userName:string;
    userPhone:string;
    userEmail:string;
    userSso:false;
    positionName:string;
    groupId:number;
    roleId:number;
    siteId:number;
}