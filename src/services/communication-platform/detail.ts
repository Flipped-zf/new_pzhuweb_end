import {gotoDetailProps} from '@/pages/communication-platform/platform-square/utils';
import {ROUTES} from '@/utils/enums';
import {PageResponse, Response} from '@/utils/types';
import {CreateComment} from '@/utils/types/communication-platform';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.PLATFORMDETAIL


export const getDetail = (options : gotoDetailProps) =>
    httpRequest.get<PageResponse<any>>(`${baseURL}/detail`,options);


export const addReadNum = (options : gotoDetailProps) =>
    httpRequest.patch<Response<any>>(`${baseURL}/read-add`,options);

export const addComment = (options: CreateComment) =>
  httpRequest.post<CreateComment>(`${baseURL}/comment`, options);

export const getCommentLIst = ({id,type}) =>
  httpRequest.get<Response<any>>(`${baseURL}/comment-list/${id}`,{
    type,
  });
