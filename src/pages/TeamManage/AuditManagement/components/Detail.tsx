import './detail.less'

import {Avatar} from 'antd';
import moment from 'moment';
import {FC, useEffect, useState} from 'react';

import {getPageDetail} from '@/services/team/audit';
import {useDictCode} from '@/utils';
const DetailPage:FC = ({id}) => {

    const [detailPAge,setPage] = useState({})

    const {ARTICLE_KILL_TYPE,ARTICLE_TYPE} = useDictCode(['ARTICLE_KILL_TYPE','ARTICLE_TYPE'])

    const [tagList,setTagLIst] = useState([])

    useEffect(() => {
        if(id) {
            getPageDetail(id).then((res) => {
                if(res?.code === 200) {
                  setPage(res.data)
                    const list = []
                    list.push(findKey(ARTICLE_KILL_TYPE,res.data?.technology_id))
                    list.push(findKey(ARTICLE_TYPE,res.data?.menu_id))
                    list.push(res.data?.keywords)
                    setTagLIst(list)
                }
            })
        }
    }, [id]);


    function findKey(options,key) {
        return options?.find((item) => item.value === key).label ?? ''
    }


    return (
        <>
            <div className='detailPage'>
                <div className="header" style={{'--bgImg': `url(${detailPAge?.postlink})`}}>
                    <div className="info">
                        <h1>{detailPAge?.title}</h1>
                        <div className="meta">
                            <Avatar src={detailPAge?.userInfo?.avatar_url} size='large'/>
                            <a href="https://twitter.com/nodws" target="_b">By {detailPAge?.userInfo?.cn_name} on {moment(detailPAge?.userInfo?.created_time).format('YYYY-MM-DD')}</a>
                        </div>
                        <h4><a href="#category">{tagList.join('、')}</a></h4>

                    </div>
                </div>
                <section className="content">
                    <div dangerouslySetInnerHTML={{
                        __html: detailPAge?.context,
                    }} />;
                </section>
            </div>
        </>
    )
}
export default DetailPage
