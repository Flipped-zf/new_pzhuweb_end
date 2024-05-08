import moment from 'moment';
import {FC, useContext} from 'react';

import Avatar from '@/components/Avatar';
import {gotoDetail} from '@/pages/communication-platform/platform-square/utils';
import { IconFont } from '@/utils/const'
import {ROUTES} from '@/utils/enums';
import {KeepAliveContext} from '@@/exports';

import styles from './index.less'

type CardArticleProps = {
  dataArt: API.ARTICLEMANAGEMENT
}

export const CardArticle:FC<CardArticleProps> = ({dataArt}) => {
  const { refreshTab } = useContext(KeepAliveContext);

  return (<>
    <div className={styles.CardArticle}>
      <div className="example-1 card">
        <img className='artImg' src={dataArt.postlink}/>
        <div className="wrapper">
          <div className="date">
            <span className="day">{moment(dataArt?.created_time).format('DD') }</span>
            <span className="month">{moment(dataArt?.created_time).format('MMMM')}</span>
            <span className="year">{moment(dataArt?.created_time).year()}</span>
          </div>
          <div className="data">
            <div className="content">

              <span className="author"><Avatar url={dataArt['userInfo.avatar_url']} isonline={dataArt['userInfo.token'].data.length}></Avatar>{dataArt['userInfo.cn_name']}</span>
              <h1 className="title" onClick={() => {
                gotoDetail({
                  id: dataArt.article_id ?? '',
                  type: 'articleModel',
                })
                refreshTab(location.pathname)
              }}><a >{dataArt.title}</a></h1>
              <p className="text">{dataArt.describe}</p>
              <label htmlFor={`${dataArt.article_id || dataArt.technology_id }`} className="menu-button"><span></span></label>
            </div>
            <input type="checkbox" id={`${dataArt.article_id || dataArt.technology_id }`} />
            <ul className="menu-content">
              <li>
                <span>{dataArt.readnumber}</span>
                <IconFont type='icon-watch'/>
              </li>
              <li>
                <span>{dataArt?.startCount}</span>
                <IconFont type='icon-like'/>
              </li>
              <li>
                <span>{dataArt?.commentCount}</span>
                <IconFont type='icon-comment'/>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>)
}
