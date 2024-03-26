import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {ResStatusProps, SearchParams} from '@/utils/types/team/achievementManage';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.AHIEVEMENTMANAGEMENT


export const getAcList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.ACHIEVEMENTMANAGEMENT>>(`${baseURL}`, options);


export const setAcStatus = ({ achievement_id, status,pinned }: ResStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${achievement_id}`, typeof status !== 'undefined' ? { status } : {pinned});

export const createAchievement = (options: API.ACHIEVEMENTMANAGEMENT) =>
    httpRequest.post<API.ACHIEVEMENTMANAGEMENT>(`${baseURL}`, options);

export const updateAchievement = ({ achievement_id, ...options }: Partial<API.ACHIEVEMENTMANAGEMENT>) =>
    httpRequest.put<number[]>(`${baseURL}/${achievement_id}`, options);

export const delAchievement = (achievement_id: string) => httpRequest.delete<number>(`${baseURL}/${achievement_id}`);


export const getDetail = (achievement_id?: string) =>
    httpRequest.get<PageResponse<API.ACHIEVEMENTMANAGEMENT>>(`${baseURL}/detail/${achievement_id}`);
