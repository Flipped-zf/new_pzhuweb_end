import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {ResStatusProps, SearchParams} from '@/utils/types/team/resourceManage';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.RESOURCEMANAGEMENT


export const getResourceList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.RESOURCEMANAGEMENT>>(`${baseURL}`, options);


export const setResStatus = ({ resource_id, status,pinned }: ResStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${resource_id}`, typeof status !== 'undefined' ? { status } : {pinned});

export const createResource = (options: API.RESOURCEMANAGEMENT) =>
    httpRequest.post<API.RESOURCEMANAGEMENT>(`${baseURL}`, options);

export const updateResource = ({ resource_id, ...options }: Partial<API.RESOURCEMANAGEMENT>) =>
    httpRequest.put<number[]>(`${baseURL}/${resource_id}`, options);

export const delResource = (resource_id: string) => httpRequest.delete<number>(`${baseURL}/${resource_id}`);

export const getDetailResource = (resource_id?: string) =>
    httpRequest.get<PageResponse<API.ACHIEVEMENTMANAGEMENT>>(`${baseURL}/detail/${resource_id}`);
