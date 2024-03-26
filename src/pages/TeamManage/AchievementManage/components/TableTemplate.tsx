import {ActionType, ProColumns, ProFormInstance, ProTable} from '@ant-design/pro-components';
import {useBoolean, useRequest} from 'ahooks';
import {App, Button, Popconfirm, Switch, Typography} from 'antd';
import {cloneDeep} from 'lodash-es';
import {FC, MutableRefObject, useRef, useState} from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch, operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import ARDetail from '@/pages/TeamManage/components/ARDetail';
import {delDict} from '@/services/system/dict-manage';
import {delAchievement, getAcList, setAcStatus} from '@/services/team/achievement';
import {formatPerfix, formatResponse, optionsToValueEnum, useDictCode} from '@/utils';
import {ASTATUS, INTERNATION, ROUTES, STATUS} from '@/utils/enums';
import {SearchParams} from '@/utils/types/team/achievementManage';
import {FormattedMessage, useIntl} from '@@/exports';

import FormTemplate from './FormTemplate'

const {Text} = Typography
const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  const { message } = App.useApp();

  // 获取表格实例
  const tableRef = useRef<ActionType>();

  const stepFormMapRef = useRef<MutableRefObject<ProFormInstance>[]>([]);


  const [resLoading, { setTrue: setResLoadingTrue, setFalse: setResLoadingFalse }] = useBoolean(false);
  const [resLoadingP, { setTrue: setResPLoadingTrue, setFalse: setResPLoadingFalse }] = useBoolean(false);
  const [openOther, setOpenOther] = useState(false);

  const [resId, setResId] = useState<string>('')

  const { runAsync: fetchResList } = useRequest(
    async (params) => formatResponse(await getAcList(params)), {
      manual: true,
    })
  function reloadTable() {
    tableRef?.current?.reload()
  }

  const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] = useBoolean(false);
  const {ACHIEVEMENT_TYPE,ASTATUS_TYPE} = useDictCode(['ACHIEVEMENT_TYPE','ASTATUS_TYPE'])

  const changeResStatus = async ({ achievement_id, status,pinned }: API.ACHIEVEMENTMANAGEMENT,type:string) => {
    const postData = {
        achievement_id,
    }
      if(type === 'status') {
          postData.status = status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE
      }else if(type === 'pinned') {
          postData.pinned = pinned === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE
      }

    await setAcStatus(postData).then((result) => {
      message.success(result.msg)
      reloadTable()
    }).finally(() => {
      setResLoadingFalse()
      setResPLoadingFalse()
    })
  }
  // 渲染设置状态
  const renderRoleStatus = (record: API.ACHIEVEMENTMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={resId === record.achievement_id && resLoading}
      onConfirm={() => changeResStatus(record,'status')}
      onCancel={() => setResLoadingFalse()}
      key="popconfirm"
    ><Switch
      checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
      unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
      checked={record.status === STATUS.NORMAL}
      loading={resId === record.achievement_id && resLoading}
      onChange={() => { setResLoadingTrue(); setResId(record.achievement_id) }}
    />
    </Popconfirm>
  );
  const renderRolePinned = (record: API.ACHIEVEMENTMANAGEMENT) => (
      <Popconfirm
          title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
          open={resId === record.achievement_id && resLoadingP}
          onConfirm={() => changeResStatus(record,'pinned')}
          onCancel={() => setResPLoadingFalse()}
          key="popconfirm"
      ><Switch
          checkedChildren={formatMessage({ id: INTERNATION.FLAG_YES })}
          unCheckedChildren={formatMessage({ id: INTERNATION.FLAG_NO })}
          checked={record.pinned === STATUS.NORMAL}
          loading={resId === record.achievement_id && resLoadingP}
          onChange={() => { setResPLoadingTrue(); setResId(record.achievement_id) }}
      />
      </Popconfirm>
  );


  const columns: ProColumns<API.ACHIEVEMENTMANAGEMENT>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.AHIEVEMENTMANAGEMENT, 'col_title') }),
      dataIndex: 'title',
      ellipsis: true,
      align: 'center',
      width: 180,
      render:(_,record) => {
        return (<Button type='link' onClick={() => {
          setResId(record.achievement_id)
          setOpenOther(true)
        }}>{record.title}</Button>)
      },
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.AHIEVEMENTMANAGEMENT, 'type') }),
      dataIndex: 'type',
      ellipsis: true,
      copyable:true,
      align: 'center',
      width: 80,
      valueType: 'select',
      valueEnum: optionsToValueEnum(ACHIEVEMENT_TYPE ?? []),
      // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
      //   return item.value === record?.type
      // })?.label ?? '暂无'}</Text>,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.AHIEVEMENTMANAGEMENT, 'article_status') }),
      dataIndex: 'article_status',
      ellipsis: true,
      align: 'center',
      width: 80,
      valueType: 'select',
      valueEnum: optionsToValueEnum(ASTATUS_TYPE ?? [],true),
      // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
      //   return item.value === record?.type
      // })?.label ?? '暂无'}</Text>,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.AHIEVEMENTMANAGEMENT, 'pinned') }),
      dataIndex: 'pinned',
      width: 100,
      filters: true,
      onFilter: true,
      align: 'center',
        valueEnum: {
            [STATUS.DISABLE]: { text: <FormattedMessage id={INTERNATION.FLAG_NO} />, status: 'Default' },
            [STATUS.NORMAL]: { text: <FormattedMessage id={INTERNATION.FLAG_YES} />, status: 'Processing' },
        },
        render: (_, record) => renderRolePinned(record),
    },
    {
      ...statusColumn,
      render: (_, record) => renderRoleStatus(record),
    },
    /* 排序 */
    sortColumn,
    /* 创建时间 */
    createTimeColumn,
    /* 创建时间-搜索 */
    createTimeInSearch,
    {
      ...operationColumn,
      render: (_, record) => (
          <DropdownMenu
              pathName={ROUTES.AHIEVEMENTMANAGEMENT}
              editCallback={[ASTATUS.CHECKED,ASTATUS.CHECK].includes(record.article_status) ? undefined : () => {
                const result = cloneDeep(record)
                stepFormMapRef?.current?.forEach((formInstanceRef) => {
                  formInstanceRef?.current?.setFieldsValue(result);
                });
                setModalVisibleTrue()
              }}
              deleteParams={{
                request: delAchievement,
                id: record.achievement_id,
              }}
              reloadTable={reloadTable}
          />
      ),
    },
  ]

  return (<>
    <ProTable<API.ACHIEVEMENTMANAGEMENT, SearchParams>
      actionRef={tableRef}
      columns={columns}
      request={async (params: SearchParams,sort) => fetchResList({...params,sort})}
      rowKey="achievement_id"
      pagination={{ pageSize: 5 }}
      // 工具栏
      toolBarRender={() => [
        // 新增按钮
        <CreateButton
          key="create"
          pathName={ROUTES.AHIEVEMENTMANAGEMENT}
          callback={() => setModalVisibleTrue()} />,
      ]}
      scroll={{ x: columnScrollX(columns) }}
    />
    <FormTemplate
      reloadTable={reloadTable}
      modalVisible={modalVisible}
      setModalVisibleFalse={setModalVisibleFalse}
      stepFormMapRef={stepFormMapRef}
    />
    <ARDetail isOpen={openOther} closeModale={() => {
      setOpenOther(false)
      setResId('')
    }} aid={resId}></ARDetail>
  </>)
}
export default TableTemplate
