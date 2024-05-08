
import { ROUTES } from '@/utils/enums'
import type { CreateJobsParams, SearchParams } from '@/utils/types/administrative/jobs-management'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.JOBSMANAGEMENT


export const getJobsList = (options?: SearchParams) => httpRequest.get<API.JOBSMANAGEMENT[]>(`${baseURL}`, options);

export const createJobs = (options: CreateJobsParams) => httpRequest.post<API.JOBSMANAGEMENT>(`${baseURL}`, options);



export const updateJobs = ({ jobs_id, ...options }: API.JOBSMANAGEMENT) =>
  httpRequest.put<number[]>(`${baseURL}/${jobs_id}`, options);

export const delJobs = (jobs_id: string) => httpRequest.delete<number>(`${baseURL}/${jobs_id}`);
