import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {SearchParams} from '@/utils/types/system/role-management';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.ONLINEMRMONITOR

export const getOnlineList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<any>>(`${baseURL}/list`,options);
export const kickuser = (options: API.KICKMONITOR) =>
    httpRequest.post<API.KICKMONITOR>(`${baseURL}/kick`, options);
