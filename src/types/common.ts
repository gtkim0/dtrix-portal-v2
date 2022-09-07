export interface Result<T = any> {
    code: number;
    message?: string;
    data: T;
}

export interface Page<T = any> {
    total: number;
    size: number;
    page: number;
    list: T[];
}

