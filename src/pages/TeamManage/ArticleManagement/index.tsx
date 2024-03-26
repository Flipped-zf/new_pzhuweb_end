
import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate'

const ResourceManage: FC = () => {
  return (<PageContainer header={{ title: null }} >

  <TableTemplate/>

  </PageContainer>
  )
}
export default ResourceManage
