import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


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
    path: '/food_add',
    component: () => import('@/views/food/food_add'),
    name: 'food_add',
    meta: { title: 'food_add' },
    hidden: true
  },
  {
    path: '/food_addlist',
    component: () => import('@/views/food/food_addlist'),
    name: 'food_addlist',
    meta: { title: 'food_addlist' },
    hidden: true
  },
  {
    path: '/firewall',
    component: Layout,
    redirect: '/firewall/fortigate',
    name: 'firewall',
    meta: {
      title: '防火墙命令工具',
      icon: 'nested'
    },
    children: [
      {
        path: '飞塔防火墙',
        component: () => import('@/views/form/firewall_index'), // Parent router-view
        name: 'fortigate',
        meta: { title: '飞塔防火墙' },
        children: [
          {
            path: 'fortigate_policy',
            component: () => import('@/views/form/forti_policy'),
            name: 'fortigate_policy',
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
        path: 'juniper防火墙',
        component: () => import('@/views/form/firewall_index'),
        name: 'juniper',
        meta: { title: 'juniper防火墙' },
        children: [
          {
            path: 'juniper_policy',
            component: () => import('@/views/form/juniper_policy'),
            name: 'juniper_policy_new',
            meta: { title: 'juniper防火墙策略生成' }
          },
          {
            path: 'juniper_address',
            component: () => import('@/views/form/juniper_address'),
            name: 'juniper_address_new',
            meta: { title: 'juniper防火墙地址生成' }
          },
        ]
      },
    ]
  },
  {
    path: '/text',
    component: Layout,
    redirect: '/text/duplicates',
    name: 'text',
    meta: {
      title: '文本工具',
      icon: 'nested'
    },
    children: [
      {
        path: '文本去重',
        component: () => import('@/views/text/duplicates'),
        name: 'duplicates',
        meta: { title: '文本去重' },
      },
      {
        path: '文本遍历',
        component: () => import('@/views/text/traversal'),
        name: 'traversal',
        meta: { title: '文本遍历' },
      },
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
        path: 'https://food.madless.club',
        meta: { title: '一个有趣的网站', icon: 'link' }
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