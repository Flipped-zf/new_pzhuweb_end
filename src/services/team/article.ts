import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {ResStatusProps, SearchParams} from '@/utils/types/team/articleManage';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.ARTICLEMANAGEMENT


export const getArticleList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.ARTICLEMANAGEMENT>>(`${baseURL}`, options);
export const setArticleStatus = ({ article_id, status,pinned }: ResStatusProps) =>
  httpRequest.patch<number[]>(`${baseURL}/${article_id}`, typeof status !== 'undefined' ? { status } : {pinned});

export const delArticle = (article_id: string) => httpRequest.delete<number>(`${baseURL}/${article_id}`);

export const createArticle = (options: API.ARTICLEMANAGEMENT) =>
    httpRequest.post<API.ARTICLEMANAGEMENT>(`${baseURL}`, options);

export const updateArticle = ({ article_id, ...options }: Partial<API.ARTICLEMANAGEMENT>) =>
    httpRequest.put<number[]>(`${baseURL}/${article_id}`, options);

export const getArticleDetail = (article_id: string) => httpRequest.get<number>(`${baseURL}/detail/${article_id}`);

