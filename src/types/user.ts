export interface UserBase {
    id:number;
}

export interface User extends UserBase{
    // avatar: string;
    // email: string;
    id:number;
    userId:string;
    userName: string;
    userRole:string;
    userSso:boolean;
    deptId:string;
    deptName:string;
    siteName:string;
    createAt:string;
    [key: string]: any;
}