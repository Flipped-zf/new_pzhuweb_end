
import {Collapse, CollapseProps, Tag} from 'antd';
import {FC} from 'react';

import AvatarMy from '@/components/Avatar';
import ReplayChat from '@/components/chat/rootChat/replayChat';
import TextOver from '@/components/chat/textOver';
import {IconFont} from '@/utils/const';

import styles from './index.less'

type fetchCommentList = {
  id: string,
  type: string
}

type ChatProps = {
  showComment: Function,
  commentList: any[],
  adminId: string,
  peopleNum: string
}


const Chat:FC<ChatProps> = ({showComment,commentList,adminId,peopleNum}) => {

  return (
    <>
      <div className={styles.Chat}>
        <div className={styles.Chat_header}>
          chat
          <span>
            <IconFont type={'icon-renshu'}></IconFont>
            {peopleNum ?? '0'}
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.ChatMy}>
            {
              commentList.length ? (
                commentList.map(((item) => {
                  return (
                    <>
                      <div className={styles.RootChat}>
                        <div className={styles.left}>
                          <AvatarMy isonline={item?.userInfo?.isOnline} url={item?.userInfo?.avatar_url}/>
                        </div>
                        <div className={styles.right}>
                        <span>{`${item?.userInfo?.cn_name}`}{
                          item?.user_id === adminId ? (
                            <span style={{marginLeft: 5}}>
                              <Tag color="#cd201f" >
                              作者
                            </Tag>
                            </span>
                          ) : null
                        }</span>
                          <div className={styles.comment}>
                            <TextOver
                              content={item?.content}
                              maxLen={80}
                              contentRender={(text: string, handler: any) => {
                                return (
                                  <>
                                    <div style={{
                                      wordBreak: 'break-all',
                                      color: '#FFF',
                                      fontSize: 12,
                                    }}>{text}{handler}</div>

                                  </>
                                )
                              }}
                            />
                          </div>
                          <div className={styles.actions}>
                            <span>{item?.created_time}</span>
                            <span style={{color: '#fff',cursor: 'pointer'}} onClick={() => showComment({
                              comment_id: item?.comment_id,
                              user_id: item?.user_id,
                              cn_name: item?.userInfo?.cn_name,
                            })}>回复</span>
                            <span style={{marginLeft: 'auto'}}>good</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.replayList}>
                        {
                          item?.answerCommentList?.length ? (
                            <Collapse defaultActiveKey={['0']} ghost items={[
                              {
                                key: '1',
                                label: '展开更多',
                                children: (
                                  <>
                                    {
                                      item.answerCommentList?.map((r) => {
                                        return (
                                          <ReplayChat showComment={showComment} adminId={adminId} ReplayData={r}></ReplayChat>
                                        )
                                      })
                                    }
                                  </>
                                ),
                              },
                            ]} />

                          ) : null
                        }
                      </div>
                    </>
                  )
                }))
              ) : null
            }

          </div>
        </div>
        <div className={styles.Chat_footer}>
          <div className='chat-footer'>
            {/* <input type="text" placeholder="Write your message"/>*/}
              <div className='inner' onClick={() => showComment(null)}>

              </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default Chat
