import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {httpRequest} from '@/utils/umiRequest';
const baseURL = ROUTES.DICTMANAGEMENT

export const getCodeList = (dict_id: string[]) => httpRequest.post<PageResponse<any>>(`${baseURL}/code-detail`,dict_id);

