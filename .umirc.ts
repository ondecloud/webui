import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Across Download',
  },
  hash: true,
  // exportStatic: {
  // },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      hideInMenu: true,
      component: '@/pages/Home',
      menuRender: false,
    },
    {
      name: '设置',
      path: '/setting',
      component: '@/pages/Setting',
    },
    {
      name: '权限演示',
      path: '/access',
      component: '@/pages/Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
    },
  ],
  npmClient: 'pnpm',
});
