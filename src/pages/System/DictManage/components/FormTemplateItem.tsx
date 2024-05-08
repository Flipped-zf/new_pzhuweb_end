import { ProFormText } from '@ant-design/pro-components';
import { FC } from 'react';

import { ProFormDescribe, ProFormSort, ProFormStatus } from '@/components/CommonProForm';
import { formatPerfix } from '@/utils';
import { INTERNATION, ROUTES } from '@/utils/enums';
import { useIntl } from '@@/exports';

const FormTemplateItem: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <ProFormText
        name="dict_name"
        colProps={{ span: 24 }}
        label={formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_name') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_name') })
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
                      formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_name') }),
                  ),
                );
              } else if (value.length < 2) {
                return Promise.reject(
                  new Error(
                    formatMessage({
                      id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_name.validator'),
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
        name="dict_code"
        colProps={{ span: 24 }}
        label={formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_code') })}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'dict_code') })
        }
        fieldProps={{
          showCount: true,
          maxLength: 32,
        }}
        rules={[{ required: true }]}
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
