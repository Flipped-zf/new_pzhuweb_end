import {PaginationParams, SearchTimes} from '@/utils/types';


export type SearchParams = PaginationParams & SearchTimes &
    Partial<Pick<API.JOBTMONITOR, 'job_name' | 'job_group' | 'status'|'misfire_policy'>>

export type JobStatusProps = Pick<API.JOBTMONITOR, 'job_id' | 'status'>

export type LogSearchParams = Partial<API.JOBLOGMONITOR> & PaginationParams & SearchTimes
export type LoginLogSearchParams = Partial<API.LOGINLOGMONITOR> & PaginationParams & SearchTimes

export type OnlineSearchParams = Partial<API.ONLINEMONITOR> & PaginationParams & SearchTimes

