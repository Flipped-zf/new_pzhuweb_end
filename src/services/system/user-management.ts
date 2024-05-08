
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type { SearchParams, UserStatusProps } from '@/utils/types/system/user-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.USERMANAGEMENT

export const getUserList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.USERMANAGEMENT>>(`${baseURL}`, options);


export const createUser = (options: API.USERMANAGEMENT) => httpRequest.post<API.USERMANAGEMENT>(`${baseURL}`, options);

export const updateUser = ({ user_id, ...options }: Partial<API.USERMANAGEMENT>) =>
  httpRequest.put<number[]>(`${baseURL}/${user_id}`, options);


export const delUser = (user_id: string) => httpRequest.delete<number>(`${baseURL}/${user_id}`);


export const setUserStatus = ({ user_id, status }: UserStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${user_id}`, { status });
