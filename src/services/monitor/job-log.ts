import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {SearchParams} from '@/utils/types/system/role-management';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.JOBLOGMRMONITOR

export const getJobLogList = (options?: SearchParams) =>
    httpRequest.get<PageResponse<any>>(`${baseURL}/list`,options);



