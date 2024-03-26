export default {
  path: '/team-manage',
  name: 'team-manage',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/team-manage',
      redirect: '/teamManage/resourceManage',
      exact: true,
    },
    {
      path: '/team-manage/resource-manage',
      name: 'resource-manage',
      component: './TeamManage/ResourceManage',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/team-manage/achievement-manage',
      name: 'achievement-manage',
      component: './TeamManage/AchievementManage',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/team-manage/article-manage',
      name: 'article-manage',
      component: './TeamManage/ArticleManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/team-manage/article-page',
      name: 'article-page',
      component: './TeamManage/ArticleManagement/Page',
      isKeepalive: false,
      exact: true,
    },
    {
      path: '/team-manage/audit-manage',
      name: 'audit-manage',
      component: './TeamManage/AuditManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],

}
