import {PaginationParams, SearchTimes} from '@/utils/types';

export type SearchParams = PaginationParams &
  SearchTimes & Partial<Pick<API.DICTMANAGEMENT, 'dict_name' | 'dict_code' | 'status'>>

export type DictStatusParams = Pick<API.DICTMANAGEMENT, 'dict_id' | 'status'>
