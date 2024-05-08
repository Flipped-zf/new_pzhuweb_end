import type { PaginationParams, SearchTimes } from '@/utils/types'

export type FormTemplateProps = {
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};


export type SearchParams = PaginationParams &
  SearchTimes & Partial<Pick<API.ROLEMANAGEMENT, 'role_name' | 'role_code' | 'status'>>


export type RoleStatusParams = Pick<API.ROLEMANAGEMENT, 'role_id' | 'status'>
