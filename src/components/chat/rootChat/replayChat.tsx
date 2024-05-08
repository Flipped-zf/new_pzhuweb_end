import {CaretRightOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import {FC} from 'react';

import AvatarMy from '@/components/Avatar';
import TextOver from '@/components/chat/textOver';

import styles from './index.less'

type ChatProps = {
  showComment:Function,
  ReplayData: any,
  adminId: string
}

const ReplayChat:FC<ChatProps> = ({ReplayData,adminId,showComment}) => {
  return (
    <>
      <div className={styles.RootChat}>
        <div className={styles.left}>
          <AvatarMy isonline={ReplayData.userInfo?.isOnline} url={ReplayData.userInfo?.avatar_url}/>
        </div>
        <div className={styles.right}>
          <span>
            {`${ReplayData?.userInfo?.cn_name}`}{
            ReplayData?.user_id === adminId ? (
              <span style={{marginLeft: 5}}>
                              <Tag color="#cd201f" >
                              作者
                            </Tag>
                            </span>
            ) : null
          }
            <span style={{margin: '0 5px'}}>
              <CaretRightOutlined />
            </span>
            {`${ReplayData?.answerUserInfo?.cn_name}`}{
            ReplayData?.to_user_id === adminId ? (
              <span style={{marginLeft: 5}}>
                              <Tag color="#cd201f" >
                              作者
                            </Tag>
                            </span>
            ) : null
          }
          </span>
          <div className={styles.comment}>
            <TextOver
              content={ReplayData?.content}
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
            <span>{ReplayData?.created_time}</span>
            <span style={{color: '#fff',cursor: 'pointer'}} onClick={() => showComment({
              comment_id: ReplayData?.root_id,
              user_id: ReplayData?.user_id,
              cn_name: ReplayData?.userInfo?.cn_name,
            })}>回复</span>
            <span style={{marginLeft: 'auto'}}>good</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default ReplayChat
