// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import { setLocale } from '@@/plugin-locale';
import { RuntimeConfig } from '@umijs/max';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'user' };
}

export const locale: RuntimeConfig['locale'] = {
  textComponent: 'span',
  onError: (err) => {
    setLocale('en-US');
    console.log('error handler...', err);
  },
  // locale: 'zh-CN',
  // formats: CustomFormats
  // messages: Record<string, string> | Record<string, MessageFormatElement[]>
  // defaultLocale: 'en-US',
  // defaultFormats: CustomFormats
  // timeZone?: string
  // textComponent?: React.ComponentType | keyof React.ReactHTML
  // wrapRichTextChunksInFragment?: boolean
  // defaultRichTextElements?: Record<string, FormatXMLElementFn<React.ReactNode>>
  // onError(err: string): void
};

export const layout = () => {
  return {
    // footerRender: () => <Footer />,
    menu: {
      locale: false,
    },
    // footer: false,
    logo: require('@/assets/logo.png'),
  };
};

// export const layout:RunTimeLayoutConfig = (): BasicLayoutProps => {
//     return {
//         rightContentRender: () => <RightContent / >,
//         footerRender: () => <Footer / >,
//         onPageChange: () => {
//             const {currentUser} = initialState;
//             const {location} = history;
//             // 如果没有登录，重定向到 login
//             if (!currentUser && location.pathname !== '/user/login') {
//                 history.push('/user/login');
//             }
//         },
//         menuHeaderRender: undefined,
//         ...initialState?.settings,
//     };
// };
