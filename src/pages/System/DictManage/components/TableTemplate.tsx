import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useIntl } from '@umijs/max';
import { useBoolean, useRequest } from 'ahooks';
import { App, Button, Form, Popconfirm, Space, Switch, Tag } from 'antd';
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu'; // 表格操作下拉菜单
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch,
  describeColumn,
  operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import CodeTemplate from '@/pages/System/DictManage/components/CodeTemplate'; // 表单组件
import { delDict, getDictList, setDictStatus } from '@/services/system/dict-manage'; // 角色管理接口
import { formatPerfix, formatResponse } from '@/utils';
import { IconFont } from '@/utils/const';
import { INTERNATION, ROUTES, STATUS } from '@/utils/enums';
import type { DictStatusParams, SearchParams } from '@/utils/types/system/dict-manage';

import FormTemplate from './FormTemplate';

const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 表单实例
  const [form] = Form.useForm<API.DICTMANAGEMENT>();
  // 获取表格实例
  const tableRef = useRef<ActionType>();
  const [dictLoading, { setTrue: setDictLoadingTrue, setFalse: setDictLoadingFalse }] =
    useBoolean(false);
  const [dictId, setDictId] = useState<string>('');
  // 是否显示抽屉表单
  const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] =
    useBoolean(false);
  // 跟随主题色变化
  const PrimaryColor = useEmotionCss(({ token }) => {
    return { color: token.colorPrimary, fontSize: 16 };
  });

  // code
  const [formCode] = Form.useForm<API.DICTMANAGEMENT>();
  const [openCodeDrawer, { setTrue: setOpenCode, setFalse: setOpenCodeFalse }] = useBoolean(false);
  const [curData, setCurData] = useState({});

  // 手动触发刷新表格
  function reloadTable() {
    tableRef?.current?.reload();
  }

  const { runAsync: fetchDictList } = useRequest(
    async (params) => formatResponse(await getDictList(params)),
    {
      manual: true,
    },
  );

  const handleCurData = ({ dict_id, dict_name }: API.DICTMANAGEMENT) => {
    setCurData({
      dict_id,
      dict_name,
    });
    setOpenCode();
  };
  const codeDraClose = () => {
    setOpenCodeFalse();
    setCurData({});
  };

  // 设置角色状态
  const changeDictStatus = async ({ dict_id, status }: DictStatusParams) => {
    await setDictStatus({
      dict_id,
      status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
    })
      .then((result) => {
        message.success(result.msg);
        reloadTable();
      })
      .finally(() => {
        setDictLoadingFalse();
      });
  };

  // 渲染设置角色状态
  const renderDictStatus = (record: API.DICTMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={dictId === record.dict_id && dictLoading}
      onConfirm={() => changeDictStatus(record)}
      onCancel={() => setDictLoadingFalse()}
      key="popconfirm"
    >
      <Switch
        checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
        unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
        checked={record.status === STATUS.NORMAL}
        loading={dictId === record.dict_id && dictLoading}
        onChange={() => {
          setDictLoadingTrue();
          setDictId(record.dict_id);
        }}
      />
    </Popconfirm>
  );

  const columns: ProColumns<API.DICTMANAGEMENT>[] = [
    {
      title: formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_name') }),
      dataIndex: 'dict_name',
      ellipsis: true,
      width: 160,
      render: (text) => (
        <Space>
          <Tag icon={<IconFont type="icon-dict-management" className={PrimaryColor} />}>{text}</Tag>
        </Space>
      ),
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_code') }),
      dataIndex: 'dict_code',
      width: 140,
      ellipsis: true,
      copyable: true,
      render: (_, record) => (
        <Button type="link" onClick={() => handleCurData(record)}>
          {' '}
          {_}
        </Button>
      ),
    },
    /* 状态 */
    {
      ...statusColumn,
      render: (_, record) => renderDictStatus(record),
    },
    /* 排序 */
    sortColumn,
    /* 创建时间 */
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    /* 描述 */
    describeColumn,
    {
      ...operationColumn,
      render: (_, record) => (
        <DropdownMenu
          pathName={ROUTES.DICTMANAGEMENT}
          editCallback={() => {
            form.setFieldsValue({
              ...record,
            });
            setOpenDrawerTrue();
          }}
          deleteParams={{
            request: delDict,
            id: record.dict_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ];

  return (
    <>
      <ProTable<API.DICTMANAGEMENT, SearchParams>
        actionRef={tableRef}
        columns={columns}
        request={async (params: SearchParams, sort, filter) => {
          console.log(sort, filter);
          return fetchDictList({ ...params, sort });
        }}
        rowKey="dict_id"
        pagination={{
          pageSize: 5,
        }}
        // 工具栏
        toolBarRender={() => [
          // 新增按钮
          <CreateButton
            key="create"
            pathName={ROUTES.DICTMANAGEMENT}
            callback={() => setOpenDrawerTrue()}
          />,
        ]}
        scroll={{ x: columnScrollX(columns) }}
      />
      {/* 抽屉表单 */}
      <Form form={form}>
        <FormTemplate
          reloadTable={reloadTable}
          open={openDrawer}
          setOpenDrawerFalse={setOpenDrawerFalse}
        />
      </Form>
      <Form form={formCode}>
        <CodeTemplate open={openCodeDrawer} setOpenDrawerFalse={codeDraClose} curData={curData} />
      </Form>
    </>
  );
};
export default TableTemplate;
