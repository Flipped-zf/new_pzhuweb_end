
import { ROUTES } from '@/utils/enums'
import type { PageResponse, SearchTimes } from '@/utils/types'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.OPERATIONLOG



export const getOperationLogList = (options?: SearchTimes) =>
  httpRequest.get<PageResponse<API.OPERATIONLOG>>(`${baseURL}`, options);
