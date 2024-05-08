import {AuditOutlined, EyeOutlined, FileSearchOutlined, FormOutlined, RollbackOutlined} from '@ant-design/icons'
import {ActionType, ModalForm, ProColumns, ProFormTextArea, ProTable} from '@ant-design/pro-components';
import {useBoolean, useRequest} from 'ahooks';
import {App, Button, Form, Modal, Space} from 'antd';
import {FC, useRef, useState} from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
    columnScrollX,
    CreateButton,
    createTimeColumn,
    createTimeInSearch,
    operationColumn,
} from '@/components/TableColumns';
import UploadMyFile from '@/components/UploadFile';
import DetailPage from '@/pages/TeamManage/AuditManagement/components/Detail';
import ARDetail from '@/pages/TeamManage/components/ARDetail';
import {delArticle} from '@/services/team/article';
import {cancelAC, getAuditList} from '@/services/team/audit';
import {formatPerfix, formatResponse, optionsToValueEnum, useDictCode} from '@/utils';
import { IconFont } from '@/utils/const'
import {ASTATUS, ATYPE, ROUTES} from '@/utils/enums';
import {SearchParams} from '@/utils/types/team/auditManagement';
import { useIntl} from '@@/exports';

import FormTemplate from './FormTemplate';

const TableTemplate :FC = () => {

    const { formatMessage } = useIntl();
    // hooks 调用
    const { message } = App.useApp();
    const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
    const [curData,setCurData] = useState({})
    const [open, setOpen] = useState(false);
  const [openOther, setOpenOther] = useState(false);

    // 表单实例
    const [form] = Form.useForm<API.AUDITMANAGEMENT>();
    const [modalForm] = Form.useForm<API.AUDITMANAGEMENT>();
    const [modalVisit, setModalVisit] = useState(false);

    // 获取表格实例
    const tableRef = useRef<ActionType>();

    const { runAsync: fetchAuditist } = useRequest(
        async (params) => formatResponse(await getAuditList(params)), {
            manual: true,
        },
    )
    const {AUDIT_TYPE,ASTATUS_TYPE} = useDictCode(['AUDIT_TYPE','ASTATUS_TYPE'])

    function reloadTable() {
        tableRef?.current?.reload()
    }

    const openAudit = (record) => {
        setCurData(record)
        setOpenDrawerTrue()
    }

    const showAudit = (record) => {
        setCurData(record)
        setModalVisit(true)
        modalForm.setFieldsValue({
            ...record,
        })
    }

    const showPage = (record) => {
        setCurData(record)
      if(record.article_type === ATYPE.ARTICLE) {
        setOpen(true)
      } else {
        setOpenOther(true)
      }

    }
    const editArticle = (record) => {
        cancelAC(record.as_id,record.title).then((res) => {
            if (res && res.code === 200) {
                message.success('取消发布成功')
                reloadTable()
            }
        })
    }

    const columns: ProColumns<API.AUDITMANAGEMENT>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            align: 'center',
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.AUDITMANAGEMENT, 'col_title') }),
            dataIndex: 'title',
            ellipsis: true,
            copyable:true,
            align: 'center',
            width: 180,
        },
        {
            title: formatMessage({ id: formatPerfix(ROUTES.AUDITMANAGEMENT, 'article_status') }),
            dataIndex: 'article_status',
            ellipsis: true,
            align: 'center',
            width: 80,
            valueType: 'select',
            valueEnum: optionsToValueEnum(ASTATUS_TYPE?.filter((item) => item.value !== '0') ?? [],true),
            // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
            //   return item.value === record?.type
            // })?.label ?? '暂无'}</Text>,
        },

        {
            title: formatMessage({ id: formatPerfix(ROUTES.AUDITMANAGEMENT, 'article_type') }),
            dataIndex: 'article_type',
            ellipsis: true,
            align: 'center',
            width: 80,
            valueType: 'select',
            valueEnum: optionsToValueEnum(AUDIT_TYPE ?? []),
            // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
            //   return item.value === record?.type
            // })?.label ?? '暂无'}</Text>,
        },
        /* 创建时间 */
        createTimeColumn,
        /* 创建时间-搜索 */
        createTimeInSearch,
        {
            ...{
                ...operationColumn,
                width: 150,
            },
            render: (_, record) => {
                if(record.article_status === ASTATUS.CHECK) {
                    return (
                        <Button icon={<AuditOutlined />} title='审核' onClick={() => openAudit(record)}>

                        </Button>
                    )
                }
                return <Space>
                    <Button type='link' icon={<EyeOutlined />} onClick={() => showPage(record)}>预览</Button>
                    <Button type='link' icon={<FileSearchOutlined />} onClick={() => showAudit(record)}>详情</Button>
                    {
                        record.article_status === '2' ? (
                            <Button type='link' icon={<RollbackOutlined />} onClick={() => editArticle(record)}>取消发布</Button>
                        ) : null
                    }

                </Space>
            },
        },
    ]

    return (<>
        <ProTable<API.AUDITMANAGEMENT, SearchParams>
            actionRef={tableRef}
            columns={columns}
            request={async (params: SearchParams,sort, filter) => {

                return fetchAuditist({...params,sort})
            }}
            rowKey="dict_id"
            pagination={{
                pageSize: 5,
            }}
            // 工具栏
            toolBarRender={() => [
                // 新增按钮

            ]}
            scroll={{ x: columnScrollX(columns) }}

        />
        {/* 抽屉表单 */}
        <Form form={form}>
            <FormTemplate
                reloadTable={reloadTable} open={openDrawer} setOpenDrawerFalse={setOpenDrawerFalse}
                curData={curData}
            />
        </Form>
        <ModalForm
            readonly={true}
            title="审核详情"
            form={modalForm}
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: true,
                onCancel: () => setCurData({}),
            }}
            submitter={{
                render:() => (<></>),
            }}
            open={modalVisit}
            onOpenChange={setModalVisit}
        >
            <ProFormTextArea
                name="reason"
                label="审核意见"
                tooltip="最长为 200 位"
                rules={[{required: true},{max: 200, message: '最长200个字符'}]}
            />
            <Form.Item
                name="attachment"
                label="审核附件"
                style={{width: '100%'}}
            >
                <UploadMyFile
                    type='dragger'
                    extra="附件大小不超过5MB"
                    fieldProps={{
                        name: 'file',
                        maxCount: 1,
                    }} />
            </Form.Item>
        </ModalForm>
        <Modal
            open={open}
            title="文章预览"
            onCancel={() => {
                setOpen(false)
                setCurData({})
            }}
            forceRender={true}
            footer={[]}
            width={800}
        >
            <div style={{height: '100%'}}>
              <DetailPage id={curData.article_id}></DetailPage>
            </div>
        </Modal>
      {/* <Modal*/}
      {/*  open={openOther}*/}
      {/*  title={`${curData?.article_type === ATYPE.ACHIEVEMENT ? '成果' : '资源'}预览`}*/}
      {/*  onCancel={() => {*/}
      {/*    setOpenOther(false)*/}
      {/*    setCurData({})*/}
      {/*  }}*/}
      {/*  forceRender={true}*/}
      {/*  footer={[]}*/}
      {/*  width={800}*/}
      {/* >*/}
      {/*  */}
      {/* </Modal>*/}
        <ARDetail isOpen={openOther} closeModale={() => {
            setOpenOther(false)
            setCurData({})
        }} aid={curData?.achievement_id } rid={curData?.resource_id}></ARDetail>
    </>)
}

export default TableTemplate
