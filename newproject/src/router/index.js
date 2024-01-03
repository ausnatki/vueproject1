import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

// /* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

// import bak from './bak'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 静态路由
export const constantRoutes = [

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      component: () => import('@/views/guide/index'),
      name: 'Guide',
      meta: {
        title: 'guide',
        icon: 'guide',
        noCache: true
      }
    }]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/profile/index'),
      name: 'Profile',
      meta: {
        title: 'profile',
        icon: 'user',
        noCache: true
      }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 动态路由规则
export const asyncRoutes = [

  {
    path: '/usermanager',
    component: Layout,
    redirect: '/usermanager/list',
    alwaysShow: true,
    name: 'UserManage',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin', 'editor']
    },
    children: [{
      path: 'list',
      component: () => import('@/views/usermanager/userlist'),
      name: 'UserList',
      meta: {
        title: '用户列表',
        icon: 'list',
        noCache: true,
        roles: ['admin', 'editor']
      }
    },
    {
      path: 'add',
      component: () => import('@/views/usermanager/userform'),
      name: 'Userform',
      meta: {
        title: '用户添加',
        icon: 'form',
        noCache: true,
        roles: ['admin']
      }
    }
    ]
  },
  {
    path: '/compete',
    component: Layout,
    redirect: '/compete/list',
    alwaysShow: true,
    name: 'CompeteManager',
    meta: {
      title: '比赛管理',
      icon: 'message'
    },
    children: [{
      path: 'list',
      component: () => import('@/views/compete/competeList'),
      name: 'CompeteList',
      meta: {
        title: '比赛列表',
        icon: 'list',
        noCache: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/compete/competeAdd'),
      name: 'CompeteAdd',
      meta: {
        title: '比赛添加',
        icon: 'el-icon-s-open',
        noCache: true,
        roles: ['admin']
      }
    },
    {
      path: 'tablelist',
      component: () => import('@/views/compete/compete-table-list'),
      name: 'CompeteTableList',
      props: true,
      meta: {
        title: '比赛表格',
        icon: 'el-icon-s-claim',
        noCache: true,
        roles: ['admin']
      }
    },
    {
      path: 'examine',
      component: () => import('@/views/compete/compete-Examine'),
      name: 'CompeteExamine',
      hidden: true,
      props: true,
      meta: {
        title: '审核列表',
        icon: 'list',
        noCache: true
      }
    },
    {
      path: 'enroll',
      component: () => import('@/views/compete/compete-Enroll'),
      name: 'CompeteEnroll',
      hidden: true,
      props: true,
      meta: {
        title: '选手报名',
        icon: 'list',
        noCache: true
      }
    },
    {
      path: 'oneContent',
      component: () => import('@/views/compete/compete-one-content'),
      name: 'CompeteOneContent',
      hidden: true,
      props: true,
      meta: {
        title: '比赛详情',
        icon: 'el-icon-s-claim',
        noCache: true
      }
    },
    {
      path: 'voting',
      component: () => import('@/views/compete/voting'),
      name: 'Voting',
      hidden: true,
      props: true,
      meta: {
        title: '投票界面',
        icon: 'el-icon-s-claim',
        noCache: true
      }
    }
    ]
  },
  // 重定向规则
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

  // 自带模块

  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // ...bak,
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
