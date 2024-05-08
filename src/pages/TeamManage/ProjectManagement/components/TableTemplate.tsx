import {AppstoreOutlined, BarsOutlined, ClockCircleOutlined, FilterOutlined} from '@ant-design/icons';
import {
  LightFilter, ModalForm, ProCard,
  ProFormCascader,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimeRangePicker, ProFormDependency, ProFormInstance,
  ProFormRadio, ProFormSegmented,
  ProFormSelect, ProFormSlider, ProFormSwitch, ProFormText, ProFormTextArea,
  ProFormTreeSelect, QueryFilter,
  StatisticCard,
} from '@ant-design/pro-components';
import {usePagination, useRequest} from 'ahooks';
import {
    Button, Col,
    Empty,
    Flex,
    Form,
    message,
    Pagination,
    Progress,
    Row,
    Segmented,
    Spin, theme,
    Timeline,
    TreeSelect,
} from 'antd';
import {get} from 'lodash-es';
import React, {FC, useEffect, useRef, useState} from 'react';

import AvatarMy from '@/components/Avatar';
import UploadMyFile from '@/components/UploadFile';
import PCard from '@/pages/TeamManage/ProjectManagement/pCard';
import {
    createProject, doingListApi,
    doingPro,
    doingProApi,
    getProjectList,
    getpulist,
    getUserlist,
    updateProject,
} from '@/services/team/project';
import {formatPathName, formatResponse, useDictCode} from '@/utils';
import { ROUTES} from '@/utils/enums';
import permissions from '@/utils/permission';
import {Access, useAccess} from '@@/exports';

import styles from './index.less'


const { Statistic, Divider } = StatisticCard;

const TableTemplate:FC = () => {
  const [curLayout,setLayout] = useState(false)
  const access = useAccess();
    const { token } = theme.useToken();

    const formatPerfix = formatPathName(ROUTES.PROJECTMANAGEMENT)
  const [modalVisit, setModalVisit] = useState(false);
  const formRef = useRef<ProFormInstance>();
  const [curData,setCurData] = useState(null)
  const {PROJECT_STATUS,DOINGPRO} = useDictCode(['PROJECT_STATUS','DOINGPRO'])
  const [doingPro, setDoingPro] = useState(false);
  const doingRef = useRef<ProFormInstance>();
  const [curDolist,setDoList] = useState(null)
    const [curDolistShow,setDoListShow] = useState(null)

    const { runAsync: fetchCP } = useRequest(
    async (params) => formatResponse(await createProject(params)), {
      manual: true,
    },
  )
  const { runAsync: fetchGetpulist } = useRequest(
    async (params) => formatResponse(await getpulist(params)), {
      manual: true,
    },
  )

    const { data, loading,run, pagination } = usePagination(({ current, pageSize },data) => {
        return getProjectList({
            current,
            pageSize,
            ...data,
        })
    });

  function refrash() {
      run(
          {
              current: 1,
              pageSize: pagination.pageSize,
          },
          {},
      )
  }

  function editData(data) {
    const res = {
      ...data,
      personIds: data?.users?.map((item) => item.user_id),
      dateRange: [data?.start_date,data?.end_date],
    }
    setCurData(data)
    setModalVisit(true)
    formRef.current?.setFieldsValue({
      ...res,
    })
  }

  function doingProject(data) {
    if(data?.status === '4') {
      message.warning('任务未开始')
      return
    }
    setDoingPro(true)
    setCurData(data)
  }
  function showDoList(data) {
    setDoList(data)
  }

    useEffect(() => {
        if(curDolist?.project_id) {
            doingListApi(curDolist.project_id).then((res) => {
                if(res?.code === 200) {
                    console.log(res)
                    setDoListShow(res.data)
                }
            })
        }
    }, [curDolist?.project_id]);

  return (
        <>
            <div className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.query}>
                        <ProCard title='筛选条件'>
                          <QueryFilter defaultCollapsed split onFinish={(res) => {

                            run({
                                ...pagination,
                            },res)

                            return Promise.resolve()
                          }} onReset={refrash}>
                            <ProFormText name="name" label="任务名称" />
                            <ProFormSelect
                              name="status"
                              label="任务状态"
                              placeholder="请选择任务状态"
                              options={PROJECT_STATUS}
                            />
                            <ProFormSlider
                              name="process"
                              label="任务进度区间"
                              initialValue={[0,100]}
                              range
                            />
                          </QueryFilter>
                        </ProCard>
                    </div>
                    <div className={styles.content}>
                        <ProCard >
                            <StatisticCard.Group direction='row'>
                                <StatisticCard
                                    statistic={{
                                        title: '总任务数',
                                        value: 120,
                                    }}
                                />
                                <Divider type='vertical' />
                                <StatisticCard
                                    statistic={{
                                        title: '完成数',
                                        value: 80,
                                        description: <Statistic title="占比" value="10.5%" />,
                                    }}
                                    chart={
                                        <Progress status='success' size='small' type="circle" percent={75} format={() => ''}/>
                                    }
                                    chartPlacement="left"
                                />
                                <StatisticCard
                                    statistic={{
                                        title: '进行中',
                                        value: 23,
                                        description: <Statistic title="占比" value="38.5%" />,
                                    }}
                                    chart={
                                        <Progress size='small' type="circle" percent={75} format={() => ''}/>
                                    }
                                    chartPlacement="left"
                                />
                                <StatisticCard
                                    statistic={{
                                        title: '延期',
                                        value: 23,
                                        description: <Statistic title="占比" value="38.5%" />,
                                    }}
                                    chart={
                                        <Progress status="exception" size='small' type="circle" percent={75} format={() => ''}/>
                                    }
                                    chartPlacement="left"
                                />
                            </StatisticCard.Group>
                            <Flex justify='space-between'>
                                <Access
                                    accessible={access.operationPermission(get(permissions,formatPerfix + '.add', ''))}
                                    fallback={null}>
                                    <Button type='primary' onClick={() => setModalVisit(true)}>新增任务</Button>
                                </Access>
                                <Segmented
                                    options={[
                                        { value:false , icon: <BarsOutlined /> },
                                        { value: true, icon: <AppstoreOutlined /> },
                                    ]}
                                    onChange={(e) => setLayout(e)}
                                />
                            </Flex>
                        </ProCard>
                    </div>
                  <ProCard style={{marginTop: 10}}>
                      {
                        loading ? <Spin></Spin> : (
                            <div className={ `${styles.card} ${curLayout ? styles.card2 : ''}`}>
                                {
                                  data?.data?.list?.length ? (
                                    <>
                                        {
                                            data?.data?.list?.map((item) => {
                                              return (
                                                  <PCard showDoList={showDoList} doingProject={doingProject} editData={editData} refrash={refrash} layout={curLayout} key={item?.project_id} data={item} op={PROJECT_STATUS}></PCard>
                                              )
                                            })
                                        }
                                    </>
                                  ) : <Empty></Empty>
                                }
                            </div>
                        )
                      }
                     <Flex justify='flex-end'>
                         <Pagination
                             current={pagination.current}
                             pageSize={pagination.pageSize}
                             total={data?.total}
                             onChange={pagination.onChange}
                             onShowSizeChange={pagination.onChange}
                             showQuickJumper
                             showSizeChanger
                             style={{ marginTop: 16, textAlign: 'right' }}
                         />
                     </Flex>
                  </ProCard>

                </div>
                <div className={styles.right}>
                    <ProCard title={<>
                      任务 <b>{curDolist?.name}</b> - 操作记录
                    </>}>
                      {
                        curDolist ? (
                          <>
                              {
                                  curDolistShow?.length ? (
                                      <Timeline
                                          mode="alternate"
                                          items={curDolistShow?.map((item) => {
                                              return {
                                                  dot: item?.dot ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : '',
                                                  color: item?.color ?? token.colorPrimary,
                                                  children: <>
                                                      <Flex align='center'>
                                                          <AvatarMy url={item?.user?.avatar_url} isonline={!item?.user?.token?.length}></AvatarMy>
                                                          <Flex vertical align='start'>
                                                              <Button type='link'>{item?.user?.cn_name}</Button>
                                                              {item?.title}
                                                          </Flex>
                                                      </Flex>
                                                  </>,
                                              }
                                          })}
                                      />
                                      ) : <Empty></Empty>

                              }
                          </>
                        ) : <Empty description='请点击左侧项目进度条查看'></Empty>
                      }
                    </ProCard>
                </div>
              <ModalForm
                title={curData ? '修改任务' : '新建任务'}
                open={modalVisit}
                submitter={{
                  searchConfig: {
                    submitText: '确认',
                    resetText: '取消',
                  },
                }}
                formRef={formRef}
                grid
                onFinish={async (values) => {

                  const data: API.PROJECTMANAGE = {
                    name: values.name,
                    description: values.description,
                    start_date: values.dateRange[0],
                    end_date: values.dateRange[1],
                    personIds: values.personIds,
                  }
                  if(!curData) {
                    fetchCP(data).then((res) => {
                      if(res.success) {
                        message.success('创建成功')
                        setModalVisit(false)
                        refrash()
                      }
                    })
                  } else {
                    updateProject(curData?.project_id,data).then((res) => {
                      if(res?.code === 200) {
                        message.success('修改成功')
                        setModalVisit(false)
                        refrash()
                      }
                    })
                  }

                  return true;
                }}
                modalProps={{
                  forceRender: true,
                    onCancel: () => {
                      setModalVisit(false)
                      setCurData(null)
                      formRef.current?.resetFields()
                    }}}
              >
                <ProFormText
                  name="name"
                  label="任务名称"
                  tooltip="最长为 24 位"
                  placeholder="请输入任务名称"
                  rules={[
                    {
                      required: true,
                      message: '请输入任务名称',
                    },
                    {
                      max: 24,
                      message: '不超过24个字符',
                    },
                  ]}
                />

                <ProFormTextArea
                  name="description"
                  label="任务描述"
                  placeholder="请输入任务描述"
                  rules={[
                    {
                      required: true,
                      message: '请输入任务描述',
                    },
                    {
                      max: 250,
                      message: '不超过250个字符',
                    },
                  ]}
                />
                <ProFormSegmented
                  name="tyoe"
                  label="对象类型"
                  colProps={{
                    span: 12,
                  }}
                  rules={[
                    {
                      required: true,
                      message: '请选择对象类型',
                    },
                  ]}
                  initialValue={'person'}
                  valueEnum={{
                    person: '成员',
                    org: '部门',
                    role: '角色',
                  }}
                />

                <ProFormSelect.SearchSelect
                  name="personIds"
                  label="请选择任务对象"
                  colProps={{
                    span: 12,
                  }}
                  debounceTime={300}
                  rules={[
                    {
                      required: true,
                      message: '请选择任务对象',
                    },
                  ]}
                  fieldProps={{
                    labelInValue: false,
                    style: {
                      minWidth: 140,
                    },
                  }}
                  // options={[
                  //   { label: '全部', value: 'all' },
                  // ]}
                  request={async ({ keyWords = '' }) => {

                    const data = await fetchGetpulist(keyWords)
                    return data?.data ?? []
                  }}
                />

                <ProFormDateTimeRangePicker rules={[
                  {
                    required: true,
                    message: '请选择任务起止区间',
                  },
                ]} name="dateRange" label="任务起止区间" />

              </ModalForm>
            </div>
          <ModalForm
            title={curData?.status === '3' ? '激活任务' : '处理任务' }
            open={doingPro}
            formRef={doingRef}
            submitter={{
              searchConfig: {
                submitText: '确认',
                resetText: '取消',
              },
            }}
            grid
            modalProps={{
                destroyOnClose: true,
              forceRender: true,
              onCancel: () => {
                setDoingPro(false)
                setCurData(null)
                doingRef.current?.resetFields()
              }}}
            onFinish={async (values) => {
              console.log(values)

              let data = {}

              if(curData?.status === '3') {
                data = {
                  ...values,
                  status: '0',
                  project_id: curData?.project_id,
                }
              }else {
                data = {
                  ...values,
                  status:values.switch ? '3' : undefined,
                    project_id: curData?.project_id,
                }
              }
              doingProApi(data).then((res) => {
                if(res?.code === 200) {
                  message.success(curData?.status === '3' ? '激活成功' : '操作成功')
                  setDoingPro(false)
                    refrash()
                }
              })

              return true
            }}
          >
            {
              curData?.status === '3' ? null : (
                <>
                  <ProFormSwitch colProps={{
                    span: 12,
                  }} name="switch" label="是否关闭" initialValue={false}/>

                  <ProFormDependency name={['switch']}>
                    {(data) => {
                      return (
                        <>
                          {
                            data?.switch ? null : (
                              <ProFormSlider
                                name="plan"
                                label="任务进度"
                                colProps={{
                                  span: 12,
                                }}
                              />
                            )
                          }
                        </>
                      )
                    }}
                  </ProFormDependency>

                </>
              )
            }
            <ProFormTextArea
              name="description"
              label="描述"
              placeholder="请输入描述描述"
              rules={[
                {
                  max: 250,
                  message: '不超过250个字符',
                },
              ]}
            />
              <Row style={{width: '100%',display: 'flex',justifyContent: 'center'}}>
                  <Form.Item
                      name="file_str"
                  >
                      <UploadMyFile
                          type='dragger'
                          extra="附件大小不超过5MB"
                          fieldProps={{
                              name: 'file',
                              maxCount: 1,
                          }} />
                  </Form.Item>
              </Row>
          </ModalForm>
        </>
    )
}

export default TableTemplate
