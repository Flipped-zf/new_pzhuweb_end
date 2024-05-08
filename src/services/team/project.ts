import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {DoingProProps, SearchParamsPro} from '@/utils/types/system/project-manage';
import {SearchParams} from '@/utils/types/system/role-management';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.PROJECTMANAGEMENT

export const createProject = (
  options: API.PROJECTMANAGE,
) => httpRequest.post<API.PROJECTMANAGE>(`${baseURL}`, options);

export const updateProject = (
  p_id:string,
  options: API.PROJECTMANAGE,
) => httpRequest.put<API.PROJECTMANAGE>(`${baseURL}/${p_id}`, options);

export const getpulist = (name:string) => httpRequest.get<Response>(`${baseURL}/personList`,{
  name,
})
export const getProjectList = (options?: SearchParamsPro) =>
    httpRequest.get<PageResponse<API.PROJECTMANAGE>>(`${baseURL}`, options);

export const deleteProject = (p_id:string) => httpRequest.delete<Response>(`${baseURL}/${p_id}`)

export const doingProApi = (optins: DoingProProps) => httpRequest.post<Response>(`${baseURL}/action`,optins)

export const doingListApi = (p_id:string) => httpRequest.get<Response>(`${baseURL}/dongList/${p_id}`)
