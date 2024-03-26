import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {SearchParams} from '@/utils/types/system/role-management';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.SYSTEMRMONITOR
export const getServer = (options?: SearchParams) =>
  httpRequest.get<PageResponse<any>>(`${baseURL}`);


