import { useIntl } from '@umijs/max';
import { App, Avatar, Button } from 'antd';
import { isEmpty } from 'lodash-es';
import { FC, useEffect } from 'react';

import { BusinessEvents } from '@/models/constants/socket';
import { formatPerfix } from '@/utils';
import { AnnouncementTypeEnum } from '@/utils/const';
import { BASEURL, EVENTBUS_TYPE, ROUTES } from '@/utils/enums';
import eventBus from '@/utils/eventBus';
function debounce(func, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
const EventSourceNotice: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { notification } = App.useApp();

  function showMsg(data: any) {
    // 解析数据
    const record = typeof data === 'string' ? JSON.parse(data) : data;
    // 如果返回的是空对象，则代表的时删除，否则是新增
    if (!isEmpty(record)) {
      const { title, avatar_url, cn_name, type }: API.ANNOUNCEMENT = record;
      // 格式化类型
      const typeName = formatMessage({
        id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${AnnouncementTypeEnum[type]}`),
      });
      // 弹窗提醒
      notification.open({
        message: `${cn_name}发布了一条新${typeName}`,
        description: title,
        icon: <Avatar src={avatar_url} />,
        btn: (
          <Button type="primary" onClick={() => eventBus.emit(EVENTBUS_TYPE.ANNOUNCEMENT, record)}>
            查看
          </Button>
        ),
      });
    }
    // 刷新未读消息
    eventBus.emit(EVENTBUS_TYPE.UPDATEUNREADYCOUNT);
  }

  eventBus.on(BusinessEvents.COMMNT_MSG, (data) => {
    const fun = debounce(() => {
      showMsg(data);
    }, 300);
    fun();
    console.log('zf', 123);
  });

  useEffect(() => {
    // 创建 EventSource 实例
    const eventSource = new EventSource(`${BASEURL.API}${ROUTES.ANNOUNCEMENT}/sse`);
    // 监听事件
    eventSource.addEventListener('message', ({ data }) => {
      showMsg(data);
    });
    return () => {
      // 关闭
      eventSource.close();
    };
  }, []);
  return null;
};
export default EventSourceNotice;
