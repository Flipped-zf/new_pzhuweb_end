import {ExportOutlined} from '@ant-design/icons';
import {FC} from 'react';

import styles from './index.less'

type AvatarProps = {
  url: string,
  isonline: boolean
}

const AvatarMy:FC<AvatarProps> = ({url = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample17.jpg',isonline = false}) => {
  return (
    <>
      <div className={styles.Avatar}>
        <div className={styles.span_online} style={{backgroundColor: isonline ? '#22b07d' : '#808191'}}></div>
        <div className="snip1566 hover">
          <img src={url} alt="sq-sample17" />
          <figcaption><i >
            <ExportOutlined />
          </i></figcaption>
          <a href="#"></a>
        </div>
      </div>
    </>
  )
}
export default AvatarMy
