import {PaginationParams, SearchTimes} from '@/utils/types';

export type SearchParams = PaginationParams & SearchTimes &
  Partial<Pick<API.ACHIEVEMENTMANAGEMENT, 'title' | 'pinned' | 'type'|'status'>>
export type ResStatusProps = Partial<Pick<API.ACHIEVEMENTMANAGEMENT, 'achievement_id' | 'status' | 'pinned'>>
