import type {
  EditableFormInstance,
  ProColumns,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormField,
  ProFormSegmented,
  ProFormSwitch,
} from '@ant-design/pro-components';
import {data} from '@umijs/utils/compiled/cheerio/lib/api/attributes';
import {Button, message} from 'antd';
import _ from 'lodash'
import React, {FC, useEffect, useRef, useState} from 'react';

import {createCode, delCode, getCodeList} from '@/services/system/dict-manage'
type DataSourceType = {
  code_id: string;
  label?: string;
  value?: string;
  showStatus?: string;
  describe?: string;
  sort?: string;
  status?: string;
};

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const defaultData: DataSourceType[] = [
  // {
  //   code_id: '123123123',
  //   label: '字典编码',
  //   value: 'value',
  //   show_status: 'Default',
  //   describe: '描述',
  //   sort: '1',
  //   status: '0',
  // },
];

const i = 0;

const CodeTemplateItem:FC<any> = ({dict_id}) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>(
    'bottom',
  );
  const formRef = useRef<ProFormInstance<any>>();
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '字典名称',
      dataIndex: 'label',
        width: 160,
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '字典编码',
      key: 'value',
      dataIndex: 'value',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '字典展示状态',
      key: 'show_status',
      dataIndex: 'show_status',
      valueType: 'select',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
      valueEnum: {
        'Default': { text: '默认', status: 'Default' },
        'Error': {
          text: '错误',
          status: 'Error',
        },
        'Success': {
          text: '成功',
          status: 'Success',
        },
        'Warning': {
          text: '警告',
          status: 'Warning',
        },
        'Processing': {
          text: '处理中',
          status: 'Processing',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'describe',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'digit',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }],
        };
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'switch',
      valueEnum: {
        '0': { text: '禁用', status: 'Error' },
        '1': {
          text: '启用',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 100,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.code_id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'table',
            ) as DataSourceType[];

            delCode(record.code_id).then((res) => {
              if(res.code === 200) {
                formRef.current?.setFieldsValue({
                  table: tableDataSource.filter((item) => item.code_id !== record.code_id),
                });
                message.success('删除成功')
              }
            }).catch(() => {
              message.warning('删除失败')
            })
          }}
        >
          删除
        </a>,
      ],
    },
  ];
  const handleSave = ({table}) => {
    const res = table.map((item) => {
      const c = {
        ...item,
        type_id: dict_id,
      }
      delete c.code_id
      return c
    })

    createCode(res,dict_id).then((res) => {
      if(res.code === 200) {
        message.success('保存成功')
      }
    })
  }

  const [showDataSource,setData] = useState([])
  useEffect(() => {
    console.log(dict_id)
    if(dict_id) {
      getCodeList(dict_id).then((res) => {
        if(res.code === 200) {
          console.log(res.data)
          // setData(res?.data)
          formRef.current?.setFieldsValue({
            table: res?.data || [],
          })
        }
      })
    }
  },[dict_id])

    const handelSave = async (key,record,data) => {
      console.log(key,record,data)
        const tableDataSource = formRef.current?.getFieldValue(
            'table',
        ) as DataSourceType[];

        await waitTime(500);
        if(tableDataSource.find((item) => item.code_id !== record.code_id && (item.label === record.label || item.value === record.value))){
            message.warning('字典编码或者字典名称重复！')
            return Promise.reject()
        }
        return Promise.resolve()
    }
  return (
    <ProForm<{
      table: DataSourceType[];
    }>
      formRef={formRef}
      initialValues={{
        table:   [],
      }}

      validateTrigger="onBlur"
      onFinish={handleSave}
      onReset={undefined}
      submitter={{
        resetButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },

      }}
    >
      <EditableProTable<DataSourceType>
        rowKey="code_id"
        editableFormRef={editorFormRef}
        headerTitle="编辑字典"
        maxLength={5}
        name="table"
        controlled
        recordCreatorProps={
          position !== 'hidden'
            ? {
              position: position as 'top',
              record: () => ({ code_id: (Math.random() * 1000000).toFixed(0) }),
            }
            : false
        }
        toolBarRender={() => [
          <ProFormSegmented
            key="render"
            fieldProps={{
              style: {
                marginBlockEnd: 0,
              },
              value: position,
              onChange: (value) => {
                setPosition(value as 'top');
              },
            }}
            noStyle
            request={async () => [
              {
                label: '添加到顶部',
                value: 'top',
              },
              {
                label: '添加到底部',
                value: 'bottom',
              },
              {
                label: '隐藏',
                value: 'hidden',
              },
            ]}
          />,
          // <Button
          //   key="rows"
          //   onClick={() => {
          //     const rows = editorFormRef.current?.getRowsData?.();
          //     console.log(rows);
          //   }}
          // >
          //   获取 table 的数据
          // </Button>,
        ]}
        columns={columns}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, defaultDom) => {
            return [
              defaultDom.save ,
              defaultDom.delete || defaultDom.cancel,
              // <a
              //   key="set"
              //   onClick={() => {
              //     console.log(config.index);
              //     i++;
              //     editorFormRef.current?.setRowData?.(config.index!, {
              //       title: '动态设置的title' + i,
              //     });
              //   }}
              // >
              //   动态设置此项
              // </a>,
            ];
          },
          onSave: async (rowKey, data, row) => {

              await handelSave(rowKey, data,row);
          },
        }}
      />
      <ProForm.Item>
        <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
          <ProFormDependency name={['table']}>
            {({ table }) => {
              return (
                <ProFormField
                  ignoreFormItem
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  mode="read"
                  valueType="jsonCode"
                  text={JSON.stringify(table)}
                />
              );
            }}
          </ProFormDependency>
        </ProCard>
      </ProForm.Item>
    </ProForm>
  );
};
export default CodeTemplateItem
