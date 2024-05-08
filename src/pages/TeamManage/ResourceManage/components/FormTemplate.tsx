import {
    ProFormDependency,
  ProFormDigit,
  ProFormSelect, ProFormSwitch,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import {useCounter} from 'ahooks';
import {Col, Form, message, Modal, Row} from 'antd';
import {get } from 'lodash-es';
import {FC, useState} from 'react';

import QuillEditor from '@/components/QuillEditor';
import {renderFormTitle} from '@/components/TableColumns';
import UploadMyFile from '@/components/UploadFile';
import {createResource,updateResource} from '@/services/team/resource';
import {isSuccess, useDictCode} from '@/utils';
import {ASTATUS, ATYPE, ROUTES} from '@/utils/enums';


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const FormTemplate: FC<any> = ({reloadTable,
                                 modalVisible,
                                 setModalVisibleFalse,
                                 stepFormMapRef}) => {
  // 获取表单全部字段
  const { title, resource_id } =
  get(stepFormMapRef, 'current.[0].current')?.getFieldsValue(['title', 'resource_id']) || {}

  const formTitle = renderFormTitle(ROUTES.RESOURCEMANAGEMENT, resource_id, title)
    const [isDraft,setDraft] = useState(false)

  const [current,
    { set: setCurrent, reset: resetCurrent },
  ] = useCounter(0, { min: 0, max: 2 })
    const {RESOURCE_TYPE} = useDictCode(['RESOURCE_TYPE'])

    const handlerSubmit = async (values: API.RESOURCEMANAGEMENT) => {
      values.link = !values.link ? null : values.link
      values.attachment = !values.attachment ? null : values.attachment

        values.article_status = isDraft ? ASTATUS.DRAFT : ASTATUS.CHECK// 待审核

        values.article_type = ATYPE.RESOURCE

        await (resource_id ? updateResource : createResource)({ ...values, resource_id }).then(({ code, msg }) => {
            if (isSuccess(code)) {
                message.success(msg);
                reloadTable()
                resetFun()
            }
        })
    }

    function resetFun() {
        setModalVisibleFalse()
        stepFormMapRef?.current?.forEach((formInstanceRef) => {
            formInstanceRef?.current?.resetFields();
        });
        resetCurrent()
        setDraft(false)
    }

  return (
    <>
      <StepsForm
        current={current}
        onCurrentChange={(current) => setCurrent(current)}
        formMapRef={stepFormMapRef}
        onFinish={handlerSubmit}
        formProps={{
          validateMessages: {
            required: '此项为必填项',
          },
        }}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title={formTitle}
              width={800}
              open={modalVisible}
              footer={submitter}
              destroyOnClose
              onCancel={() => resetFun()}
              forceRender
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="资源基本信息"
          grid
          onFinish={async () => {
            await waitTime(500);
            return true;
          }}
        >
          <ProFormText
            name="title"
            label="资源名称"
            tooltip="最长为 10个字符"
            placeholder="请输入名称"
            rules={[{ required: true },{max: 10,message: '不超过10'}]}

          />
          <ProFormText
            name="describe"
            label="资源描述"
            tooltip="最长为 20个字符"
            placeholder="请输入名称"
            rules={[{ required: true },{max: 200,message: '不超过200个字符'}]}
          />
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              {/* 内容 */}
              <Form.Item
                name="content"
                label='资源正文'
                rules={[{ required: true }]}
              >
                <QuillEditor />
              </Form.Item>
            </Col>
          </Row>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="资源附件/封面" layout='vertical'>
            <Row justify="center" align='middle' style={{ width: '100%' }}>

                <Col span={8}>
                    <Form.Item
                        name="posterlink"
                        label='封面'
                        rules={[
                            {
                                required: true,
                                message: '请上传封面',
                            },
                        ]}
                    >
                        <UploadMyFile
                            fieldProps={{
                                listType: 'picture-card',
                                maxCount: 1,
                                accept:'image/*',
                            }} />
                    </Form.Item>
                </Col>
                <Col span={16}>
                    <ProFormDependency name={['attachment']}>
                        {({ attachment }) => {

                            return (
                                <ProFormText
                                    name="link"
                                    label="资源链接"
                                    tooltip="填写附件链接之后不用传附件（二选一）"
                                    width='lg'
                                    placeholder="请输入名称"
                                    disabled={!!attachment}
                                    rules={[{type: 'url',message: '格式不对'}]}
                                />
                            )
                        }}

                    </ProFormDependency>

                </Col>
            </Row>
            <ProFormDependency name={['link']}>
                {({ link }) => {
                    return (

                        <Form.Item
                            name="attachment"
                            rules={[
                                {
                                    required: !link,
                                    message: '请上传附件',
                                    validateTrigger: 'onSubmit',
                                },
                            ]}
                        >
                            <UploadMyFile
                                type='dragger'
                                extra="附件大小不超过5MB（与资源链接二选一）"
                                disabled={!!link}
                                fieldProps={{
                                    name: 'file',
                                    maxCount: 1,
                                }} />
                        </Form.Item>
                    )
                }}
            </ProFormDependency>

        </StepsForm.StepForm>
        <StepsForm.StepForm grid name="time" title="资源配置" layout='horizontal'>
          <ProFormSwitch colProps={{
            span: 8,
          }} name="pinned" initialValue={0} label="是否置顶" />
          <ProFormSwitch colProps={{
            span: 8,
          }} name="status" initialValue={1} label="是否展示" />
          <ProFormDigit
            label="排序"
            name="sort"
            width="sm"
            min={1}
            colProps={{
              span: 8,
            }}
            rules={[{ required: true }]}
          />
          <ProFormSelect
            label="资源类型"
            showSearch
            name="type"
            options={RESOURCE_TYPE}

            rules={[{ required: true }]}
          />

        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
export default FormTemplate
