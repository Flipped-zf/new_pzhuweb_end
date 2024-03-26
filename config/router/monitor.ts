export default {
  path: '/monitor',
  name: 'monitor',
  access: 'adminRouteFilter',
  exact: true,
  routes:[
    {
      path: '/monitor',
      redirect: '/monitor/server',
      exact: true,
    },
    {
      path: '/monitor/server',
      name: 'server',
      access: 'adminRouteFilter',
      component: './monitor/server',
      exact: true,
    },
    {
      path: '/monitor/job',
      name: 'job',
      access: 'adminRouteFilter',
      component: './monitor/job',
      exact: true,
    },
    {
      path: '/monitor/job-log',
      name: 'job-log',
      access: 'adminRouteFilter',
      component: './monitor/job/Log',
      exact: true,
    },
    {
      path: '/monitor/login-log',
      name: 'login-log',
      access: 'adminRouteFilter',
      component: './monitor/login-log',
      exact: true,
    },
    {
      path: '/monitor/online',
      name: 'online',
      access: 'adminRouteFilter',
      component: './monitor/online',
      exact: true,
    }
  ]
}
