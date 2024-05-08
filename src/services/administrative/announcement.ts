
import { ROUTES } from '@/utils/enums'
import type { PageResponse } from '@/utils/types'
import type {
  AlreadyParams,
  AnnouncementType,
  CreateAnnouncementProps,
  PinnedParams,
  SearchParams,
} from '@/utils/types/administrative/announcement'
import { httpRequest } from '@/utils/umiRequest'

const baseURL = ROUTES.ANNOUNCEMENT


export const getAnnouncementList = (options?: SearchParams) =>
  httpRequest.get<PageResponse<API.ANNOUNCEMENT>>(`${baseURL}`, options);

export const saveAnnouncement = (options: CreateAnnouncementProps) =>
  httpRequest.post<API.ANNOUNCEMENT | number[]>(`${baseURL}`, options);



export const delAnnouncement = (announcement_id: string) => httpRequest.delete<number>(`${baseURL}/${announcement_id}`);


export const setPinned = ({ announcement_id, pinned }: PinnedParams) =>
  httpRequest.patch<number[]>(`${baseURL}/${announcement_id}`, { pinned });



export const announcementAlready = (options: AlreadyParams) =>
  httpRequest.post<API.ALREADY>(`${baseURL}/already`, options);


export const queryUnreadyCount = () => httpRequest.get<Record<AnnouncementType, number>>(`${baseURL}/unready`);
