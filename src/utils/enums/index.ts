
export enum REQUEST_CODE {
  NOSUCCESS = -1, // 表示请求成功，但操作未成功
  SUCCESS = 200, // 表示请求成功
  BADREQUEST = 400, // 表示客户端发送的请求有错误
  UNAUTHORIZED = 401, // 表示客户端未提供身份验证凭据或身份验证凭据不正确
  NOTFOUND = 404, // 表示服务器无法找到请求的资源
  INTERNALSERVERERROR = 500, // 表示服务器内部错误
}


export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}


export enum BASEURL {
  API = '/api'
}


export enum LOCAL_STORAGE {
  USER_INFO = 'USER_INFO', // 用户信息
  ACCESS_TOKEN = 'ACCESS_TOKEN', // ACCESS_TOKEN
  LAYOUT = 'LAYOUT', // 布局
  LOCK_SLEEP = 'LOCK_SLEEP', // 睡眠
}

export enum ROUTES {
  LOGIN = '/user/login', // 登录页
  WORKBENCH = '/dashboard/work-bench', // 指示面板-工作台
  DEPENDENCE = '/dashboard/environmental-dependence', // 指示面板-环境依赖
  ANNOUNCEMENT = '/administrative/announcement', // 智能行政-活动公告
  ORGANIZATION = '/administrative/organization', // 智能行政-组织管理
  JOBSMANAGEMENT = '/administrative/jobs-management', // 智能行政-岗位管理
  PERSONALINFOMATION = '/personal-center/personal-information', // 个人中心-个人信息
  PERSONALSETTING = '/personal-center/personal-setting', // 个人中心-个人设置
  USERMANAGEMENT = '/system/user-management', // 系统设置-用户管理
  MENUMANAGEMENT = '/system/menu-management', // 系统设置-菜单管理
  ROLEMANAGEMENT = '/system/role-management', // 系统设置-角色管理
  INTERNATIONALIZATION = '/system/internationalization', // 系统设置-国际化
  OPERATIONLOG = '/system/operation-log', // 系统设置-操作日志
  DICTMANAGEMENT = '/system/dict-management', // 系统设置-字典管理
  RESOURCEMANAGEMENT = '/team-manage/resource-manage', // 团队管理-资源管理
  AHIEVEMENTMANAGEMENT = '/team-manage/achievement-manage', // 团队管理-成果管理
  ARTICLEMANAGEMENT = '/team-manage/article-manage', // 团队管理-成果管理
  ARTICLEMPAGREANAGEMENT = '/team-manage/article-page', // 团队管理-成果管理
  AUDITMANAGEMENT = '/team-manage/audit-manage', // 团队管理-审核管理
  PROJECTMANAGEMENT = '/team-manage/project-manage',// 团队管理-任务管理
  SYSTEMRMONITOR = '/monitor/server', // 服务监控-服务cpu
  JOBMRMONITOR = '/monitor/job', // 服务监控-定时任务
  JOBLOGMRMONITOR = '/monitor/job-log', // 服务监控-定时任务日志
  LOGINLOGMRMONITOR = '/monitor/login-log' ,// 服务监控-登录日志
  ONLINEMRMONITOR = '/monitor/online', // 服务监控-在线用户
  PLATFORM = '/communication-platform/platform-square',// 交流平台-广场
  PLATFORMDETAIL = '/communication-platform/exchange_detail'// 交流平台-广场
}


export enum INTERNATION {
  OPERATION = 'global.table.operation', // 操作
  STATUS = 'global.status', // 状态
  STATUS_DISABLE = 'global.status.disable', // 禁用
  STATUS_NORMAL = 'global.status.normal', // 正常
  SORT = 'global.table.sort', // 排序
  SORT_TIP = 'global.table.sort.tooltip', // 排序 Tip
  CREATED_TIME = 'global.table.created_time', // 创建时间
  DESCRIBE = 'global.table.describe', // 描述
  DELETE_CONTENT = 'global.message.delete.content', // 删除提示内容
  DELETE_TITLE = 'global.message.delete.title', // 删除提示标题
  PARENT_ID = 'global.form.parent_id', // 添加子级
  PARENT_ID_TIP = 'global.form.parent_id.tooltip', // 添加子级 Tip
  PLACEHOLDER = 'global.form.placeholder', // 请输入
  PLACEHOLDER_UPLOAD = 'global.form.placeholder.upload', // 请上传
  PLACEHOLDER_SELETED = 'global.form.placeholder.seleted', // 请选择
  LEADER = 'global.form.leader', // 负责人
  BUTTON_SUBMIT = 'global.button.submit', // 提交
  BUTTON_MODIFY = 'global.button.modify', // 修改
  BUTTON_CONFIRM = 'global.button.confirm', // 确认
  WARM_TIPS = 'global.warm-tips', // 温馨提示
  FLAG_YES = 'global.flag.yes', // 是
  FLAG_NO = 'global.flag.no', // 否
  POPCONFIRM_TITLE = 'global.popconfirm.title', // 确认执行此操作吗？
  BASICLAYOUT = 'components.BasicLayout', // 布局组件
  UPLOADIMAGE = 'components.UploadImage'
}


export enum OPERATION {
  ADD = 'add', // 新增
  EDIT = 'edit', // 编辑
  DELETE = 'delete', // 删除
  ADDCHILD = 'add-child', // 添加子级
}


export enum LOGIN_TYPE {
  MOBILE = 'mobile', // 手机登录
  ACCOUNT = 'account', // 账号登录
}


export enum STATUS {
  DISABLE, // 禁用
  NORMAL, // 正常
}


export enum FLAG {
  NO, // 否
  YES, // 是
}


export enum SEX {
  FEMALE = '0', // 女
  MALE = '1', // 男
  PRIVACY = '2', // 隐私
}


export enum ANNOUNCEMENT_TYPE {
  ANNOUNCEMENT = '1', // 公告
  ACTIVITY = '2', // 活动
  MESSAGE = '3', // 消息
  NOTIFICATION = '4', // 通知
}


export enum ORG_TYPE {
  GROUP = 'group', // 集团
  COMPANY = 'company', // 公司
  UNIT = 'unit', // 单位
  DEPARTMENT = 'department', // 部门
}


export enum MENU_TYPE {
  DIR = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
}


export enum TARGET_TYPE {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top'
}


export enum LAYOUT_TYPE {
  SIDE = 'side', // 侧边菜单
  TOP = 'top', // 顶部菜单
  MIX = 'mix', // 混合菜单
}


export enum MENU_THEME {
  DARK = 'dark', // 暗黑风格
  LIGHT = 'light', // 亮色风格
}


export enum LANGS {
  CN = 'zh-CN', // 中文
  US = 'en-US', // 英文
  JP = 'ja-JP', // 日文
  TW = 'zh-TW', // 繁体中文
}


export enum EVENTBUS_TYPE {
  ANNOUNCEMENT = 'announcement-detail', // 查看公告详情
  UPDATEUNREADYCOUNT = 'update-unready-count', // 更新未读消息数量
}


export enum TABSLAYOUT {
  CLOSE = 'close', // 关闭当前
  REFRESH = 'refresh', // 重新加载
  RIGHT = 'right', // 关闭右侧
  LEFT = 'left', // 关闭左侧
  OTHERS = 'others', // 关闭其它
}
// 审核状态
export enum ASTATUS {
  DRAFT = '0',
  CHECK= '1',
  CHECKED = '2',
  TURN = '3',
}
// 审核类型
export enum ATYPE {
  ARTICLE= '1',
  ACHIEVEMENT= '2',
  RESOURCE= '3'
}
