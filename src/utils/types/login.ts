import { LOGIN_TYPE } from '@/utils/enums'
import type { EnumValues } from '@/utils/types'


export type LoginType = EnumValues<typeof LOGIN_TYPE>;

export type LoginParams = {
  type: LoginType;
  user_name?: string;
  password?: string;
  phone?: string;
  captcha?: string;
};
