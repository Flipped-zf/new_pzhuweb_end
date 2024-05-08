import {Row, Space} from 'antd';
import {FC} from 'react';

import {IconFont} from '@/utils/const';

import styles from './ArticleHeader.less'

type ArticleHeaderProps = {
  url: string;
  liulan: string;
  xihuan: string
}

const ArticleHeader:FC<ArticleHeaderProps> = ({url,liulan,xihuan}) => {
  return (
    <>
      <div className={styles.ArticleHeader}>
        <img src={url}/>
        <div className={styles.dataShows}>
          <Row justify='center' align='middle' style={{height: '100%'}}>
            <Space>
              <div className={styles.icon_text}><IconFont type='icon-liulan'/> <span>
                {liulan ?? 0}
              </span></div>
              <div className={styles.icon_text}> <IconFont type='icon-xihuan'/> <span>
                {xihuan ?? 0}
              </span></div>
            </Space>
          </Row>
        </div>
      </div>
    </>
  )
}

export default ArticleHeader
