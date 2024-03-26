import {
     ProFormSelect, ProFormSwitch,
    ProFormText,
    ProFormTextArea,
    StepsForm,
} from '@ant-design/pro-components';
import {useCounter} from 'ahooks';
import {Form, message, Modal} from 'antd';
import {get} from 'lodash-es';

import {renderFormTitle} from '@/components/TableColumns';
import CornItem from '@/pages/monitor/job/corn';
import {createJob, updateJob} from '@/services/monitor/job';
import {isSuccess, useDictCode} from '@/utils';
import {ROUTES} from '@/utils/enums';


export default ({reloadTable,
                    modalVisible,
                    setModalVisibleFalse,
                    stepFormMapRef}) => {
    // 获取表单全部字段
    const { job_name, job_id } =
    get(stepFormMapRef, 'current.[0].current')?.getFieldsValue(['job_name', 'job_id']) || {}

    const formTitle = renderFormTitle(ROUTES.JOBMRMONITOR, job_id, job_name)
    const {JOB_EXECUTE} = useDictCode(['JOB_EXECUTE'])
    const [current,
        { set: setCurrent, reset: resetCurrent },
    ] = useCounter(0, { min: 0, max: 1 })
    function resetFun() {
        setModalVisibleFalse()
        stepFormMapRef?.current?.forEach((formInstanceRef) => {
            formInstanceRef?.current?.resetFields();
        });
        resetCurrent()
    }
    const handlerSubmit = async (values: API.JOBTMONITOR) => {

        await (job_id ? updateJob : createJob)({ ...values, job_id }).then(({ code, msg }) => {
            if (isSuccess(code)) {
                message.success(msg);
                reloadTable()
                resetFun()
            }
        })
    }



    return (
        <StepsForm
            current={current}
            onCurrentChange={(current) => setCurrent(current)}
            formMapRef={stepFormMapRef}
            formProps={{
                validateMessages: {
                    required: '此项为必填项',
                },
            }}
            onFinish={handlerSubmit}
            stepsFormRender={(dom, submitter) => {
                return (
                    <Modal
                        title={formTitle}
                        width={800}
                        onCancel={() => resetFun()}
                        open={modalVisible}
                        footer={submitter}
                        destroyOnClose
                        forceRender
                    >
                        {dom}
                    </Modal>
                );
            }}
        >
            <StepsForm.StepForm
                name="info"
                title="基本信息"
                stepProps={{
                    description: '这里填入的都是基本信息',
                }}
                grid
            >
                <ProFormText
                    name="job_name"
                    label="任务名称"
                    width="md"
                    tooltip="最长为 24 位，用于标定的唯一 id"
                    placeholder="请输入任务名称"
                    rules={[{ required: true },{max: 24,message: '最长为24 位'}]}
                    colProps={{
                        span: 12,
                    }}
                />
                <ProFormText
                    name="job_group"
                    label="任务组名"
                    width="md"
                    tooltip="最长为 24 位，用于标定的唯一 id"
                    placeholder="请输入任务组名"
                    rules={[{ required: true },{max: 24,message: '最长为24 位'}]}
                    colProps={{
                        span: 12,
                    }}
                />
                <ProFormSwitch colProps={{
                    span: 12,
                }} name="status" initialValue={0} label="执行状态" />
                <ProFormSwitch colProps={{
                    span: 12,
                }} name="concurrent" initialValue={0} label="是否并发执行" />
                <ProFormTextArea
                    name="remark"
                    label="备注"
                    tooltip="最长为 200个字符"
                    placeholder="请输入备注"
                    rules={[{ required: true },{max: 20,message: '不超过200个字符'}]}
                />
            </StepsForm.StepForm>
            <StepsForm.StepForm
                name="time"
                title="调度配置"
                stepProps={{
                    description: '这里填入调度配置（时间、周期）',
                }}
                grid
            >
                <ProFormText
                    name="invoke_target"
                    label="调用目标字符串"
                    width="md"
                    tooltip="最长为 64 位，用于标定的唯一 id"
                    placeholder="请输入调用目标字符串"
                    rules={[{ required: true },{max: 64,message: '64 位'}]}
                    colProps={{
                        span: 12,
                    }}
                />
                <ProFormSelect
                    label="任务执行错误策略"
                    showSearch
                    name="misfire_policy"
                    options={JOB_EXECUTE}
                    colProps={{
                        span: 12,
                    }}
                    rules={[{ required: true }]}
                />
                <Form.Item
                    name="cron_expression"
                    label='cron执行表达式'
                    tooltip='执行周期'
                    rules={[{ required: true,message: '请填写cron执行表达式' }]}
                >
                    <CornItem />
                </Form.Item>
            </StepsForm.StepForm>
        </StepsForm>


    );
};
