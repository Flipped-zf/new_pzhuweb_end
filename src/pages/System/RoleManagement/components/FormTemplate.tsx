import { DrawerForm, ModalForm } from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';

import { renderFormTitle } from '@/components/TableColumns';
import { createRole, updateRole } from '@/services/system/role-management';
import { isSuccess } from '@/utils';
import { ROUTES } from '@/utils/enums';
import type { FormTemplateProps } from '@/utils/types/system/role-management';

import FormTemplateItem from './FormTemplateItem'; // 表单组件

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, open, setOpenDrawerFalse }) => {
  // hooks 调用
  const { message } = App.useApp();
  // 上下文表单实例
  const form = Form.useFormInstance();
  // 获取表单全部字段
  const { role_id, role_name } = form.getFieldsValue(true);
  // 渲染标题
  const formTitle = renderFormTitle(ROUTES.MENUMANAGEMENT, role_id, role_name);

  // 关闭抽屉浮层
  const handlerClose = () => {
    // 关闭表单
    setOpenDrawerFalse();
    // 重置表单
    form.resetFields();
  };

  // 提交表单
  const handlerSubmit = async (values: API.ROLEMANAGEMENT): Promise<void> => {
    // 提交数据
    await (role_id ? updateRole : createRole)({
      ...values,
      role_id,
      menu_permission: values.menu_permission.map((item) => item.value),
    }).then(({ code, msg }) => {
      if (isSuccess(code)) {
        message.success(msg);
        // 刷新表格
        reloadTable();
        // 关闭浮层
        handlerClose();
      }
    });
  };
  return (
    <DrawerForm<API.ROLEMANAGEMENT>
      title={formTitle}
      width={500}
      grid
      form={form}
      open={open}
      autoFocusFirstInput
      drawerProps={{
        maskClosable: true,
        onClose: handlerClose,
      }}
      // 提交数据时，禁用取消按钮的超时时间（毫秒）。
      submitTimeout={2000}
      onFinish={handlerSubmit}
    >
      <FormTemplateItem />
    </DrawerForm>
  );
};

export default FormTemplate;
