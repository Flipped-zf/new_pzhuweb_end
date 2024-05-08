import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Card, Space, Timeline, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';

import { formatPerfix, isSuccess } from '@/utils';
import { ROUTES } from '@/utils/enums';

const { Text } = Typography;

const GitCommitLog: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // dayjs 相对时间
  dayjs.extend(relativeTime);

  const { data: commitList, loading: commitLoading } = useRequest(async () => {
    const response = await fetch(
      'https://api.github.com/repos/Flipped-zf/new_pzhuweb_end/commits?page=1&per_page=5',
    );
    if (isSuccess(response.status)) {
      const result = await response.json();
      return result;
    }
    return [];
  });
  return (
    <Card
      title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'git-log') })}
      loading={commitLoading}
    >
      <Timeline
        items={commitList?.map((item) => {
          return {
            children: (
              <Space direction="vertical" size={0} style={{ display: 'flex' }}>
                <a onClick={() => window.open(item.html_url)}>{item.commit.message}</a>
                <Text type="secondary">{dayjs(item.commit.author.date).fromNow()}</Text>
              </Space>
            ),
          };
        })}
      />
    </Card>
  );
};
export default GitCommitLog;
