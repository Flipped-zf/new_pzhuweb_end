import {FC} from 'react';

import AvatarMy from '@/components/Avatar';
import TextOver from '@/components/chat/textOver';

import styles from './index.less'
 const RootChat:FC = () => {
    return (
        <>
            <div className={styles.RootChat}>
                <div className={styles.left}>
                    <AvatarMy />
                </div>
                 <div className={styles.right}>
                     <span>hello</span>
                      <div className={styles.comment}>
                        <TextOver
                            content={'2312312312312312312312312312312312312312311111111111'}
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
                         <span>23:23</span>
                         <span style={{color: '#fff'}}>回复</span>
                         <span style={{marginLeft: 'auto'}}>good</span>
                     </div>
                 </div>
            </div>
        </>
    )
}
export default RootChat
