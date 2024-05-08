import { ActionType, FormInstance, ProColumns, ProTable } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Access, FormattedMessage, useAccess } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { App, Button, Popconfirm } from 'antd';
import { get } from 'lodash-es';
import { FC, useEffect, useRef, useState } from 'react';

import { columnScrollX, createTimeColumn, operationColumn } from '@/components/TableColumns';
import { getOnlineList, kickuser } from '@/services/monitor/online';
import { formatPathName, formatPerfix, formatResponse } from '@/utils';
import { ROUTES } from '@/utils/enums';
import permissions from '@/utils/permission';
import { OnlineSearchParams } from '@/utils/types/monitor';

const LogList: FC = () => {
  const access = useAccess();

  // 国际化工具
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 是否显示 Modal
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();

  const { runAsync: fetchOnlieList } = useRequest(
    async (params) => formatResponse(await getOnlineList(params)),
    {
      manual: true,
    },
  );

  function reloadTable() {
    tableRef?.current?.reload();
  }

  const columns: ProColumns<API.ONLINEMONITOR>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ONLINEMRMONITOR, 'username') }),
      dataIndex: 'user_name',
      ellipsis: true,
      width: 100,
      align: 'center',
    },

    {
      title: formatMessage({ id: formatPerfix(ROUTES.ONLINEMRMONITOR, 'address') }),
      dataIndex: 'address',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ONLINEMRMONITOR, 'ip') }),
      dataIndex: 'ip',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ONLINEMRMONITOR, 'browser') }),
      dataIndex: 'ua',
      ellipsis: true,
      width: 100,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ONLINEMRMONITOR, 'os') }),
      dataIndex: 'os',
      ellipsis: true,
      hideInSearch: true,
      width: 100,
      align: 'center',
    },
    /* 创建时间 */
    createTimeColumn,
    /* 操作项 */
    {
      ...operationColumn,
      render: (_, record) => (
        <>
          {record.isCurrent || record.disable ? null : (
            <Access
              accessible={access.operationPermission(
                get(permissions, `${formatPathName(ROUTES.ONLINEMRMONITOR)}.kick`, ''),
              )}
              fallback={null}
              key="kick"
            >
              <Popconfirm
                title="下线用户"
                description={`确定下线用户${record.accountName}?`}
                onConfirm={() => {
                  kickuser({
                    uid: record.user_id,
                    user_name: record.accountName,
                  }).then((res) => {
                    if (res && res?.code === 200) {
                      reloadTable();
                      message.success('操作成功');
                    }
                  });
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger>
                  下线
                </Button>
              </Popconfirm>
            </Access>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <ProTable<API.ONLINEMONITOR, OnlineSearchParams>
        actionRef={tableRef}
        formRef={formRef}
        columns={columns}
        rowKey="user_id"
        request={async (params: OnlineSearchParams) => fetchOnlieList(params)}
        pagination={{ pageSize: 8 }}
        scroll={{ x: columnScrollX(columns) }}
      />
    </>
  );
};
export default LogList;
