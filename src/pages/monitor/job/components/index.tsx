import {AuditOutlined, ControlOutlined, PlayCircleOutlined} from '@ant-design/icons';
import {ActionType, ProColumns, ProFormInstance, ProTable, StepsForm} from '@ant-design/pro-components';
import {useBoolean, useRequest} from 'ahooks';
import {App, Button, message, Modal, Popconfirm, Space, Switch, Tag} from 'antd';
import {cloneDeep} from 'lodash-es';
import {FC, MutableRefObject, useRef, useState} from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
    columnScrollX,
    CreateButton,
    createTimeColumn,
    createTimeInSearch, operationColumn,
    statusColumn,
} from '@/components/TableColumns';
import {delJob, getJobList, runJob, setJobStatus} from '@/services/monitor/job';
import {delAchievement} from '@/services/team/achievement';
import {formatPerfix, formatResponse, optionsToValueEnum, useDictCode} from '@/utils';
import {ASTATUS, INTERNATION, ROUTES, STATUS} from '@/utils/enums';
import {SearchParams} from '@/utils/types/monitor';
import {dropByCacheKey, formatMessage, FormattedMessage, history} from '@@/exports';

import FormTemplate from './FormTemplate'

const TableTemplate:FC = () => {
    const { message } = App.useApp();

    const stepFormMapRef = useRef<MutableRefObject<ProFormInstance>[]>([]);

    const [jobId, setJobId] = useState<string>('')
    const [jobLoading, { setTrue: setJobLoadingTrue, setFalse: setJobLoadingFalse }] = useBoolean(false);
    const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] = useBoolean(false);
    const tableRef = useRef<ActionType>();
    const {JOB_EXECUTE} = useDictCode(['JOB_EXECUTE'])

    const { runAsync: fetchJobList } = useRequest(
        async (params) => formatResponse(await getJobList(params)), {
            manual: true,
        })

    const { runAsync: fetchRunJob } = useRequest(
        async (params) => formatResponse(await runJob(params)), {
            manual: true,
        })
    function reloadTable() {
        tableRef?.current?.reload()
    }
    const changeJobStatus = async ({ job_id, status }: API.JOBTMONITOR) => {
        await setJobStatus({
            job_id,
            status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
        }).then((result) => {
            message.success(result.msg)
            reloadTable()
        }).finally(() => {
            setJobLoadingFalse()
        })
    }
    const renderRoleStatus = (record: API.JOBTMONITOR) => (
        <Popconfirm
            title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
            open={jobId === record.job_id && jobLoading}
            onConfirm={() => changeJobStatus(record)}
            onCancel={() => setJobLoadingFalse()}
            key="popconfirm"
        ><Switch
            checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
            unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
            checked={record.status === STATUS.NORMAL}
            loading={jobId === record.job_id && jobLoading}
            onChange={() => { setJobLoadingTrue(); setJobId(record.job_id) }}
        />
        </Popconfirm>
    );
    const columns :ProColumns<API.JOBTMONITOR>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            align: 'center',
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'job_name') }),
            dataIndex: 'job_name',
            ellipsis: true,
            width: 100,
            align: 'center',
        },

        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'job_group') }),
            dataIndex: 'job_group',
            ellipsis: true,
            width: 100,
            align: 'center',
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'invoke_target') }),
            dataIndex: 'invoke_target',
            ellipsis: true,
            width: 100,
            align: 'center',
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'cron_expression') }),
            dataIndex: 'cron_expression',
            ellipsis: true,
            hideInSearch:true,
            width: 100,
            align: 'center',
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'misfire_policy') }),
            dataIndex: 'misfire_policy',
            ellipsis: true,
            width: 100,
            align: 'center',
            valueType: 'select',
            valueEnum: optionsToValueEnum(JOB_EXECUTE ?? [],false),
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.JOBMRMONITOR, 'concurrent') }),
            dataIndex: 'concurrent',
            ellipsis: true,
            width: 100,
            align: 'center',
            valueEnum: {
                [STATUS.DISABLE]: { text: <FormattedMessage id={INTERNATION.FLAG_NO} />, status: 'Default' },
                [STATUS.NORMAL]: { text: <FormattedMessage id={INTERNATION.FLAG_YES} />, status: 'Processing' },
            },
        },
        {
            ...statusColumn,
            render: (_, record) => renderRoleStatus(record),
        },
        /* 创建时间 */
        createTimeColumn,
        /* 创建时间-搜索 */
        createTimeInSearch,
        {
        ...{...operationColumn,width: 220},
            render: (_, record) => (
                <Space>
                    <DropdownMenu
                        pathName={ROUTES.JOBMRMONITOR}
                        editCallback={ () => {
                            const result = cloneDeep(record)
                            stepFormMapRef?.current?.forEach((formInstanceRef) => {
                                formInstanceRef?.current?.setFieldsValue(result);
                            });
                            setModalVisibleTrue()
                        }}
                        deleteParams={{
                            request: delJob,
                            id: record.job_id,
                        }}
                        reloadTable={reloadTable}
                    />

                    <Button icon={<PlayCircleOutlined />} title='立即执行' onClick={() => fetchRunJob(record.job_id)}>

                    </Button>

                    <Button icon={ <ControlOutlined />} title='日志' onClick={() => {
                        dropByCacheKey(ROUTES.JOBLOGMRMONITOR)
                        history.push(`${ROUTES.JOBLOGMRMONITOR}?job_name=${record.job_name}`)
                    }}>
                    </Button>
                </Space>
            ),
        },
    ]
    return (<>
        <ProTable<API.JOBTMONITOR, SearchParams>
            actionRef={tableRef}
            columns={columns}
            request={async (params: SearchParams) => fetchJobList(params)}
            rowKey="job_id"
            search={{
                labelWidth: 120,
            }}
            pagination={{ pageSize: 5 }}
            // 工具栏
            toolBarRender={() => [
                // 新增按钮
                <CreateButton
                    key="create"
                    pathName={ROUTES.JOBMRMONITOR}
                    callback={() => setModalVisibleTrue()} />,
            ]}
            scroll={{ x: columnScrollX(columns) }}
        />
        <FormTemplate reloadTable={reloadTable}
                       modalVisible={modalVisible}
                       setModalVisibleFalse={setModalVisibleFalse}
                      stepFormMapRef={stepFormMapRef}></FormTemplate>

    </>)
}
export default TableTemplate
