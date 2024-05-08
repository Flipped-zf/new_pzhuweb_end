import {
  DrawerForm,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { App, Form } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { renderFormTitle } from '@/components/TableColumns';
import UploadMyFile from '@/components/UploadFile';
import { createDict, updateDict } from '@/services/system/dict-manage';
import { createAudit } from '@/services/team/audit';
import { formatPerfix, isSuccess, useDictCode } from '@/utils';
import { ROUTES } from '@/utils/enums';
import { useIntl } from '@@/exports';

const FormTemplate: FC<any> = ({ reloadTable, open, setOpenDrawerFalse, curData }) => {
  // hooks 调用
  const { message } = App.useApp();
  const { formatMessage } = useIntl();
  const { AUDIT_ACTION, OK_MESSAGE, NO_MESSAGE } = useDictCode([
    'AUDIT_ACTION',
    'OK_MESSAGE',
    'NO_MESSAGE',
  ]);

  // 上下文表单实例W
  const form = Form.useFormInstance();
  // 渲染标题
  const formTitle = `${curData?.title} -- ${formatMessage({ id: formatPerfix(ROUTES.AUDITMANAGEMENT, 'title') })}`;

  const [commonMessage, setMessage] = useState(OK_MESSAGE ?? []);
  useEffect(() => {
    setMessage(OK_MESSAGE);
    // form.setFieldsValue({
    //     reason: OK_MESSAGE?.find((item) => item.value === '1')?.describe,
    // })
  }, [OK_MESSAGE]);

  useEffect(() => {
    if (commonMessage) {
      form.setFieldsValue({
        reason: commonMessage?.find((item) => item.value === '1')?.describe,
      });
    }
  }, [commonMessage]);

  // 关闭抽屉浮层
  const handlerClose = () => {
    // 关闭表单
    setOpenDrawerFalse();
    // 重置表单
    form.resetFields();
  };

  // 提交表单
  const handlerSubmit = async (values: API.AUDITMANAGEMENT): Promise<void> => {
    // 提交数据
    values.title = curData?.title;
    values.as_id = curData?.as_id;
    await createAudit({ ...values }).then(({ code, msg }) => {
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
    <DrawerForm<API.DICTMANAGEMENT>
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
      <ProFormSelect
        label="审核"
        showSearch
        name="action"
        options={AUDIT_ACTION}
        initialValue="1"
        rules={[{ required: true }]}
        onChange={(event) => {
          if (event === '1') {
            setMessage(OK_MESSAGE);
          } else {
            setMessage(NO_MESSAGE);
          }
        }}
        colProps={{
          span: 12,
        }}
      />
      <ProFormSelect
        label="常用语"
        showSearch
        name="commonMessage"
        options={commonMessage}
        onChange={(event) => {
          form.setFieldsValue({
            reason: commonMessage?.find((item) => item.value === event)?.describe,
          });
        }}
        initialValue="1"
        rules={[{ required: true }]}
        colProps={{
          span: 12,
        }}
      />
      <ProFormTextArea
        name="reason"
        label="审核意见"
        tooltip="最长为 200 位"
        rules={[{ required: true }, { max: 200, message: '最长200个字符' }]}
      />
      <Form.Item name="attachment" label="审核附件" style={{ width: '100%' }}>
        <UploadMyFile
          type="dragger"
          extra="附件大小不超过5MB"
          fieldProps={{
            name: 'file',
            maxCount: 1,
          }}
        />
      </Form.Item>
    </DrawerForm>
  );
};

export default FormTemplate;
