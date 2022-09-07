import instance from "./index";
import { Result, Page } from "../types/common";
import type { Group, GroupConfig, GroupItem, TreeNode } from '../types/group';

const path = '/pc/groups';

class GroupApi {

    getGroupList(id: string): Promise<Result<GroupItem[]>> {
        return instance.get<Result<GroupItem[]>, Result<GroupItem[]>>(`${path}/${id}/list`);
    }

    getTree(id: string): Promise<Result<TreeNode[]>> {
        return instance.get<Result<TreeNode[]>, Result<TreeNode[]>>(`${path}/${id}/tree`);
    }

    getChildGroups(id: string, params?: any): Promise<Result<Group[]>> {
        return instance.get<Result<Group[]>, Result<Group[]>>(`${path}/${id}/child`, { params });
    }

    getRootGroupConfig(): Promise<Result<GroupConfig>> {
        return instance.get<Result<GroupConfig>, Result<GroupConfig>>(`${path}/01/config`);
    }

    updateRootGroupConfig(config: GroupConfig): Promise<Result<GroupConfig>> {
        return instance.put<Result<GroupConfig>, Result<GroupConfig>>(`${path}/01/config`, config);
    }

    getGroup(id: string): Promise<Result<Group>> {
        return instance.get<Result<Group>, Result<Group>>(`${path}/${id}`);
    }

    createGroup(group: Group): Promise<Result<Group>> {
        return instance.post<Result<Group>, Result<Group>>(path, group);
    }

    updateGroup(id: string, group: Group): Promise<Result<Group>> {
        return instance.put<Result<Group>, Result<Group>>(`${path}/${id}`, group);
    }

    deleteGroup(id: string): Promise<Result<Group>> {
        return instance.delete<Result<Group>, Result<Group>>(`${path}/${id}`);
    }
}

export const groupApi = new GroupApi();
