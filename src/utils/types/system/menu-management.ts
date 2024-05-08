import { LAYOUT_TYPE, MENU_THEME, MENU_TYPE, TARGET_TYPE } from '@/utils/enums'
import type { EnumValues, SearchTimes } from '@/utils/types'


export type MenuTypes = EnumValues<typeof MENU_TYPE>



export type TargetTypes = EnumValues<typeof TARGET_TYPE>


export type LayoutTypes = EnumValues<typeof LAYOUT_TYPE>


export type MenuTheme = EnumValues<typeof MENU_THEME>



export type FormTemplateProps = {
  treeData: API.MENUMANAGEMENT[]; // 菜单树形数据
  reloadTable: () => void; // 刷新表格
  open: boolean;
  setOpenDrawerFalse: () => void;
};


export type SearchParams = {
  isPremission?: boolean; // 是否是角色权限
} & SearchTimes & Partial<Pick<API.MENUMANAGEMENT, 'menu_type' | 'status'>>
