import {PaginationParams, SearchTimes} from '@/utils/types';

export type SearchParams = PaginationParams & SearchTimes &
  Partial<Pick<API.RESOURCEMANAGEMENT, 'title' | 'pinned' | 'type'|'status'>>
export type ResStatusProps = Partial<Pick<API.RESOURCEMANAGEMENT, 'resource_id' | 'status' | 'pinned'>>
