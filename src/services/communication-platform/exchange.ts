import {gotoDetailProps} from '@/pages/communication-platform/platform-square/utils';
import {EXCHANGE} from '@/services/API';
import {ROUTES} from '@/utils/enums';
import {PageResponse, Response} from '@/utils/types';
import {updateStartProps} from '@/utils/types/communication-platform';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.PLATFORM
export const getPlatform = () =>
  httpRequest.get<PageResponse<any>>(`${baseURL}/list`);


export const getTopList = () =>
  httpRequest.get<PageResponse<any>>(`${baseURL}/top-list`);

export const updateStart = ({ ac_id, type,type_id }: updateStartProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${ac_id}`, { type,type_id });

export const getHotList = () =>
    httpRequest.get<PageResponse<any>>(`${baseURL}/hot-list`);

export const getALlList = (options : API.EXCHANGE) =>
    httpRequest.get<PageResponse<any>>(`${baseURL}/all-list`,options);



