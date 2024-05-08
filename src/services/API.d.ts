

import type { CommonTypes, Flag, Langs, RequestMethods, TableTimes } from '@/utils/types'
import {Status} from '@/utils/types';
import type { AnnouncementType } from '@/utils/types/administrative/announcement'
import type { OrgTypes } from '@/utils/types/administrative/organization'
import type { LayoutTypes, MenuTheme, MenuTypes, TargetTypes } from '@/utils/types/system/menu-management'

declare global {
  namespace API {


    type LOCALESLANGAll = Record<Langs, string>


    type ORGANIZATION = {
      org_id: string; // 组织id
      org_name: string; // 组织名称
      org_code: string; // 组织编码
      org_type: OrgTypes; // 组织类型
      org_logo?: string; // 组织 logo
      children?: ORGANIZATION[];
    } & TableTimes & CommonTypes


    type JOBSMANAGEMENT = TableTimes & {
      jobs_id: string; // 岗位id
      jobs_name: string; // 岗位名称
      children?: JOBSMANAGEMENT[];
    } & Pick<ORGANIZATION, 'org_id' | 'org_name' | 'org_logo'>
      & Omit<CommonTypes, 'status'>;


    type MENUMANAGEMENT = {
      menu_id: string; // 菜单id
      name: string; // 国际化对应的name
      menu_type: MenuTypes; // 菜单类型
      path?: string; // 路由url
      icon?: string; // 菜单图标
      component?: string; // 菜单对应的文件路径
      redirect?: string; // 路由重定向地址
      target?: TargetTypes; // 当path是一个url，点击新窗口打开
      permission?: string; // 菜单标识(页面按钮权限控制)
      layout?: LayoutTypes; // 是否显示layout布局
      navTheme?: MenuTheme; // 导航菜单的主题
      headerTheme?: MenuTheme; // 顶部导航的主题，mix 模式生效
      hideChildrenInMenu: Flag; // 是否隐藏子路由
      hideInMenu: Flag; // 是否隐藏菜单，包括子路由
      hideInBreadcrumb: Flag; // 是否在面包屑中隐藏
      headerRender: Flag; // 是否显示顶栏
      footerRender: Flag; // 是否显示页脚
      menuRender: Flag; // 当前路由是否展示菜单
      menuHeaderRender: Flag; // 当前路由是否展示菜单顶栏
      flatMenu: Flag; // 子项往上提，只是不展示父菜单
      fixedHeader: Flag; // 固定顶栏
      fixSiderbar: Flag; // 固定菜单
      routes?: MENUMANAGEMENT[];
      children?: MENUMANAGEMENT[];
    } & TableTimes & LOCALESLANGAll & Omit<CommonTypes, 'leader' | 'describe'>;


    type PERMISSION = TableTimes & {
      permission_id: string; // 权限id
      role_id: string; // 角色id
    } & Pick<MENUMANAGEMENT, 'menu_id'>;


    type ROLEMANAGEMENT = {
      role_id: string; // 角色id
      role_name: string; // 角色名称
      role_code: string; // 角色编码
      menu_permission: PERMISSION[]; // 菜单权限
      data_scope: string; // 数据权限
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;

    type DICTMANAGEMENT = {
      dict_id: string; // 角色id
      dict_name: string; // 角色名称
      dict_code: string; // 角色编码
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;

    type USERMANAGEMENT = TableTimes & {
      user_id: string; // 用户id
      user_name: string; // 用户名称
      work_no: string; // 用户工号
      password: string; // 密码(加密)
      confirmPassword?: string // 确认密码
      cn_name: string; // 中文名
      en_name?: string; // 英文名
      age: number; // 年龄
      email: string; // 电子邮箱
      phone: string; // 电话号码
      avatar_url: string; // 头像地址
      sex: string; // 用户性别
      token: string; // 用户令牌
      motto: string; // 座右铭
      tags: string[]; // 人物标签
      city: string[]; // 所属城市
      address: string; // 详细地址
      login_num: number; // 登录次数
      login_last_ip: string; // 最后一次登录ip
      login_last_time: Date; // 最后一次登录时间
    } & Pick<ORGANIZATION, 'org_id' | 'org_name'>
      & Pick<JOBSMANAGEMENT, 'jobs_id' | 'jobs_name'>
      & Pick<ROLEMANAGEMENT, 'role_id' | 'role_name'>
      & Pick<CommonTypes, 'sort' | 'founder' | 'status'>;


    type ANNOUNCEMENT = TableTimes & {
      announcement_id: string; // id 主键
      title: string; // 标题
      content: string; // 正文内容
      type: AnnouncementType; // 类型
      pinned: Flag; // 是否置顶
      read_counts: number; // 阅读次数
      already: Flag; // 是否已读
    } & Pick<USERMANAGEMENT, 'user_id' | 'avatar_url' | 'cn_name'> & Pick<CommonTypes, 'status'>


    type ALREADY = TableTimes & {
      id: string;
    } & Pick<USERMANAGEMENT, 'user_id'> & Pick<ANNOUNCEMENT, 'announcement_id'>

    type INTERNATIONALIZATION = TableTimes & {
      id: string;
      name: string;
      children?: INTERNATIONALIZATION[];
    } & LOCALESLANGAll & Pick<CommonTypes, 'parent_id' | 'founder' | 'sort'>;


    type OPERATIONLOG = TableTimes & {
      log_id: string; // id
      content: string; // 日志内容
      ip: string; // ip
      path: string; // 前端路由
      user_agent: string; // 代理
      method: RequestMethods; // 请求方式
      params: Record<string, any>; // 请求参数
      api_url: string; // 请求地址
    } & Pick<USERMANAGEMENT, 'user_id'>;

    type RESOURCEMANAGEMENT = {
      resource_id: string;
      title: string; // 标题
      type: string; // 类型
      pinned: Status; // 是否置顶
      typeDetail: string; //
      link?: string | null;
      attachment?: string | null;
      article_type?:string;
      article_status?:string;
      posterlink: string;
      readnumber: string;
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;

    type ACHIEVEMENTMANAGEMENT = {
      achievement_id: string;
      title: string; // 标题
      type: string; // 类型
      pinned: Status; // 是否置顶
      typeDetail: string; //
      achievementlink?: string | null;
      achievement?: string | null;
      article_type?:string;
      article_status?:string;
      posterlink: string;
      readnumber: string;
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;


    type ARTICLEMANAGEMENT = {
      article_id?: string;
      title: string; // 标题
      menu_id: string; // 类型
      technology_id:string;
      keywords: string;
      postlink?: string | null;
      raws: string;
      context: string;
      pinned: Status; // 是否置顶
      article_status?: string;
      article_type?:string;
      readnumber: string;
    } & TableTimes & Omit<CommonTypes, 'parent_id' | 'leader'>;



    type AUDITMANAGEMENT = {
      title?: string;
      article_type?: string;
      article_status?: string;
      reason?: string;
      attachment?: string;
      as_id?:string;
    } & TableTimes ;


    type JOBTMONITOR = {
      remark: string; // 备注
      job_id: string; //
      job_name: string; // 任务名称
      job_group: string; // 任务组名
      invoke_target: string; // 调用目标字符串
      cron_expression: string; // cron执行表达式
      misfire_policy: string; // 计划执行错误策略（1立即执行 2执行一次 3放弃执行）
      concurrent: string; // 是否并发执行（0允许 1禁止）
      status: Status;
      version: string;
      create_by: string;
      update_by: string;
    } & TableTimes

    type JOBLOGMONITOR = {
      job_log_id: string;
      job_name: string; // 任务名称
      job_group: string; // 任务组名
      invoke_target: string; // 调用目标字符串
      job_message: string; // 日志信息
      status: Status;
      exception_info: string; // 异常信息
    }& TableTimes

    type LOGINLOGMONITOR = {
      login_log_id: string;
      ip: string;
      ua: string;
      address: string;
      provider: string;
      user_id: string;
    }& TableTimes


    type ONLINEMONITOR = {
      user_name: string;
      ua: string;
      address: string;
      isCurrent?: boolean;
      disable?: boolean;
      user_id: string;
      accountName: string;
    }& TableTimes

    type KICKMONITOR = {
      uid: string;
      user_name: string;
    }

    type EXCHANGE = {
      type: string;
      current: number;
      pageSize: number
    }

    type PROJECTMANAGE = {
      name: string;
      description: string;
      start_date: Date;
      end_date: Date;
      personIds?: [];
    }
  }
}
