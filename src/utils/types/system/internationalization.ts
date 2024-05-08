import type { SearchTimes } from '@/utils/types'


export type FormTemplateProps = {
  treeData: API.INTERNATIONALIZATION[]; // 国际化树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void
};


export type SearchParams = SearchTimes & Partial<Pick<API.INTERNATIONALIZATION, 'name'> & {
  isMenu?: boolean; // 是否是菜单数据
}>


export type CreateInternationalParams = Pick<API.INTERNATIONALIZATION, 'parent_id' | 'name' | 'sort'>
  & Partial<API.LOCALESLANGAll>
