import { LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { HeaderProps } from '@ant-design/pro-components';
import { history, useIntl, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Dropdown, MenuProps } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { BusinessEvents } from '@/models/constants/socket';
import { Logout } from '@/services/logic/login';
import { isSuccess, logoutToLogin, removeLocalStorageItem } from '@/utils';
import { IconFont } from '@/utils/const';
import { INTERNATION, LOCAL_STORAGE, ROUTES } from '@/utils/enums';
import eventBus from '@/utils/eventBus';
import type { InitialStateTypes } from '@/utils/types';

export default function AvatarProps(openLockScreen: () => void): HeaderProps['avatarProps'] {
  // 国际化方法
  const { formatMessage } = useIntl();
  // hooks 调用
  const { modal } = App.useApp();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  const { remove_token } = useModel('socketAdmin');

  function outFun() {
    setInitialState((s: InitialStateTypes) => ({
      ...s,
      CurrentUser: undefined,
      Access_token: undefined,
    }));
    removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN);
    // 退出登录返回登录页
    logoutToLogin();
  }

  const { run: loginOut } = useRequest(Logout, {
    manual: true,
    onSuccess: async ({ code }) => {
      if (isSuccess(code)) {
        outFun();
      }
    },
  });
  eventBus.on(BusinessEvents.USER_KICK, outFun);

  const logOutClick = () => {
    modal.confirm({
      title: formatMessage({ id: INTERNATION.WARM_TIPS }),
      content: formatMessage({ id: 'pages.logout.tip' }),
      onOk: async () => {
        loginOut();
      },
    });
  };
  // 点击下拉菜单回调
  const onMenuClick = (event: MenuInfo) => {
    switch (event.key) {
      // 跳转至个人中心
      case 'personalCenter':
        history.push(ROUTES.PERSONALINFOMATION);
        break;
      // 锁定屏幕
      case 'lockScreen':
        openLockScreen();
        break;
      // 退出登录
      case 'logout':
        logOutClick();
        break;
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'personalCenter',
      icon: <IconFont style={{ fontSize: 16 }} type="icon-personal-center" />,
      label: formatMessage({ id: 'pages.personal-center' }),
    },
    {
      key: 'lockScreen',
      icon: <LockOutlined style={{ fontSize: 16 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen` }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <PoweroffOutlined style={{ fontSize: 14 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.Logout` }),
    },
  ];
  return {
    src: initialState?.CurrentUser?.avatar_url,
    size: 'small',
    title: initialState?.CurrentUser?.cn_name,
    render: (_, dom) => {
      return <Dropdown menu={{ onClick: onMenuClick, items: menuItems }}>{dom}</Dropdown>;
    },
  };
}
