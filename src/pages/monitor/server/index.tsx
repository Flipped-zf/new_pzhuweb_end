

import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from '@/pages/monitor/server/components/TableTemplate'

const Monitor: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <TableTemplate />
    </PageContainer>
  )
}
export default Monitor
