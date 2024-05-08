import { FormInstance } from '@ant-design/pro-components'
import { MutableRefObject } from 'react'

import type { PaginationParams, SearchTimes } from '@/utils/types'


export type FormTemplateProps = {
  reloadTable: () => void;
  setModalVisibleFalse: () => void;
  modalVisible: boolean;
  stepFormMapRef: MutableRefObject<MutableRefObject<FormInstance<any> | undefined>[]>;
};


export type UserInformationProps = {
  showLabel?: boolean;
  disabledField?: boolean
};


export type SearchParams = PaginationParams & SearchTimes &
  Partial<Pick<API.USERMANAGEMENT, 'user_name' | 'sex' | 'status'>>


export type UserStatusProps = Pick<API.USERMANAGEMENT, 'user_id' | 'status'>
