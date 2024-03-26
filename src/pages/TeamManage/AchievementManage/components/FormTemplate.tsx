import {
    ProFormDependency,
  ProFormDigit,
  ProFormSelect, ProFormSwitch,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import {useCounter} from 'ahooks';
import {Button, Col, Form, message, Modal, Row} from 'antd';
import {get } from 'lodash-es';
import {FC, useState} from 'react';

import QuillEditor from '@/components/QuillEditor';
import {renderFormTitle} from '@/components/TableColumns';
import UploadMyFile from '@/components/UploadFile';
import {createAchievement, updateAchievement} from '@/services/team/achievement';
import { getLocalStorageItem, isSuccess, useDictCode} from '@/utils';
import {ASTATUS, ATYPE, LOCAL_STORAGE, ROUTES} from '@/utils/enums';


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
  const { title, achievement_id } =
  get(stepFormMapRef, 'current.[0].current')?.getFieldsValue(['title', 'achievement_id']) || {}

  const formTitle = renderFormTitle(ROUTES.AHIEVEMENTMANAGEMENT, achievement_id, title)
const [isDraft,setDraft] = useState(false)
  const [current,
    { set: setCurrent, reset: resetCurrent },
  ] = useCounter(0, { min: 0, max: 2 })
    const {ACHIEVEMENT_TYPE} = useDictCode(['ACHIEVEMENT_TYPE'])

    const handlerSubmit = async (values: API.ACHIEVEMENTMANAGEMENT) => {
        values.achievementlink = !values.achievementlink ? null : values.achievementlink
      values.achievement = !values.achievement ? null : values.achievement

            values.article_status = isDraft ? ASTATUS.DRAFT : ASTATUS.CHECK// 待审核

        values.article_type = ATYPE.ACHIEVEMENT

      await (achievement_id ? updateAchievement : createAchievement)({ ...values, achievement_id }).then(({ code, msg }) => {
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

        submitter={{
            // render: (props) => {
            //     if (props.step === 0) {
            //         return [(
            //             <Button type="primary" onClick={() => props.onSubmit?.()}>
            //                 去第二步 {'>'}
            //             </Button>
            //         )]
            //     }
            //     if (props.step === 1) {
            //         return [
            //             <Button key="pre" onClick={() => props.onPre?.()}>
            //                 返回第一步
            //             </Button>,
            //             <Button
            //                 type="primary"
            //                 key="goToTree"
            //                 onClick={() => props.onSubmit?.()}
            //             >
            //                 去第三步 {'>'}
            //             </Button>,
            //         ];
            //     }
            //     return [
            //         <Button key="gotoTwo" onClick={() => props.onPre?.()}>
            //             {'<'} 返回第二步
            //         </Button>,
            //         <Button key="gotoTwo" onClick={() => {
            //             props.onSubmit?.()
            //             setDraft(true)
            //         }}>
            //             草稿
            //         </Button>,
            //         <Button
            //             type="primary"
            //             key="goToTree"
            //             onClick={() => props.onSubmit?.()}
            //         >
            //             提交 √
            //         </Button>,
            //     ];
            // },
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
              forceRender={true}
            >
              {dom}
            </Modal>
          );
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="成果基本信息"
          grid
        >
          <ProFormText
            name="title"
            label="成果名称"
            tooltip="最长为 20个字符"
            placeholder="请输入成果名称"
            rules={[{ required: true },{max: 20,message: '不超过10'}]}

          />
          <ProFormText
            name="describe"
            label="成果描述"
            tooltip="最长为 200个字符"
            placeholder="请输入成果描述"
            rules={[{ required: true },{max: 20,message: '不超过200个字符'}]}
          />
          <Row style={{ width: '100%' }}>
            <Col span={24}>
              {/* 内容 */}
              <Form.Item
                name="content"
                label='成果正文'
                rules={[{ required: true }]}
              >
                <QuillEditor />
              </Form.Item>
            </Col>
          </Row>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="checkbox" title="成果附件/封面" layout='vertical'>
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
                    <ProFormDependency name={['achievement']}>
                        {({ achievement }) => {

                            return (
                                <ProFormText
                                    name="achievementlink"
                                    label="成果链接"
                                    tooltip="填写附件链接之后不用传附件（二选一）"
                                    width='lg'
                                    placeholder="请输入名称"
                                    disabled={!!achievement}
                                    rules={[{type: 'url',message: '格式不对'}]}
                                />
                            )
                        }}

                    </ProFormDependency>

                </Col>
            </Row>
            <ProFormDependency name={['achievementlink']}>
                {({ achievementlink }) => {
                    return (

                        <Form.Item
                            name="achievement"
                            rules={[
                                {
                                    required: !achievementlink,
                                    message: '请上传附件',
                                    validateTrigger: 'onSubmit',
                                },
                            ]}
                        >
                            <UploadMyFile
                                type='dragger'
                                extra="附件大小不超过5MB（与资源链接二选一）"
                                disabled={!!achievementlink}
                                fieldProps={{
                                    name: 'file',
                                    maxCount: 1,
                                }} />
                        </Form.Item>
                    )
                }}
            </ProFormDependency>

        </StepsForm.StepForm>
        <StepsForm.StepForm grid name="time" title="成果配置" layout='horizontal'>
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
            label="成果类型"
            showSearch
            name="type"
            options={ACHIEVEMENT_TYPE}

            rules={[{ required: true }]}
          />

        </StepsForm.StepForm>
      </StepsForm>
    </>
  );
};
export default FormTemplate
