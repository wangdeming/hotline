import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Szdw from '@/pages/Szdw'
import Xzqy from '@/pages/Xzqy'
import Yqsj from '@/pages/Yqsj'

import szzh from '@/pages/szzh'
import xzzh from '@/pages/xzzh'

import zhfx from '@/pages/zhfx'
import sqlb from '@/pages/sqlb'
import sqcl from '@/pages/sqcl'
import rqhx from '@/pages/Rqhx'

import yqzh from '@/pages/yqzh'
import yqsjlb from '@/pages/yqsjlb'
import yqzhfx from '@/pages/yqzhfx'
import yqfzqs from '@/pages/yqfzqs'
import yqrdly from '@/pages/yqrdly'
import yqrwhx from '@/pages/yqrwhx'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Index',
        query: { type: 'index' }
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/szdw',
      name: 'Szdw',
      component: Szdw,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/xzqy',
      name: 'Xzqy',
      component: Xzqy,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/yqsj',
      name: 'Yqsj',
      component: Yqsj,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/yqsjlb',
      name: 'yqsjlb',
      component: yqsjlb,
      props: (route) => ({
        params: route.params,
        query: route.query
      })
    },
    {
      path: '/szzh/:departId',
      name: 'szzh',
      component: szzh,
      props: (route) => ({
        params: route.params,
        query: route.query
      }),
      children: [
        {
          path: 'szzhfx',
          name: 'szzhfx',
          component: zhfx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'szsqlb',
          name: 'szsqlb',
          component: sqlb,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'szsqcl',
          name: 'szsqcl',
          component: sqcl,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'szrqhx',
          name: 'szrqhx',
          component: rqhx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
      ]
    },
    {
      path: '/xzzh/:departId',
      name: 'xzzh',
      component: xzzh,
      props: (route) => ({
        params: route.params,
        query: route.query
      }),
      children: [
        {
          path: 'xzzhfx',
          name: 'xzzhfx',
          component: zhfx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'xzsqlb',
          name: 'xzsqlb',
          component: sqlb,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'xzsqcl',
          name: 'xzsqcl',
          component: sqcl,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'xzrqhx',
          name: 'xzrqhx',
          component: rqhx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
      ]
    },
    {
      path: '/yqzh/:eventId',
      name: 'yqzh',
      component: yqzh,
      props: (route) => ({
        params: route.params,
        query: route.query
      }),
      children: [
        {
          path: 'yqzhfx',
          name: 'yqzhfx',
          component: yqzhfx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'yqfzqs',
          name: 'yqfzqs',
          component: yqfzqs,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'yqrdly',
          name: 'yqrdly',
          component: yqrdly,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        },
        {
          path: 'yqrwhx',
          name: 'yqrwhx',
          component: yqrwhx,
          props: (route) => ({
            params: route.params,
            query: route.query
          })
        }
      ]
    },
  ]
})
