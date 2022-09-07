export interface GroupBase {

    id: string;
    name: string;
    parentId: string;
}

export interface Group extends GroupBase {

    parentName: string;

    sort: number;

    isUse: boolean;
    alarmDisable: boolean;

    description: string;
    logo: number;

    managerId: string;
    managerName: string;

    [key: string]: any;
}

export interface GroupItem extends GroupBase {
    level: number;
}

export interface TreeNode extends GroupBase {

    type: string;
    deviceType: string; // 모바일/CCTV 구분
    isEmpowerment?: boolean; // 권한 부여 차량 여부
    sort?: number; // 조직내 순번
    level?: number; // node level
    concatId?: string; // 소속 그룹 ,구분 배열

    managerId?: string;

    event?: string;
    uuid?: string;
    src?: string;
    state?: string;

    lat?: number;
    lon?: number;

    cpuTemp?: number;
    charging?: boolean;
    battery?: number;

    eventCode?: string;
    eventCaseNo?: string;
    eventKind?: string;
    eventTime?: number;

    mediaStatus?: string;
    signalStatus?: string;

    time?: number; // device Status time

    lastTime?: number;
    lastLat?: number;
    lastLng?: number;
    aniStartTime?: number;

    [key: string]: any;
}

export interface GroupConfig {

    id: string;
    resolution: number;
    fps: number;
    rtsp: string;
}
