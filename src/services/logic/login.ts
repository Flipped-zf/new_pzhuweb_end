
import type { LoginTypes } from '@/utils/types';
import type { LoginParams } from '@/utils/types/login'
import { httpRequest } from '@/utils/umiRequest'

export const Login = (options?: LoginParams) => httpRequest.post<LoginTypes>('/auth/login', options);


export const Logout = () => httpRequest.post<Record<string, any>>('/auth/logout');


export const getUserInfo = () => httpRequest.get<API.USERMANAGEMENT>('/auth/user-info');


export const getPermissions = () => httpRequest.get<string[]>('/auth/permissions');


export const getRoutesMenus = () => httpRequest.get<API.MENUMANAGEMENT[]>('/auth/routes-menu');


export const getCaptcha = () => httpRequest.get<string>('/auth/verify-code');
