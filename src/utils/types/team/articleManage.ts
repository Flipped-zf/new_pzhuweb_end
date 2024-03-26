import {PaginationParams, SearchTimes} from '@/utils/types';

export type SearchParams = PaginationParams & SearchTimes &
  Partial<Pick<API.ARTICLEMANAGEMENT, 'title' | 'pinned' | 'menu_id'|'status' | 'technology_id' | 'keywords'>>

export type ResStatusProps = Partial<Pick<API.ARTICLEMANAGEMENT, 'article_id' | 'status' | 'pinned'>>
