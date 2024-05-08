

import {CaretRightOutlined} from '@ant-design/icons';
import {PageContainer, ProCard} from '@ant-design/pro-components'
import {usePagination, useRequest} from 'ahooks';
import {Collapse, CollapseProps, Empty, Pagination, Radio, Spin, theme} from 'antd';
import Masonry from 'masonry-layout'
import type {CSSProperties, FC} from 'react';
import {useEffect, useRef, useState} from 'react';

import {People} from '@/components/Animation';
import {DIYCard} from '@/components/CardShow';
import {CardArticle} from '@/components/CardShow/CardArticle';
import {CardResource} from '@/components/CardShow/CardResource';
import {GoodSwiper} from '@/components/Swiper';
import {LightText} from '@/components/Text';
import {getALlList, getHotList, getTopList} from '@/services/communication-platform/exchange';
import {formatResponse, ShowTagList, useDictCodeAsync} from '@/utils';

import TableTemplate from './components/TableTemplate'
import styles from './index.less'
const CommunicationPlatform: FC = () => {

  const arContentRef = useRef(null)
  const [swiperData,setSwiperData] = useState({})
  const [hotData,setHotData] = useState({})
  const [curType,setCurType] = useState('articleModel')


  const { loading: loaddingSwiper,runAsync: fetchGetTopListt } = useRequest(
    async () => formatResponse(await getTopList()), {
      manual: true,
    })

  const { loading: loaddingHot,runAsync: fetchGetHotList } = useRequest(
      async () => formatResponse(await getHotList()), {
        manual: true,
      })

  const { data, loading:loaddingAll, pagination } = usePagination(({ current, pageSize }) => {
    return getALlList({
      current,
      pageSize,
      type: curType,
    });
  },{
    refreshDeps: [curType],
  });

  async function init() {
    const {ARTICLE_KILL_TYPE,ARTICLE_TYPE} = await useDictCodeAsync(['ARTICLE_KILL_TYPE','ARTICLE_TYPE'])
    fetchGetTopListt().then((res) => {
      if (res.success) {
        res.data?.forEach((item) => {
          item.tagList = ShowTagList([ARTICLE_KILL_TYPE,ARTICLE_TYPE],[item?.technology_id,item?.menu_id],[item?.keywords]).join('、')
        })
        setSwiperData(res?.data as any)
      }
    })
  }



  useEffect(() => {

    // new Masonry(arContentRef?.current, {
    //   itemSelector: '.grid-item',
    //   percentPosition: true, // 使用百分比宽度的响应式布局
    //   horizontalOrder: true, // 对项目进行布局以保持水平的从左到右的顺序,定义了此条件，照片一般会按照从左到右顺序排列，但也不是绝对的。
    //   originLeft: true, // 设置布局方式为从左到右，此项是默认值，可以不填写，如果你设置值为false，则会从右到左排序
    //   originTop: true,// 设置布局方式为从上到下，此项是默认值，可以不填写，如果你设置值为false，则会从下到上排序
    // })
    init()
    fetchGetHotList().then((res) => {
      if(res.success) {
        setHotData(res.data)
      }
    })


  }, []);
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
      key: '1',
      label: '通用筛选条件',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: '类型筛选',
      children: <p>{text}</p>,
      style: panelStyle,
    },

  ];

  const searchList = (e) => {
    setCurType(e.target.value)
  }

  return (
    <PageContainer header={{ title: null }}>
       <TableTemplate />

      <div className={styles.outContain}>
        <div className='div1'>
            <GoodSwiper dataList={swiperData} refreshAction={() => init()}></GoodSwiper>
        </div>
        <div className='div2'>
          <ProCard style={{borderRadius: 35}} boxShadow loading={loaddingHot}>
            <LightText text={'热门'}></LightText>
             <DIYCard hotData={hotData}></DIYCard>
          </ProCard>
        </div>
        <div className='div3'>
          <People></People>
          <div className={styles.NavSelect}>
            <ProCard style={{borderRadius: 35,height: '100%'}} boxShadow >
              <div className={styles.content}>
                <LightText text={'导航栏'} size></LightText>
                <div className={styles.rightSelect}>
                  <Radio.Group defaultValue="articleModel" onChange={searchList}>
                    <Radio.Button value="articleModel">动态</Radio.Button>
                    <Radio.Button value="achievementModel">成果</Radio.Button>
                    <Radio.Button value="resourceModel">资源</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </ProCard>
          </div>
        </div>
      </div>
      <div className={styles.listNav}>
        {/* <Collapse*/}
        {/*    bordered={false}*/}
        {/*    defaultActiveKey={['1']}*/}
        {/*    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}*/}
        {/*    style={{ background: token.colorBgContainer }}*/}
        {/*    items={getItems(panelStyle)}*/}
        {/* />*/}
      </div>
      <div className={styles.arContent} ref={arContentRef}>
        {loaddingAll ? (
            <div style={{display: 'flex',justifyContent: 'center',width: '100%'}}>
              <Spin />
            </div>
        ) : (
              <>
                {data?.data?.list?.map((item: API.ARTICLEMANAGEMENT) => (

                    <div className='grid-item'>
                      {curType === 'articleModel' ? <CardArticle dataArt={item} ></CardArticle> : <CardResource dataArt={item} ></CardResource>}
                    </div>
                ))}
              </>
        )}
      </div>
      <div>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={data?.total}
          onChange={pagination.onChange}
          onShowSizeChange={pagination.onChange}
          showQuickJumper
          showSizeChanger
          style={{ marginTop: 16, textAlign: 'center' }}
      /></div>
    </PageContainer>
  )
}
export default CommunicationPlatform
