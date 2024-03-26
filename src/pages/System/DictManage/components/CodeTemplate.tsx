/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:14:05
 */

import { App, Drawer,Form } from 'antd';
import type { FC } from 'react';
import {useEffect, useState} from 'react';

import {createDict, getCodeList, updateDict} from '@/services/system/dict-manage'
import {formatPerfix, isSuccess} from '@/utils'
import { ROUTES } from '@/utils/enums'
import {useIntl} from '@@/exports'; // 表单组件

import FormTemplateItem from './CodeTemplateItem'

const FormTemplate: FC<any> = ({ open, setOpenDrawerFalse,curData }) => {
  const { formatMessage } = useIntl();

  // hooks 调用
  const { message } = App.useApp();
  // 上下文表单实例
  const form = Form.useFormInstance()
  // 获取表单全部字段
  // 渲染标题
  const formTitle = `${curData?.dict_name} ${formatMessage({ id: formatPerfix(ROUTES.DICTMANAGEMENT, 'code_title')})}`
  // 关闭抽屉浮层
  const handlerClose = () => {
    // 关闭表单
    setOpenDrawerFalse()
    // 重置表单
    form.resetFields();
  }
  const [dict_id,setId] = useState('')

  useEffect(() => {
    setId(curData?.dict_id)
  },[curData?.dict_id])
  // 提交表单
  const handlerSubmit = async (values: API.DICTMANAGEMENT): Promise<void> => {
    // 提交数据
    // await (dict_id ? updateDict : createDict)({ ...values, dict_id }).then(({ code, msg }) => {
    //   if (isSuccess(code)) {
    //     message.success(msg);
    //     // 关闭浮层
    //     handlerClose()
    //   }
    // })
  }
  return (
    <Drawer
      title={formTitle}
      width={900}
      open={open}
      maskClosable
      onClose={handlerClose}
      destroyOnClose
    >
      <FormTemplateItem dict_id={dict_id}/>
    </Drawer>

  );
};

export default FormTemplate
