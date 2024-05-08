import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/parallax';
import 'swiper/css/pagination';

import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import { KeepAliveContext } from '@umijs/max';
import {useRequest} from 'ahooks';
import { message, Progress, ProgressProps, Space} from 'antd';
import {FC, useContext, useEffect, useRef} from 'react';
import { Pagination,Parallax } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import AvatarMy from '@/components/Avatar';
import {gotoDetail} from '@/pages/communication-platform/platform-square/utils';
import { updateStart} from '@/services/communication-platform/exchange';
import {formatResponse} from '@/utils';
import {IconFont} from '@/utils/const';

import styles from './index.less'

type swiperProps = {
  dataList: API.ARTICLEMANAGEMENT[]
}

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};
export const GoodSwiper:FC<swiperProps> = ({dataList,refreshAction}) => {

  const prevRef = useRef(null)
  const nestRef = useRef(null)

  const swiperRef = useRef(null)
  const { refreshTab } = useContext(KeepAliveContext);



  const { runAsync: fetchUpdateStart } = useRequest(
    async (pamars) => formatResponse(await updateStart(pamars)), {
      manual: true,
      debounceWait: 300,
    })

  const PrimaryColor = useEmotionCss(({ token }) => {
    return { background: token.colorPrimaryBg };
  });

  useEffect(() => {
    console.log(swiperRef.current)
  }, []);

  function addChange(e,record:any) {
    const select = e.target?.getElementsByTagName('span')[0]?.className?.includes('is-active')
    fetchUpdateStart(select ? {ac_id: record?.Start[0]?.start_id} : {
      type: 'article_id',
      type_id: record.article_id,
    }).then((res) => {
      if(res.success) {
        e.target?.getElementsByTagName('span')[0]?.classList.toggle('is-active')
        message.success('操作成功')
        refreshAction()
      } else {
        message.warning('操作失败')

      }
    })

  }




  return (<>
    <div className={styles.wrapper}>

      <div className={styles.content} >
        <div className={styles.bgShape}>
           <img src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405214/starwars/logo.webp" alt=""/>
        </div>
        <div className={styles['product-slider']}>
          <button className={`prev ${PrimaryColor}`} ref={prevRef} onClick={() => swiperRef.current?.slidePrev()} >
            <span className="icon">
              <ArrowLeftOutlined />
            </span>
          </button>
          <button className={`next ${PrimaryColor}`} ref={nestRef} onClick={() => swiperRef.current?.slideNext()}>
            <span className="icon">
              <ArrowRightOutlined />
            </span>
          </button>
          <Swiper
            modules={[Pagination,Parallax]}
            spaceBetween={30}
            effect='fade'
            loop
            navigation={{
              nextEl: '.next',
              prevEl: '.prev',
              disabledClass: 'disable',
            }}
            parallax
            pagination={{
              type: 'bullets',
              clickable: true,
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >

            {!dataList?.length ? null : (
              dataList?.map((item) => {
                return (
                  <SwiperSlide>
                    <div className={styles['product-slider__card']} style={{backgroundImage: `url('${item.postlink}')`}}>
                      <div className={styles.user_head}>
                        <div style={{width: '100px'}} data-swiper-parallax-y="100">
                          <AvatarMy url={item?.userInfo?.avatar_url} isonline={item?.userInfo?.token?.data.length}></AvatarMy>
                          <div>{item?.userInfo?.cn_name}</div>
                        </div>
                      </div>
                      <div className={styles['product-slider__content']}>
                        <div className={styles['product-slider__title']} data-swiper-parallax-scale="0.15">
                          {item.title}
                        </div>
                        <div className={styles['product-slider__price']} data-swiper-parallax="-100">
                          <IconFont type='icon-biaoqian'/>
                          {item?.tagList ?? '-'}
                        </div>
                        <div className={styles['product-ctr']} data-swiper-parallax="0" data-swiper-parallax-opacity="0.1">
                          <div className={styles['product-labels']}>
                            <div className={styles['product-labels__group']}>
                              <Space>
                                <IconFont type='icon-liulan'/>{item?.readnumber}
                              </Space>

                            </div>
                          </div>
                          <div className={styles['hr-vertical']}></div>
                          <div className={styles['product-inf']} data-swiper-parallax="100">
                            <Progress size='small' type="circle" percent={90} strokeColor={twoColors} />
                          </div>
                        </div>

                        <div className={styles['product-slider__bottom']}>
                          <button className={styles['product-slider__cart']} data-swiper-parallax-y="-100" onClick={() => {
                            gotoDetail({
                              id: item.article_id ?? '',
                              type: 'articleModel',
                            })
                            refreshTab(location.pathname)
                          } }>
                            瞧一瞧
                          </button>

                          <button data-swiper-parallax="100" className="product-slider__fav js-fav" onClick={(e) => addChange(e,item)}><span className={`heart ${item?.Start?.length ? 'is-active' : ''}`}></span> {item?.Start?.length ? '已喜欢' : '添加到喜欢'}</button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            )}
            {/* <SwiperSlide>*/}
            {/*  <div className={styles['product-slider__card']}>*/}
            {/*    <div className={styles.user_head}></div>*/}
            {/*    <div className={styles['product-slider__content']}>*/}
            {/*      <div className={styles['product-slider__title']} data-swiper-parallax-scale="0.15">*/}
            {/*        .jsdhfksdjfhksjdhfkjsdhfk123123jsdhfksdjfhksjdhfkjsdhfk123123jsdhfksdjfhksjdhfkjsdhfk123123jsdhfksdjfhksjdhfkjsdhfk123123*/}
            {/*      </div>*/}
            {/*      <div className={styles['product-slider__price']} data-swiper-parallax="-100">*/}
            {/*        java*/}
            {/*      </div>*/}
            {/*      <div className={styles['product-ctr']} data-swiper-parallax="0" data-swiper-parallax-opacity="0.1">*/}
            {/*        <div className={styles['product-labels']}>*/}
            {/*          <div className={styles['product-labels__group']}>123</div>*/}
            {/*        </div>*/}
            {/*        <div className={styles['hr-vertical']}></div>*/}
            {/*        <div className={styles['product-inf']}>123</div>*/}
            {/*      </div>*/}

            {/*      <div className={styles['product-slider__bottom']}>*/}
            {/*        <button className={styles['product-slider__cart']} data-swiper-parallax-y="-100">*/}
            {/*          ADD TO CART*/}
            {/*        </button>*/}

            {/*        <button data-swiper-parallax="100" className="product-slider__fav js-fav" onClick={(e) => addChange(e)}><span className="heart"></span> ADD TO WISHLIST</button>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/* </SwiperSlide>*/}
            <div className="swiper-pagination" ></div>
          </Swiper>
        </div>

      </div>
    </div>
  </>)
}
