
import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate'

const AuditManage: FC = () => {
    return (<PageContainer header={{ title: null }} >

    <TableTemplate/>

    </PageContainer>
)
}
export default AuditManage
