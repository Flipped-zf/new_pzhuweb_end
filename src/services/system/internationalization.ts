
import { ROUTES } from '@/utils/enums'
import type { CreateInternationalParams, SearchParams } from '@/utils/types/system/internationalization'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.INTERNATIONALIZATION

export const getInternationalList = (options?: SearchParams) =>
  httpRequest.get<API.INTERNATIONALIZATION[]>(`${baseURL}`, options);


export const getAllLocalesLang = () => httpRequest.get<API.LOCALESLANGAll>(`${baseURL}/allLocales`);



export const createInternational = (options: CreateInternationalParams) =>
  httpRequest.post<API.INTERNATIONALIZATION>(`${baseURL}`, options);


export const updateInternational = ({ id, ...options }: API.INTERNATIONALIZATION) =>
  httpRequest.put<number[]>(`${baseURL}/${id}`, options);

export const delInternational = (id: string) => httpRequest.delete(`${baseURL}/${id}`);
