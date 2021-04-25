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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/userNeedKnow',
    name: 'userNeedKnow',
    hidden: true,
    component: () => import('@/views/about/userNeedKnow')
  },
  {
    path: '/liveing',
    name: 'liveing',
    component: () => import('@/views/livePage/livePage')
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/changePwd',
    component: () => import('@/views/login/changePwd')
  },
  {
    path: '/setPwd',
    component: () => import('@/views/login/setPwd')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      component: () => import('@/views/home/home'),
      meta: { title: '首页' }
    }]
  },
  {
    path: '/realRank',
    component: Layout,
    redirect: '/realRank',
    children: [
      {
        path: '',
        component: () => import('@/views/realRank/realRank'),
        meta: { title: '实时直播榜' }
      }
    ]
  },
  {
    path: '/hourRank',
    component: Layout,
    redirect: '/hourRank',
    children: [
      {
        path: '',
        component: () => import('@/views/hourRank/hourRank'),
        meta: { title: '小时直播榜' }
      }
    ]
  },
  {
    path: '/dailyRank',
    component: Layout,
    redirect: '/dailyRank',
    children: [
      {
        path: '',
        component: () => import('@/views/dailyRank/dailyRank'),
        meta: { title: '每日直播排行榜' }
      }
    ]
  },
  {
    path: '/liveHistory',
    component: Layout,
    redirect: '/liveHistory',
    children: [
      {
        path: '',
        component: () => import('@/views/liveHistory/liveHistory'),
        meta: { title: '历史直播数据库' }
      }
    ]
  },
  {
    path: '/anchorRank',
    component: Layout,
    redirect: '/anchorRank',
    children: [
      {
        path: '',
        component: () => import('@/views/anchorRank/anchorRank'),
        meta: { title: '主播榜' }
      }
    ]
  },
  {
    path: '/goodsAnchor',
    component: Layout,
    redirect: '/goodsAnchor',
    children: [
      {
        path: '',
        component: () => import('@/views/goodsAnchor/goodsAnchor'),
        meta: { title: '带货主播榜' }
      }
    ]
  },
  {
    path: '/anchorData',
    component: Layout,
    redirect: '/anchorData',
    children: [
      {
        path: '',
        component: () => import('@/views/anchorData/anchorData'),
        meta: { title: '主播数据库' }
      }
    ]
  },
  {
    path: '/goodsRank',
    component: Layout,
    redirect: '/goodsRank',
    children: [
      {
        path: '',
        component: () => import('@/views/goodsRank/goodsRank'),
        meta: { title: '热门商品榜' }
      }
    ]
  },
  {
    path: '/smallShopRank',
    component: Layout,
    redirect: '/smallShopRank',
    children: [
      {
        path: '',
        component: () => import('@/views/smallShopRank/smallShopRank'),
        meta: { title: '抖音小店榜' }
      }
    ]
  },
  {
    path: '/enjoyAnthor',
    component: Layout,
    hidden: true,
    redirect: '/enjoyAnthor',
    children: [
      {
        path: '',
        component: () => import('@/views/enjoy/enjoyUser'),
        meta: { title: '我关注的主播' }
      }
    ]
  },
  {
    path: '/enjoyLive',
    component: Layout,
    hidden: true,
    redirect: '/enjoyLive',
    children: [
      {
        path: '',
        component: () => import('@/views/enjoy/enjoyLive'),
        meta: { title: '我收藏的直播间' }
      }
    ]
  },
  {
    path: '/enjoyProd',
    component: Layout,
    hidden: true,
    redirect: '/enjoyProd',
    children: [
      {
        path: '',
        component: () => import('@/views/enjoy/enjoyProd'),
        meta: { title: '我关注的商品' }
      }
    ]
  },
  {
    path: '/enjoyShop',
    component: Layout,
    hidden: true,
    redirect: '/enjoyShop',
    children: [
      {
        path: '',
        component: () => import('@/views/enjoy/enjoyShop'),
        meta: { title: '我关注的小店' }
      }
    ]
  },
  {
    path: '/tiktok',
    component: Layout,
    redirect: '/tiktok',
    children: [
      {
        path: '',
        component: () => import('@/views/myTiktok/Tiktok')
      }
    ]
  },
  {
    path: '/myLive',
    component: Layout,
    redirect: '/myLive',
    children: [
      {
        path: '',
        component: () => import('@/views/liveMonitor/myLive')
      }
    ]
  },
  {
    path: '/monitorHistory',
    component: Layout,
    redirect: '/monitorHistory',
    children: [
      {
        path: '',
        component: () => import('@/views/liveMonitor/monitorHistory')
      }
    ]
  },
  {
    path: '/anchorDetail',
    component: Layout,
    redirect: '/anchorDetail',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/anchorRank/anchorDetail')
      }
    ]
  },
  {
    path: '/smallShopDetail',
    component: Layout,
    redirect: '/smallShopDetail',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/smallShopRank/smallShopDetail')
      }
    ]
  },
  {
    path: '/goodsDetail',
    component: Layout,
    redirect: '/goodsDetail',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/goodsRank/goodsDetail')
      }
    ]
  },
  {
    path: '/big',
    component: () => import('@/views/big/big')
  },
  {
    path: '/liveDetail',
    component: Layout,
    redirect: '/liveDetail',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/liveDetail/liveDetail')
      }
    ]
  },
  {
    path: '/pro',
    component: Layout,
    redirect: '/pro',
    children: [
      {
        path: '',
        component: () => import('@/views/pro/pro')
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    hidden: true,
    redirect: '/about',
    children: [{
      path: '',
      component: () => import('@/views/about/about'),
      meta: {
        title: '关于我们'
      }
    }]
  },
  {
    path: '/userInfo',
    component: Layout,
    hidden: true,
    redirect: '/userInfo',
    children: [{
      path: '',
      component: () => import('@/views/userInfo/userInfo'),
      meta: {
        title: '个人信息'
      }
    }]
  },
  {
    path: '/upgrade',
    component: Layout,
    redirect: '/upgrade',
    children: [
      {
        path: '',
        component: () => import('@/views/upgrade/upgrade'),
        meta: { title: '升级记录', roles: ['ADMIN'] }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/home', hidden: true }
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
