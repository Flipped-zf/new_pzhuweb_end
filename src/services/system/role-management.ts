
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { RoleStatusParams, SearchParams } from '@/utils/types/system/role-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ROLEMANAGEMENT



export const getRoleList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.ROLEMANAGEMENT>>(`${baseURL}`, options);


export const createRole = (
  options: Omit<API.ROLEMANAGEMENT, 'role_id' | 'founder' | 'created_time' | 'updated_time'>,
) => httpRequest.post<API.ROLEMANAGEMENT>(`${baseURL}`, options);


export const updateRole = ({ role_id, ...options }: API.ROLEMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${role_id}`, options);


export const delRole = (role_id: string) => httpRequest.delete<number>(`${baseURL}/${role_id}`);


export const setRoleStatus = ({ role_id, status }: RoleStatusParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${role_id}`, { status });
