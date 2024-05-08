import {ROUTES} from '@/utils/enums';
import {PageResponse, Response} from '@/utils/types';
import {SearchParams} from '@/utils/types/team/articleManage';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.AUDITMANAGEMENT


export const getAuditList = (options?: SearchParams) =>
    httpRequest.get<PageResponse<API.AUDITMANAGEMENT>>(`${baseURL}`, options);


export const createAudit = (options: API.AUDITMANAGEMENT) =>
    httpRequest.post<API.AUDITMANAGEMENT>(`${baseURL}`, options);

export const getPageDetail = (id:string) =>
    httpRequest.get<PageResponse<API.AUDITMANAGEMENT>>(`${baseURL}/detail/${id}`);

export const cancelAC = (id:string,title: string) =>
    httpRequest.patch<Response<any>>(`${baseURL}/cancel/${id}`, {
        title,
    });
