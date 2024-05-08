import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {DictStatusParams, SearchParams} from '@/utils/types/system/dict-manage';
import {httpRequest} from '@/utils/umiRequest';
const baseURL = ROUTES.DICTMANAGEMENT

export const getDictList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.DICTMANAGEMENT>>(`${baseURL}`, options);
export const createDict = (
  options: Omit<API.DICTMANAGEMENT, 'dict_id' | 'founder' | 'created_time' | 'updated_time'>,
) => httpRequest.post<API.DICTMANAGEMENT>(`${baseURL}`, options);


export const updateDict = ({ dict_id, ...options }: API.DICTMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${dict_id}`, options);


export const delDict = (dict_id: string) => httpRequest.delete<number>(`${baseURL}/${dict_id}`);


export const setDictStatus = ({ dict_id, status }: DictStatusParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${dict_id}`, { status });

export const getCodeList = (dict_id: string) => httpRequest.get<PageResponse<any>>(`${baseURL}/code-list/${dict_id}`);

export const createCode = (
  options: any[],
  dict_id:string,
) => httpRequest.post<any>(`${baseURL}/code-list/${dict_id}`, options);
export const delCode = (code_id: string) => httpRequest.delete<number>(`${baseURL}/code-list/${code_id}`);
