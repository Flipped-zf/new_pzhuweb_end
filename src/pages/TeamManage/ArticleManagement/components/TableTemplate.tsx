import {ActionType, ProColumns, ProTable} from '@ant-design/pro-components';
import {dropByCacheKey,history} from '@umijs/max';
import {useBoolean, useRequest} from 'ahooks';
import {App, Button, Modal, Popconfirm, Switch, Typography} from 'antd';
import {FC, useContext, useRef, useState} from 'react';

import DropdownMenu from '@/components/DropdownMenu';
import {
  columnScrollX,
  CreateButton,
  createTimeColumn,
  createTimeInSearch, operationColumn,
  sortColumn,
  statusColumn,
} from '@/components/TableColumns';
import DetailPage from '@/pages/TeamManage/AuditManagement/components/Detail';
import {delArticle, getArticleList, setArticleStatus} from '@/services/team/article';
import {formatPerfix, formatResponse, optionsToValueEnum, useDictCode} from '@/utils';
import {ASTATUS, INTERNATION, ROUTES, STATUS} from '@/utils/enums';
import {SearchParams} from '@/utils/types/team/articleManage';
import {FormattedMessage, KeepAliveContext, useIntl} from '@@/exports';


const {Text} = Typography
const TableTemplate: FC = () => {
  const { formatMessage } = useIntl();
  const { message } = App.useApp();
  const { refreshTab } = useContext(KeepAliveContext);

  // 获取表格实例
  const tableRef = useRef<ActionType>();

  const [resLoading, { setTrue: setResLoadingTrue, setFalse: setResLoadingFalse }] = useBoolean(false);
  const [resLoadingP, { setTrue: setResPLoadingTrue, setFalse: setResPLoadingFalse }] = useBoolean(false);

  const [resId, setResId] = useState<string>('')
  const [open, setOpen] = useState(false);

  const { runAsync: fetchResList } = useRequest(
    async (params) => formatResponse(await getArticleList(params)), {
      manual: true,
    })
  function reloadTable() {
    tableRef?.current?.reload()
  }

  const {ARTICLE_KILL_TYPE,ARTICLE_TYPE,ASTATUS_TYPE} = useDictCode(['ARTICLE_KILL_TYPE','ARTICLE_TYPE','ASTATUS_TYPE'])


  const changeResStatus = async ({ article_id, status,pinned }: API.ARTICLEMANAGEMENT,type:string) => {
    const postData = {
      article_id,
    }
    if(type === 'status') {
      postData.status = status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE
    }else if(type === 'pinned') {
      postData.pinned = pinned === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE
    }

    await setArticleStatus(postData).then((result) => {
      message.success(result.msg)
      reloadTable()
    }).finally(() => {
      setResLoadingFalse()
      setResPLoadingFalse()
    })
  }
  // 渲染设置状态
  const renderRoleStatus = (record: API.ARTICLEMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={resId === record.article_id && resLoading}
      onConfirm={() => changeResStatus(record,'status')}
      onCancel={() => setResLoadingFalse()}
      key="popconfirm"
    ><Switch
      checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
      unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
      checked={record.status === STATUS.NORMAL}
      loading={resId === record.article_id && resLoading}
      onChange={() => { setResLoadingTrue(); setResId(record.article_id) }}
    />
    </Popconfirm>
  );
  const renderRolePinned = (record: API.ARTICLEMANAGEMENT) => (
    <Popconfirm
      title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
      open={resId === record.article_id && resLoadingP}
      onConfirm={() => changeResStatus(record,'pinned')}
      onCancel={() => setResPLoadingFalse()}
      key="popconfirm"
    ><Switch
      checkedChildren={formatMessage({ id: INTERNATION.FLAG_YES })}
      unCheckedChildren={formatMessage({ id: INTERNATION.FLAG_NO })}
      checked={record.pinned === STATUS.NORMAL}
      loading={resId === record.article_id && resLoadingP}
      onChange={() => { setResPLoadingTrue(); setResId(record.article_id) }}
    />
    </Popconfirm>
  );
  function goToPage() {
    dropByCacheKey(ROUTES.ARTICLEMPAGREANAGEMENT)
    history.push(ROUTES.ARTICLEMPAGREANAGEMENT)
  }

  const columns: ProColumns<API.ARTICLEMANAGEMENT>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'col_title') }),
      dataIndex: 'title',
      ellipsis: true,
      copyable:true,
      align: 'center',
      width: 180,
      render:(_,record) => {
        return (<Button type='link' onClick={() => {
          setResId(record.article_id)
          setOpen(true)
        }}>{record.title}</Button>)
      },
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'menu_id') }),
      dataIndex: 'menu_id',
      ellipsis: true,
      align: 'center',
      width: 80,
      valueType: 'select',
      valueEnum: optionsToValueEnum(ARTICLE_TYPE ?? []),
      // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
      //   return item.value === record?.type
      // })?.label ?? '暂无'}</Text>,
    },

    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'technology_id') }),
      dataIndex: 'technology_id',
      ellipsis: true,
      align: 'center',
      width: 80,
      valueType: 'select',
      valueEnum: optionsToValueEnum(ARTICLE_KILL_TYPE ?? []),
      // render:(_,record) => <Text>{ACHIEVEMENT_TYPE?.find((item) => {
      //   return item.value === record?.type
      // })?.label ?? '暂无'}</Text>,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'keywords') }),
      dataIndex: 'keywords',
      ellipsis: true,
      copyable:true,
      align: 'center',
      width: 180,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'postlink') }),
      dataIndex: 'postlink',
      key: 'postlink',
      valueType: 'image',
      width: 80,
      hideInSearch: true,
      align: 'center',
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'readnumber') }),
      dataIndex: 'readnumber',
      ellipsis: true,
      hideInSearch: true,
      align: 'center',
      width: 180,
    },
    {
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'article_status') }),
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
      title: formatMessage({ id: formatPerfix(ROUTES.ARTICLEMANAGEMENT, 'pinned') }),
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
          pathName={ROUTES.ARTICLEMANAGEMENT}
          editCallback={ [ASTATUS.CHECKED,ASTATUS.CHECK].includes(record.article_status) ? undefined : () => {
            // const result = cloneDeep(record)
            // dropByCacheKey(ROUTES.ARTICLEMPAGREANAGEMENT)
            history.push(`${ROUTES.ARTICLEMPAGREANAGEMENT}?id=${record.article_id}`)
            refreshTab(location.pathname)
          }}
          deleteParams={{
            request: delArticle,
            id: record.article_id,
          }}
          reloadTable={reloadTable}
        />
      ),
    },
  ]

  return (<>
    <ProTable<API.ARTICLEMANAGEMENT, SearchParams>
      actionRef={tableRef}
      columns={columns}
      request={async (params: SearchParams,sort) => fetchResList({...params,sort})}
      rowKey="article_id"
      pagination={{ pageSize: 5 }}
      // 工具栏
      toolBarRender={() => [
        // 新增按钮
        <CreateButton
          key="create"
          pathName={ROUTES.ARTICLEMANAGEMENT}
          callback={() => goToPage()} />,
      ]}
      scroll={{ x: columnScrollX(columns) }}
    />
    <Modal
        open={open}
        title="文章预览"
        onCancel={() => {
          setOpen(false)
          setResId('')
        }}
        forceRender={true}
        footer={[]}
        width={800}
    >
      <div style={{height: '100%'}}>
        <DetailPage id={resId}></DetailPage>
      </div>
    </Modal>
  </>)
}
export default TableTemplate
