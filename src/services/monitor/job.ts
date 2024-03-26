import {ROUTES} from '@/utils/enums';
import {PageResponse} from '@/utils/types';
import {JobStatusProps} from '@/utils/types/monitor';
import {SearchParams} from '@/utils/types/system/role-management';
import {httpRequest} from '@/utils/umiRequest';

const baseURL = ROUTES.JOBMRMONITOR
export const getJobList = (options?: SearchParams) =>
    httpRequest.get<PageResponse<any>>(`${baseURL}/list`,options);

export const setJobStatus = ({ job_id, status }: JobStatusProps) =>
    httpRequest.patch<number[]>(`${baseURL}/${job_id}`, { status });

export const createJob = (options: API.JOBTMONITOR) =>
    httpRequest.post<API.JOBTMONITOR>(`${baseURL}`, options);
export const delJob = (job_id: string) => httpRequest.delete<number>(`${baseURL}/${job_id}`);

export const updateJob = ({ job_id, ...options }: Partial<API.JOBTMONITOR>) =>
    httpRequest.put<number[]>(`${baseURL}/${job_id}`, options);

export const runJob = (job_id: string) =>
    httpRequest.put<number[]>(`${baseURL}/run/${job_id}`);


