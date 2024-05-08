import { ProFormSelect, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { TreeSelect } from 'antd';
import { get } from 'lodash-es';
import type { FC } from 'react';

import { ProFormDescribe, ProFormSort, ProFormStatus } from '@/components/CommonProForm';
import { getMenuList } from '@/services/system/menu-management';
import { formatPerfix, useDictCode } from '@/utils';
import { INTERNATION, ROUTES } from '@/utils/enums';

const FormTemplateItem: FC = () => {
  const { formatMessage } = useIntl();

  const { data: menuData } = useRequest(
    async (params) => get(await getMenuList(params), 'data', []),
    {
      defaultParams: [{ isPremission: true }],
    },
  );

  const { DATA_CODE } = useDictCode(['DATA_CODE']);
  return (
    <>
      {/* 角色名称 */}
      <ProFormText
        name="role_name"
        colProps={{ span: 24 }}
        label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') })
        }
        fieldProps={{
          showCount: true,
          maxLength: 32,
        }}
        rules={[
          { required: true, message: '' },
          {
            validator: (_, value) => {
              if (!value) {
                return Promise.reject(
                  new Error(
                    formatMessage({ id: INTERNATION.PLACEHOLDER }) +
                      formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name') }),
                  ),
                );
              } else if (value.length < 2) {
                return Promise.reject(
                  new Error(
                    formatMessage({
                      id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_name.validator'),
                    }),
                  ),
                );
              }
              return Promise.resolve();
            },
          },
        ]}
      />
      {/* 角色编码 */}
      <ProFormText
        name="role_code"
        colProps={{ span: 24 }}
        label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'role_code') })
        }
        fieldProps={{
          showCount: true,
          maxLength: 32,
        }}
        rules={[{ required: true }]}
      />
      {/* 菜单权限 */}
      <ProFormTreeSelect
        name="menu_permission"
        label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') })}
        colProps={{ span: 24 }}
        fieldProps={{
          treeData: menuData,
          allowClear: true,
          fieldNames: {
            label: 'zh-CN',
            value: 'menu_id',
          },
          maxTagCount: 10,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_ALL,
          treeCheckStrictly: true,
          placeholder:
            formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
            formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') }),
        }}
        rules={[
          {
            required: true,
            message:
              formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
              formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'menu_permission') }),
          },
        ]}
      />
      <ProFormSelect
        options={DATA_CODE ?? []}
        name="data_scope"
        label={formatMessage({ id: formatPerfix(ROUTES.ROLEMANAGEMENT, 'data_scope') })}
      />
      {/* 排序 */}
      <ProFormSort />
      {/* 状态 */}
      <ProFormStatus />
      {/* 描述 */}
      <ProFormDescribe />
    </>
  );
};
export default FormTemplateItem;
