import { ANNOUNCEMENT_TYPE } from '@/utils/enums'
import type { EnumValues, PaginationParams } from '@/utils/types'


export type CreateAnnouncementProps = Pick<
  API.ANNOUNCEMENT, 'announcement_id' | 'title' | 'content' | 'type' | 'status' | 'pinned'>


export type SearchParams = Partial<Pick<API.ANNOUNCEMENT, 'title' | 'type' | 'pinned'>> & PaginationParams & {
  unready?: boolean; // 是否只查询未读消息
}


export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenModalFalse: () => void
}


export type PinnedParams = Pick<API.ANNOUNCEMENT, 'announcement_id' | 'pinned'>


export type AnnouncementType = EnumValues<typeof ANNOUNCEMENT_TYPE>


export type AlreadyParams = Pick<CreateAnnouncementProps, 'announcement_id'>
