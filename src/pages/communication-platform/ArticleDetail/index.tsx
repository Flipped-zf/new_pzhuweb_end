import {HeartOutlined, ShareAltOutlined} from '@ant-design/icons';
import {ModalForm, ProCard, ProFormTextArea} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {useRequest} from 'ahooks';
import {Button, Col, Divider, Form, message, Row, Space} from 'antd';
import React, {FC, useContext, useEffect, useState} from 'react';

import AvatarMy from '@/components/Avatar';
import ArticleContent from '@/pages/communication-platform/ArticleDetail/components/ArticleContent';
import ArticleHeader from '@/pages/communication-platform/ArticleDetail/components/ArticleHeader';
import Chat from '@/pages/communication-platform/ArticleDetail/components/chat';
import {copyCurrentURL, gotoDetailProps} from '@/pages/communication-platform/platform-square/utils';
import {addComment, addReadNum, getCommentLIst, getDetail} from '@/services/communication-platform/detail';
import {getHotList, updateStart} from '@/services/communication-platform/exchange';
import {formatResponse} from '@/utils';
import {CreateComment} from '@/utils/types/communication-platform';
import {KeepAliveContext, useLocation} from '@@/exports';

import RightList from './components/rightList'
import styles from './index.less'

 const ArticleDetail:FC = () => {
     const { query, setData } = useModel('detailQuery');
   const { refreshTab } = useContext(KeepAliveContext);

     const {search} = useLocation()
   const searchParams = new URLSearchParams(search)
   let ac_id = searchParams.get('id') ?? undefined
   let type = searchParams.get('type') ?? undefined
    const [curData,setCurData] = useState({})
   const [commentList,setCommentLIst] = useState({})
   const [form] = Form.useForm<{ name: string; company: string }>();
   const [modalVisit, setModalVisit] = useState(false);
  const [toUserInfo,setUserInfo] = useState(null)
     if(!ac_id || !type){
         ac_id = query?.id
         type = query?.type
     } else {
         setData({
             id: ac_id,
             type,
         })
     }
     const { loading: loadingDetail,runAsync: fetchGetDetail } = useRequest(
         async (options:gotoDetailProps) => formatResponse(await getDetail(options)), {
             manual: true,
         })

   const { loading: loadingComment,runAsync: fetchComment } = useRequest(
     async (options:gotoDetailProps) => formatResponse(await addComment(options)), {
       manual: true,
     })
   const { loading: loadingCommentList,runAsync: fetchCommentList } = useRequest(
     async (options:any) => formatResponse(await getCommentLIst(options)), {
       manual: true,
     })
   useEffect(() => {
     let id = curData.article_id
     let type = 'article_id'

     if(curData.achievement_id) {
       id = curData.achievement_id
       type = 'achievement_id'
     }
     if(curData.resource_id) {
       id = curData.resource_id
       type = 'resource_id'
     }

     if(id) {
       fetchCommentList({
         id,
         type,
       }).then((res) => {
         console.log(res)
         setCommentLIst(res.data)
       })
     }
   }, [curData]);

     function init() {
       const data = {
           id: ac_id,
           type,
       }
         fetchGetDetail(data).then((res) => {
             if (res.success) {
                 setCurData(res.data)

             }
         })
     }
     useEffect(() => {
         init()
         addReadNum({
             id: ac_id,
             type,
         }).then((res) => console.log('ok',res))
     }, []);

     const { runAsync: fetchUpdateStart } = useRequest(
         async (pamars) => formatResponse(await updateStart(pamars)), {
             manual: true,
             debounceWait: 300,
         })
     function addChange(record:any) {
         fetchUpdateStart(record?.Start?.length ? {ac_id: record?.Start[0]?.start_id} : {
             type,
             type_id: record.article_id || record.achievement_id || record?.resource_id || '',
         }).then((res) => {
             if(res.success) {
                 message.success('操作成功')
                 init()
             } else {
                 message.warning('操作失败')
             }
         })

     }

     const Replay = (toUser) => {
       setUserInfo(toUser)
        setModalVisit(true)
      }
      const createCcomment = async ({content}) => {
        setModalVisit(false)
        const props: CreateComment = {content}
          props.type = !toUserInfo ? '0' : '1' // 评论 和 回复
          if(curData.article_id) {
            props.article_id = curData.article_id
          } else if(curData.achievement_id) {
            props.achievement_id = curData.achievement_id
          } else if(curData.resource_id) {
            props.resource_id = curData.resource_id
          }
        props.to_user_id = toUserInfo?.user_id ?? curData?.userInfo?.user_id
        props.root_id = toUserInfo?.comment_id ?? undefined
          props.authorID = curData?.userInfo?.user_id
          props.title = curData?.title
          props.name = curData?.userInfo?.cn_name
        fetchComment(props).then((res) => {

          if(res.success) {
            !toUserInfo ? message.success('评论成功') : message.success('回复成功')
            refreshTab(location.pathname)
          }
        })
        return Promise.resolve()
      }
   function showTitle() {
        let typeName = '文章'
        if(curData.achievement_id) {
          typeName = '成果'
        }
     if(curData.resource_id) {
       typeName = '资源'
     }
       if(!toUserInfo) {
         return `评论 ${curData?.userInfo?.cn_name} 的 ${typeName}`
       }
         return `回复 ${toUserInfo?.cn_name} 的评论`
   }



   return (<>
    <ProCard>
      <div className={styles.ArticleDetail}>
        <div className={styles.div1}>
            <ArticleHeader
                url={curData?.postlink || curData?.posterlink}
                liulan={curData?.readnumber}
                xihuan={curData?.startCount}
            ></ArticleHeader>
        </div>
        <div className={styles.div2}><Chat adminId={curData?.founder} showComment={Replay} commentList={commentList?.rootComment ?? [] } peopleNum={commentList?.peopleNum}/></div>
        <div className={styles.div3}>
          <div>
              <AvatarMy url={curData?.userInfo?.avatar_url} isonline={curData?.userInfo?.token?.data.length}></AvatarMy>
          </div>
          <div className={styles.info}>
            <div>{curData?.userInfo?.cn_name}</div>
            <div className={styles.info_sub}>{curData?.userInfo?.email}</div>
          </div>
          <div className={styles.buttons}>
            <Space>
              <Button type='primary' style={{background: '#ea5f5f'}} icon={<HeartOutlined />}
              onClick={() => addChange(curData)}
              >{curData?.Start?.length ? '取消喜欢' : '添加到喜欢'}</Button>
              <Button icon={<ShareAltOutlined />} onClick={() => {
                  copyCurrentURL()
              }}>分享</Button>
            </Space>
          </div>
        </div>

      </div>
      <div className={styles.ArticleContent}>
        <ArticleContent title={curData?.title} describe={curData?.describe} context={curData?.context || curData?.content}/>
        <div>
            <Divider orientation="right">推荐阅读</Divider>
          <RightList></RightList>
        </div>
      </div>
      <ModalForm<{
        name: string;
        company: string;
      }>
        title=""
        form={form}
        autoFocusFirstInput
        open={modalVisit}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setModalVisit(false)
            setUserInfo(null)
          },
          okText: '提交',
        }}
        onFinish={createCcomment}
      >
        {/* <Row style={{ width: '100%' }}>*/}
          {/* <Col span={24}>*/}
            {/* 内容 */}
            {/* <Form.Item*/}
            {/*  name="content"*/}
            {/*  label={showTitle()}*/}
            {/*  rules={[{ required: true }]}*/}
            {/* >*/}
            {/*  <QuillEditor />*/}
            {/* </Form.Item>*/}

          {/* </Col>*/}
        {/* </Row>*/}
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="content"
          label={showTitle()}
        />
      </ModalForm>
    </ProCard>
  </>)
}
export default ArticleDetail
