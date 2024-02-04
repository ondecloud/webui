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
  history: { type: 'hash' },
  hash: true,
  exportStatic: {},
  proxy: dev_proxy[REACT_APP_ENV as keyof typeof dev_proxy],
  base: REACT_APP_ENV === 'dev' ? '/' : '/webui/',
  publicPath: '/webui/',
  routes: [
    {
      path: '/',
      routes: [
        {
          path: '/',
          redirect: '/home',
        },
        {
          name: '首页',
          path: '/home',
          hideInMenu: false,
          // menuRender: false,
          component: '@/pages/Home',
        },
      ],
    },
    {
      name: '下载',
      path: '/download',
      component: '@/pages/Home',
      hideInMenu: false,
      footer: false,
    },
    {
      name: '设置',
      path: '/setting',
      component: '@/pages/Setting',
      hideInMenu: false,
      footer: false,
    },
    {
      name: '权限演示',
      path: '/access',
      component: '@/pages/Access',
      hideInMenu: false,
      // menuRender: true,
      footer: false,
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: '@/pages/Table',
      hideInMenu: false,
      // menuRender: true,
      footer: false,
    },
  ],
  npmClient: 'pnpm',
});
