import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate';

const Announcement: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      {/* 表格列表 */}

      <TableTemplate />
    </PageContainer>
  );
};
export default Announcement;
