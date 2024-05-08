
import type { ColumnsState, RequestData } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import {data} from '@umijs/utils/compiled/cheerio/lib/api/attributes';
import CryptoJS from 'crypto-js'; // AES/DES加密
import { compact, eq, get, join, sample, startsWith } from 'lodash-es';
import moment from 'moment';
import { stringify } from 'querystring';
import {useEffect, useState} from 'react';

import {getCodeList} from '@/services';
import { getPermissions, getRoutesMenus, getUserInfo } from '@/services/logic/login' // 登录相关接口
import {getDictList} from '@/services/system/dict-manage';
import { LOCAL_STORAGE, REQUEST_CODE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes, LockSleepTypes, PageResponse, Response } from '@/utils/types'

export function OverNumShow(str: string | number) {
  if(!str) {
    return 0
  }
  return Number(str) > 99 ? '99+' : Number(str)
}

export function findKey(option,key) {
  return option?.find((item) => item.value === key).label ?? '暂无'
}

export function FormatTime(str: string) {
  return moment(str).format('DD.MM.YYYY HH:mm')
}

export function ShowTagList(options:any[],keys:any[],other? : string[]) {

  const list = keys.map((item,index) => findKey(options[index],item)) ?? []


  return list.concat(other)
}


export const initUserAuthority = async (): Promise<InitialStateTypes> => {
  try {
    // 获取用户信息和菜单按钮权限
    const [userInfo, routeMenuInfo, permissionInfo] =
      await Promise.all([getUserInfo(), getRoutesMenus(), getPermissions()])
    // 初始化全局状态
    return {
      CurrentUser: get(userInfo, 'data', {}),
      RouteMenu: get(routeMenuInfo, 'data', []),
      Permissions: get(permissionInfo, 'data', []),
    }
  } catch (error) {
    history.push(ROUTES.LOGIN);
    return {}
  }
}


export const isSuccess = (code?: number): boolean => eq(code, REQUEST_CODE.SUCCESS)


export const formatResponse = <T extends any[]>(
  response: Response<T> |
    Response<PageResponse<T[number]>>): RequestData<T[number]> => {
  // 解构响应值
  const { code, data } = response
  return {
    data: get(data, 'list') || get(response, 'data') || [],
    // success 请返回 true，不然 table 会停止解析数据，即使有数据
    success: isSuccess(code),
    total: get(data, 'total', 0),
  }
}


export const formatPathName = (pathname: string): string => {
  return join(compact(pathname.split('/')), '.')
}


export const formatPerfix = (route: string, suffix = '', isMenu = false): string => {
  // 国际化字符串
  const field = `${isMenu ? 'menu' : 'pages'}.${formatPathName(route)}${suffix ? '.' + suffix : ''}`
  return startsWith(route, 'global') ? route : field
}


export const getLocalStorageItem = <T>(key: string): T | null => {
  // 获取 值
  const item = localStorage.getItem(key);
  // 判断是否为空
  if (item === null) {
    return null;
  }
  // 不为空返回解析后的值
  const result: T = JSON.parse(item);
  return result
}


export const setLocalStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  localStorage.setItem(key, result);
}


export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
}

const CRYPTO_KEY = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥
const CRYPTO_IV = CryptoJS.enc.Utf8.parse('ABCDEF0123456789'); // 十六位十六进制数作为密钥偏移量


export const encryptionAesPsd = (password: string): string => {
  const encrypted = CryptoJS.AES.encrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString(); // 返回的是base64格式的密文
};


export const decryptionAesPsd = (password: string): string => {
  const decrypted = CryptoJS.AES.decrypt(password, CRYPTO_KEY, {
    iv: CRYPTO_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8); // 返回的是解密后的字符串
};

export const logoutToLogin = () => {
  const { search, pathname } = window.location;
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = getLocalStorageItem<LockSleepTypes>(LOCAL_STORAGE.LOCK_SLEEP)
  const urlParams = new URL(window.location.href).searchParams;
  /** 此方法会跳转到 redirect 参数所在的位置 */
  const redirect = urlParams.get('redirect');
  // 移除 token
  removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
  // 取消睡眠弹窗
  if (LOCK_SLEEP) {
    setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: false })
  }
  // 重定向地址
  if (window.location.pathname !== ROUTES.LOGIN && !redirect) {
    history.replace({
      pathname: ROUTES.LOGIN,
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
}

export const timeFix = (): string => {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '夜深了'
}


export const welcomeWords = (): string => {
  const words = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 LOL', '我猜你可能累了', '认真工作吧', '今天又是充满活力的一天']
  return sample(words)
}


export const isHttpLink = (link: string): boolean => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-z\\d%_.~+]*)*' + // path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(link);
}


export const renderColumnsStateMap = (MENU_CFG: string[] = []) => {
  const result: Record<string, ColumnsState> = {}
  MENU_CFG.forEach((ele) => {
    result[ele] = {
      show: false,
    }
  })
  return result
}



export const randomTagColor = () => {
  const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
  return sample(colors)
}

export const useDictCode = (code: string | string[]) => {

  const [codelist,setDate] = useState({})

  const params:string[] = typeof code === 'string' ? [code] : code

  useEffect(() => {
    getCodeList(params).then((res) => {
        if(res.code === 200) {setDate((res.data))}
    })
  },[])

    return codelist
}

export const useDictCodeAsync:() => Promise<any> = (code: string | string[]) => {


  const params:string[] = typeof code === 'string' ? [code] : code

  return new Promise((r) => {
    getCodeList(params).then((res) => {
      if(res.code === 200) { r(res.data)}
    })
  })
}



export const optionsToValueEnum = (data:object[],showStatus = false) => {
  const obj = {}

  if(!data?.length){
    return obj
  }

  data.forEach((item) => {
    obj[item.value] = {
      text: item.label,
      status: showStatus ? item.show_status : '',
    }
  })
  return obj
}
