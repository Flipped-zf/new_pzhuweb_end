/*
 * @Description: 活动公告-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:28:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 13:49:00
 */
import { EyeOutlined } from '@ant-design/icons';
import {ActionType, FormInstance, ProColumns, ProTable} from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import {App, Button, Descriptions, DescriptionsItem,Modal, Tag, Typography} from 'antd'
import {FC, useEffect, useRef, useState} from 'react';

import {
    columnScrollX,
    createTimeColumn,
    operationColumn,
} from '@/components/TableColumns'
import {getJobLogList} from '@/services/monitor/job-log';
import { formatPerfix, formatResponse } from '@/utils'
import { ROUTES } from '@/utils/enums'
import {LogSearchParams} from '@/utils/types/monitor';
import {useLocation} from '@@/exports';



const LogList: FC = () => {
    // 国际化工具
    const { formatMessage } = useIntl();
    // hooks 调用
    const { message } = App.useApp();
    // 是否显示 Modal
    const [openModal, { setTrue: setOpenModalTrue, setFalse: setOpenModalFalse }] = useBoolean(false)
    // 获取表格实例
    const tableRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>()
    // 手动触发刷新表格
    const [curData,setData] = useState<API.JOBLOGMONITOR>({})
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)

    useEffect(() => {
        if(searchParams.get('job_name')) {
            formRef.current?.setFieldsValue({
                job_name: searchParams.get('job_name'),
            })
            formRef.current?.submit()

        }
    }, []);

    /**
     * @description: 获取活动公告列表
     * @author: 白雾茫茫丶
     */
    const { runAsync: fetchJobLogList } = useRequest(
        async (params) => formatResponse(await getJobLogList(params)), {
            manual: true,
        })



    /**
     * @description: 表格配置项
     * @author: 白雾茫茫丶
     */
    const columns: ProColumns<API.JOBLOGMONITOR>[] = [
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
            title: formatMessage({ id: formatPerfix(ROUTES.JOBLOGMRMONITOR, 'work_status') }),
            dataIndex: 'work_status',
            ellipsis: true,
            width: 100,
            align: 'center',
            render:(_,record) => {
                return <>
                    <Tag color={record?.status === 1 ? '#cd201f' : '#55acee'}>
                        {record?.status === 1 ? '失败' : '成功'}
                    </Tag>

                </>
            },
        },
        /* 创建时间 */
        createTimeColumn,
        /* 操作项 */
        {
            ...operationColumn,
            render: (_, record) => (
               <Button type='link' onClick={() => {
                   setData(record)
                   setOpenModalTrue()
               }}>详情</Button>
            ),
        },
    ]
    return (
        <>
            <ProTable<API.JOBLOGMONITOR, LogSearchParams>
                actionRef={tableRef}
                formRef={formRef}
                columns={columns}
                rowKey="job_log_id"
                request={async (params: LogSearchParams) => fetchJobLogList(params)
                }
                pagination={{ pageSize: 8 }}
                scroll={{ x: columnScrollX(columns) }}
            />
            <Modal width={700} title="日志详情" open={openModal} footer={false} onCancel={setOpenModalFalse}>
                <Descriptions title="">
                    <Descriptions.Item label='日志编号' span={2}>{
                        curData?.job_log_id ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='任务分组' span={2}>{
                        curData?.job_group ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='任务名称' span={2}>{
                        curData?.job_name ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='执行时间' span={2}>{
                        curData?.created_time ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='调用方法' span={3}>{
                        curData?.invoke_target ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='日志信息' span={3}>{
                        curData?.exception_info ?? curData?.job_message ?? '-'
                    }</Descriptions.Item>
                    <Descriptions.Item label='执行状态' span={3}>{
                        curData?.job_message ? '正常' : '异常'
                    }</Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    )
}
export default LogList
