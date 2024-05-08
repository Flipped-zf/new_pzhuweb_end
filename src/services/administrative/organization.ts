
import { ROUTES } from '@/utils/enums'
import type { CreateOrgParams, SearchParams } from '@/utils/types/administrative/organization'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ORGANIZATION


export const getOrganizationList = (options?: SearchParams) =>
  httpRequest.get<API.ORGANIZATION[]>(`${baseURL}`, options);


export const createOrganization = (options: CreateOrgParams) =>
  httpRequest.post<API.ORGANIZATION>(`${baseURL}`, options);


export const updateOrganization = ({ org_id, ...options }: API.ORGANIZATION) =>
  httpRequest.put<number[]>(`${baseURL}/${org_id}`, options);



export const delOrganization = (org_id: string) => httpRequest.delete(`${baseURL}/${org_id}`);
