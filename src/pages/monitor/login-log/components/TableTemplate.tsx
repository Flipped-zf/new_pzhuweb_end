
import {ActionType, FormInstance, ProColumns, ProTable} from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import {App } from 'antd'
import {FC, useRef} from 'react';

import {
  columnScrollX,
  createTimeColumn,
  operationColumn,
} from '@/components/TableColumns'
import {getLoginLogList} from '@/services/monitor/login-log';
import { formatPerfix, formatResponse } from '@/utils'
import { ROUTES } from '@/utils/enums'
import {LoginLogSearchParams} from '@/utils/types/monitor';



const LoginLogList: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>()

  /**
   * @description: 获取活动公告列表
   * @author: 白雾茫茫丶
   */
  const { runAsync: fetchLoginLogList } = useRequest(
    async (params) => formatResponse(await getLoginLogList(params)), {
      manual: true,
    })



  /**
   * @description: 表格配置项
   * @author: 白雾茫茫丶
   */
  const columns: ProColumns<API.LOGINLOGMONITOR>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.LOGINLOGMRMONITOR, 'ip') }),
      dataIndex: 'ip',
      ellipsis: true,
      width: 100,
      align: 'center',
    },

    {
      title: formatMessage({ id: formatPerfix(ROUTES.LOGINLOGMRMONITOR, 'ua') }),
      dataIndex: 'ua',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.LOGINLOGMRMONITOR, 'address') }),
      dataIndex: 'address',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    /* 创建时间 */
    createTimeColumn,

  ]
  return (
    <>
      <ProTable<API.LOGINLOGMONITOR, LoginLogSearchParams>
        actionRef={tableRef}
        formRef={formRef}
        columns={columns}
        rowKey="login_log_id"
        request={async (params: LoginLogSearchParams) => fetchLoginLogList(params)
        }
        pagination={{ pageSize: 8 }}
        scroll={{ x: columnScrollX(columns) }}
      />

    </>
  )
}
export default LoginLogList
