

export default {
  administrative: {
    // 活动公告
    announcement: {
      add: 'administrative:announcement:add', // 新建
      edit: 'administrative:announcement:edit', // 编辑
      delete: 'administrative:announcement:delete', // 删除
    },
    // 组织管理
    organization: {
      add: 'administrative:organization:add', // 新建
      'add-child': 'administrative:organization:add-child', // 添加子级
      edit: 'administrative:organization:edit', // 编辑
      delete: 'administrative:organization:delete', // 删除
    },
    // 岗位管理
    'jobs-management': {
      add: 'administrative:jobs-management:add', // 新建
      'add-child': 'administrative:jobs-management:add-child', // 添加子级
      edit: 'administrative:jobs-management:edit', // 编辑
      delete: 'administrative:jobs-management:delete', // 删除
    },
  },
  system: {
    // 用户管理
    'user-management': {
      add: 'system:user-management:add', // 新建
      edit: 'system:user-management:edit', // 编辑
      delete: 'system:user-management:delete', // 删除
    },
    // 菜单管理
    'menu-management': {
      add: 'system:menu-management:add', // 新建
      'add-child': 'system:menu-management:add-child', // 添加子级
      edit: 'system:menu-management:edit', // 编辑
      delete: 'system:menu-management:delete', // 删除
    },
    // 角色管理
    'role-management': {
      add: 'system:role-management:add', // 新建
      edit: 'system:role-management:edit', // 编辑
      delete: 'system:role-management:delete', // 删除
    },
    // 国际化
    internationalization: {
      add: 'system:internationalization:add', // 新建
      'add-child': 'system:internationalization:add-child', // 添加子级
      edit: 'system:internationalization:edit', // 编辑
      delete: 'system:internationalization:delete', // 删除
    },
    // 角色管理
    'dict-management': {
      add: 'system:dict-management:add', // 新建
      edit: 'system:dict-management:edit', // 编辑
      delete: 'system:dict-management:delete', // 删除
    },
  },

  'team-manage' : {
    'resource-manage' : {
      add :'team-manage:resource-manage:add',
      edit: 'team-manage:resource-manage:edit', // 编辑
      delete: 'team-manage:resource-manage:delete', // 删除
    },
    'achievement-manage' : {
      add :'team-manage:achievement-manage:add',
      edit: 'team-manage:achievement-manage:edit', // 编辑
      delete: 'team-manage:achievement-manage:delete', // 删除
    },
    'article-manage' : {
      add :'team-manage:article-manage:add',
      edit: 'team-manage:article-manage:edit', // 编辑
      delete: 'team-manage:article-manage:delete', // 删除
      view: 'team-manage:article-manage:view', // 预览
    },
    'audit-manage': {
      view: 'team-manage:article-manage:view',
      edit: 'team-manage:article-manage:edit',
    },
    'project-manage' : {
      add :'team-manage:project-manage:add',
      edit: 'team-manage:project-manage:edit', // 编辑
      delete: 'team-manage:project-manage:delete', // 删除
    },
  },

  monitor: {
    server:{},
    job: {
      view: 'monitor:job:view',
      edit: 'monitor:job:edit',
      delete: 'monitor:job:delete', // 删除
      add :'monitor:job:add',
    },
    'job-log': {
      view: 'monitor:job-log:view',
    },
    online:{
      kick: 'monitor:online:kick',
    },
  },

  'communication-platform':{
    'platform-square': {
      comment: 'platform-square:comment',
    },
  },
}
