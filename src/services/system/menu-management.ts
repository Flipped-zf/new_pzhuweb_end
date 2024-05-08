
import { ROUTES } from '@/utils/enums'
import type { SearchParams } from '@/utils/types/system/menu-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.MENUMANAGEMENT



export const getMenuList = (options?: SearchParams) => httpRequest.get<API.MENUMANAGEMENT[]>(`${baseURL}`, options);


export const createMenu = (options: Partial<API.MENUMANAGEMENT>) =>
  httpRequest.post<API.MENUMANAGEMENT>(`${baseURL}`, options);


export const updateMenu = ({ menu_id, ...options }: API.MENUMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${menu_id}`, options);


export const delMenu = (menu_id: string) => httpRequest.delete<number>(`${baseURL}/${menu_id}`);
