
import type { Settings as LayoutSettings } from '@ant-design/pro-components';

import { FLAG, LANGS, LOCAL_STORAGE, REQUEST_METHODS, ROUTES, STATUS } from '@/utils/enums'


export type EnumKeys<T> = keyof T;


export type EnumValues<T> = T[EnumKeys<T>];


export type Status = EnumValues<typeof STATUS>


export type ArrayType<T extends any[]> = T extends Array<infer R> ? R : never;


export type CommonTypes = {
  parent_id?: string; // 父级id
  status: Status; // 组织状态
  sort: number; // 排序
  leader: string; // 岗位负责人
  founder: string; // 创建人
  describe: string; // 描述
}


export type TableTimes = {
  created_time: string; // 创建时间
  updated_time: string; // 最后一次更新时间
}


export type SearchTimes = {
  start_time?: string; // 开始日期
  end_time?: string; // 结束日期
}


export type Response<T = any> = {
  code?: number;
  data: T;
  msg?: string;
};


export type PageResponse<T> = {
  total: number;
  list: T[];
};


export type PaginationParams = {
  current: number; // 当前页码
  pageSize: number; // 每页条数
}


export type RequestMethods = EnumValues<typeof REQUEST_METHODS>


export type InitialStateTypes = {
  Locales?: Record<string, any>;
  Access_token?: string;
  Settings?: Partial<LayoutSettings>;
  CurrentUser?: API.USERMANAGEMENT;
  Permissions?: string[];
  RouteMenu?: API.MENUMANAGEMENT[];
  Collapsed?: boolean;
}


export type AppLocalCacheTypes = {
  [LOCAL_STORAGE.USER_INFO]?: API.USERMANAGEMENT;
  [LOCAL_STORAGE.LAYOUT]?: Partial<LayoutSettings>;
  [LOCAL_STORAGE.ACCESS_TOKEN]?: string;
}


export type LoginTypes = {
  access_token: string;
  login_last_time: Date;
}



export type LockSleepTypes = {
  last_time: number;
  isSleep: boolean;
}


export type Langs = EnumValues<typeof LANGS>


export type Flag = EnumValues<typeof FLAG>

export type PathNames = EnumValues<typeof ROUTES>
