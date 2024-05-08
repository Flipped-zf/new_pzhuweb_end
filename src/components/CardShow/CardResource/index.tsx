import moment from 'moment';
import {FC} from 'react';

import {gotoDetail} from '@/pages/communication-platform/platform-square/utils';
import {IconFont} from '@/utils/const';

import styles from './index.less'

type CardResourceProps = {
  dataArt: API.RESOURCEMANAGEMENT & API.ACHIEVEMENTMANAGEMENT
}

export const CardResource:FC<CardResourceProps> = ({dataArt }) => {
  return (<>
    <div className={styles.CardResource}>
      <div className="example-2 card">
        <img src={dataArt.posterlink}/>
        <div className="wrapper">
          <div className="header">
            <div className="date">
              <span className="day">{moment(dataArt?.created_time).format('DD')}-</span>
              <span className="month">{moment(dataArt?.created_time).format('MMMM')}</span>
              <span className="year">-{moment(dataArt?.created_time).year()}</span>
            </div>
            <ul className="menu-content">
              <li>
                <span className='numbers'>{dataArt?.readnumber}</span>
                <IconFont type='icon-watch'/>
              </li>
              <li> <span className='numbers'>{dataArt?.startCount}</span>
                <IconFont type='icon-like'/></li>
              <li> <span className='numbers'>{dataArt?.commentCount}</span>
                <IconFont type='icon-comment'/></li>
            </ul>
          </div>
          <div className="data">
            <div className="content">
              <span className="author">{dataArt['userInfo.cn_name']}</span>
              <h1 className="title"><a >{dataArt?.title}</a></h1>
              <p className="text">{dataArt?.describe}</p>
              <a className="button" onClick={() => gotoDetail({
                id: dataArt?.achievement_id || dataArt?.resource_id || '',
                type: dataArt?.achievement_id ? 'achievementModel' : 'resourceModel',
              })}>Read more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}
