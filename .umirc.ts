import { defineConfig } from '@umijs/max';
import dev_proxy from './config/dev_proxy';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Across Download',
  },
  locale: {
    useLocalStorage: true,
    default: 'en-US',
    baseNavigator: true,
    baseSeparator: '-',
  },
  hash: true,
  // exportStatic: {
  // },
  proxy: dev_proxy[REACT_APP_ENV as keyof typeof dev_proxy],
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
      footer: false,
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
