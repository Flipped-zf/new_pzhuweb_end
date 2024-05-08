export default {
  path: '/communication-platform',
  name: 'communication-platform',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/communication-platform',
      redirect: '/communication-platform/platform-index',
      exact: true,
    },
    {
      path: '/communication-platform/platform-square',
      name: 'platform-square',
      exact: true,
      component: './communication-platform/platform-square',
      access: 'adminRouteFilter',
    },
    {
      path: '/communication-platform/exchange_detail',
      name: 'exchange_detail',
      exact: true,
      component: './communication-platform/ArticleDetail',
      access: 'adminRouteFilter',
    },
  ]
}
