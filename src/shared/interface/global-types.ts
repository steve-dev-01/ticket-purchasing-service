
export interface findAllMeta {
    totalCount: number;
    perPage: number;
    currentPage: number;
}

export interface PaginateParamInterface {
    size?: number | undefined;
    skip?: number | undefined;
    sort?: 'asc' | 'desc' | undefined
}

export interface JWTPayload {
    id: string;
}
