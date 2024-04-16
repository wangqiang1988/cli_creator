import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
   {
    path: '/firewall',
    component: Layout,
    redirect: '/firewall/fortigate_policy',
    name: 'firewall',
    meta: {
      title: '防火墙',
      icon: 'nested'
    },
    children: [
      {
        path: 'fortigate_policy',
        component: () => import('@/views/form/forti_policy'),
        name: 'fortigate_policy_new',
        meta: { title: '飞塔防火墙策略生成' }
      },
      {
        path: 'fortigate_policy_modify',
        component: () => import('@/views/form/forti_policy_modify'),
        name: 'fortigate_policy_modify',
        meta: { title: '飞塔防火墙策略修改' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    name: 'other',
    meta: {
      title: '其他',
      icon: 'nested'
    },
    children: [
      {
        path: 'https://github.com/wangqiang1988/cli_creator_backend',
        meta: { title: '后端源码', icon: 'link' }
      },
      {
        path: 'https://pdf.madless.club/',
        meta: { title: 'pdf转换工具', icon: 'link' }
      },
      
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
