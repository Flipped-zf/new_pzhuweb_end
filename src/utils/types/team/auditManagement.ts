import {PaginationParams, SearchTimes} from '@/utils/types';

export type SearchParams = PaginationParams &
    SearchTimes & Partial<API.AUDITMANAGEMENT>
