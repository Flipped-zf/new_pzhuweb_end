import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';

import TableTemplate from './components/LogList';

const Announcement: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      {/* 表格列表 */}
      <TableTemplate />
    </PageContainer>
  );
};
export default Announcement;
