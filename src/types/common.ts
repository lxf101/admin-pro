// 角色接口
export interface IRole {
    role: number;
    roleName: string;
}

// 有权限的角色接口
export interface IRoleWidthAuth {
    roleId: number;
    roleName: string;
    authority: number[];
}

// 用户接口
export interface IUser {
    id: number;
    userName: string;
    nickName: string;
    role: IRole[];
}

// 用户查询接口
export interface IQueryUser {
    nickName: string;
    role: number; // 角色编号
}

// 用户编辑接口
export interface IUserEdit {
    id: number;
    nickName: string;
    role: number[];
    userName: string;
}
