import 'swiper/css';
import 'swiper/css/parallax';

import {EyeOutlined, HeartOutlined} from '@ant-design/icons';
import {FC, useEffect, useRef, useState} from 'react';
import { Parallax} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {gotoDetail} from '@/pages/communication-platform/platform-square/utils';
import {FormatTime, OverNumShow} from '@/utils';
import {IconFont} from '@/utils/const';

import styles from './index.less'


type dataList = {
  article: API.ARTICLEMANAGEMENT[],
  achievement: API.ACHIEVEMENTMANAGEMENT[],
  resource: API.RESOURCEMANAGEMENT[]
}

type propsType = {
  hotData: dataList
}

export const DIYCard:FC<propsType> = ({hotData}) => {
  const swiperRef = useRef(null)
  const [curNum,setCurnum] = useState(0)

  const {article,achievement,resource} = hotData

  useEffect(() => {
    swiperRef.current.slideTo(curNum, 1000, false);
  }, [curNum]);

  return (<>
      <div className={styles.DIYCard}>
        <nav className="navigation">
          {/* active*/}
          <a className={`navigation-item ${curNum === 0 ? 'active' : ''}`} onClick={() => setCurnum(0)}>成果</a>
          <a className={`navigation-item ${curNum === 1 ? 'active' : ''}`}onClick={() => setCurnum(1)}>资源</a>
          <a className={`navigation-item ${curNum === 2 ? 'active' : ''}`} onClick={() => setCurnum(2)}>文章</a>
        </nav>
        <Swiper
            modules={[Parallax]}
            spaceBetween={30}
            effect='fade'
            loop
            parallax
            onSlideChange={(swiper) => {
              setCurnum(swiper.activeIndex)
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
        >
          <SwiperSlide>  {achievement?.length ? (
              <>
                <section className="playlists">
                  <article data-swiper-parallax="50" data-swiper-parallax-opacity="0.1" className="card">
                    <div className="card-inner">
                      <span className="card-pin"></span>
                      <div className="card-image">
                        <img src={achievement[0]?.posterlink ?? ''} />
                      </div>
                      <div className="card-content">
                        <div className="card-meta">
                          <span className="card-meta-number">{FormatTime(achievement[0]?.created_time ?? '')}</span>
                          <div className='icons_DIY'>
                            <li>
                              {/* <span className='numbers'>12</span>*/}
                              <span className='nums_DIY'>{ OverNumShow(achievement[0]?.startCount)}</span>
                              <HeartOutlined />
                            </li>
                            <li>
                              <span className='nums_DIY'>{ OverNumShow(achievement[0]?.readnumber)}</span>
                              <EyeOutlined />
                            </li>
                          </div>
                        </div>
                        <h2 className="card-title textLine2" onClick={() => gotoDetail({
                          id: achievement[0].achievement_id ?? '',
                          type: 'achievementModel',
                        })}>{achievement[0]?.title}</h2>
                      </div>
                    </div>
                  </article>

                  <article data-swiper-parallax-y="50" data-swiper-parallax-opacity="0.1" className="card">
                    <div className="card-inner">
                      <span className="card-pin"></span>
                      <div className="card-image">
                        <img src={achievement[1]?.posterlink ?? ''} />
                      </div>
                      <div className="card-content">
                        <div className="card-meta">
                          <span className="card-meta-number">{FormatTime(achievement[1]?.created_time ?? '')}</span>
                          <div className='icons_DIY'>
                            <li>
                              {/* <span className='numbers'>12</span>*/}
                              <span className='nums_DIY'>{OverNumShow(achievement[1]?.startCount) }</span>
                              <HeartOutlined />
                            </li>
                            <li>
                              <span className='nums_DIY'>{ OverNumShow(achievement[1]?.readnumber)}</span>
                              <EyeOutlined />
                            </li>
                          </div>
                        </div>
                        <h2 className="card-title textLine2" onClick={() => gotoDetail({
                          id: achievement[1].achievement_id ?? '',
                          type: 'achievementModel',
                        })}>{achievement[1]?.title}</h2>
                      </div>
                    </div>
                  </article>
                </section>
                <section data-swiper-parallax="-50" className="currently-playing">

                  <article className="card horizontal">
                    <div className="card-inner">
                      <span className="card-pin simple"></span>
                      <div className="card-image">
                        <img src={achievement[2]?.posterlink ?? ''} />
                      </div>
                      <div className="card-content">
                        <div className="card-meta">
                          <span className="card-meta-artist">{FormatTime(achievement[2]?.created_time ?? '')}</span>
                          <button className="card-meta-button" style={{opacity: 0}}>
                            <i className="ai-circle-triangle-right-fill"></i>
                          </button>
                        </div>
                        <h2 className="card-title textLine2" onClick={() => gotoDetail({
                          id: achievement[2].achievement_id ?? '',
                          type: 'achievementModel',
                        })}>{achievement[2]?.title}
                          <span className="card-time">
                            <div className='icons_DIY_show'>
                              <li>
                                <span>{ OverNumShow(achievement[2]?.startCount)}</span>
                                <HeartOutlined />
                              </li>
                              <li>
                                 <span>{OverNumShow(achievement[2]?.readnumber) }</span>
                                <EyeOutlined />
                              </li>
                            </div>
                          </span>
                        </h2>
                      </div>
                      <span className="card-pin simple"></span>
                    </div>
                  </article>
                </section>
              </>
          ) : null}      </SwiperSlide>
          <SwiperSlide>
            {
              resource?.length ? (
                  <>
                    <section className="playlists">
                      <article className="card" data-swiper-parallax="50" data-swiper-parallax-opacity="0.1">
                        <div className="card-inner">
                          <span className="card-pin"></span>
                          <div className="card-image">
                            <img src={resource[0]?.posterlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-number">{FormatTime(resource[0]?.created_time ?? '')}</span>
                              <div className='icons_DIY'>
                                <li>
                                  {/* <span className='numbers'>12</span>*/}
                                  <span className='nums_DIY'>{OverNumShow(resource[0]?.startCount)}</span>
                                  <HeartOutlined />
                                </li>
                                <li>
                                  <span className='nums_DIY'>{OverNumShow(resource[0]?.readnumber)}</span>
                                  <EyeOutlined />
                                </li>
                              </div>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: resource[0].resource_id ?? '',
                              type: 'resourceModel',
                            })}>{resource[0]?.title}</h2>
                          </div>
                        </div>
                      </article>

                      <article className="card" data-swiper-parallax-y="50" data-swiper-parallax-opacity="0.1">
                        <div className="card-inner">
                          <span className="card-pin"></span>
                          <div className="card-image">
                            <img src={resource[1]?.posterlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-number">{FormatTime(resource[1]?.created_time ?? '')}</span>
                              <div className='icons_DIY'>
                                <li>
                                  {/* <span className='numbers'>12</span>*/}
                                  <span className='nums_DIY'>{OverNumShow(resource[1]?.startCount)}</span>
                                  <HeartOutlined />
                                </li>
                                <li>
                                  <span className='nums_DIY'>{OverNumShow(resource[1]?.readnumber)}</span>
                                  <EyeOutlined />
                                </li>
                              </div>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: resource[1].resource_id ?? '',
                              type: 'resourceModel',
                            })}>{resource[1]?.title}</h2>
                          </div>
                        </div>
                      </article>
                    </section>
                    <section className="currently-playing" data-swiper-parallax="-50">

                      <article className="card horizontal">
                        <div className="card-inner">
                          <span className="card-pin simple"></span>
                          <div className="card-image">
                            <img src={resource[2]?.posterlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-artist">{FormatTime(resource[2]?.created_time ?? '')}</span>
                              <button className="card-meta-button" style={{opacity: 0}}>
                                <i className="ai-circle-triangle-right-fill"></i>
                              </button>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: resource[2].resource_id ?? '',
                              type: 'resourceModel',
                            })}>{resource[2]?.title}
                              <span className="card-time">
                                <div className='icons_DIY_show'>
                              <li>
                                <span>{OverNumShow(resource[2]?.startCount) }</span>
                                <HeartOutlined />
                              </li>
                              <li>
                                 <span>{OverNumShow(resource[2]?.readnumber) }</span>
                                <EyeOutlined />
                              </li>
                            </div>
                              </span>
                            </h2>
                          </div>
                          <span className="card-pin simple"></span>
                        </div>
                      </article>
                    </section>
                  </>
              ) : null
            }
          </SwiperSlide>
          <SwiperSlide>
            {
              article?.length ? (
                  <>
                    <section className="playlists">
                      <article data-swiper-parallax="50" data-swiper-parallax-opacity="0.1" className="card">
                        <div className="card-inner">
                          <span className="card-pin"></span>
                          <div className="card-image">
                            <img src={article[0]?.postlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-number">{FormatTime(article[0]?.created_time ?? '')}</span>
                              <div className='icons_DIY'>
                                <li>
                                  {/* <span className='numbers'>12</span>*/}
                                  <span className='nums_DIY'>{OverNumShow(article[0]?.startCount)}</span>
                                  <HeartOutlined />
                                </li>
                                <li>
                                  <span className='nums_DIY'>{OverNumShow(article[0]?.readnumber)}</span>
                                  <EyeOutlined />
                                </li>
                              </div>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: article[0].article_id ?? '',
                              type: 'articleModel',
                            })}>{article[0]?.title}</h2>
                          </div>
                        </div>
                      </article>

                      <article data-swiper-parallax-y="50" data-swiper-parallax-opacity="0.1" className="card">
                        <div className="card-inner">
                          <span className="card-pin"></span>
                          <div className="card-image">
                            <img src={article[1]?.postlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-number">{FormatTime(article[1]?.created_time ?? '')}</span>
                              <div className='icons_DIY'>
                                <li>
                                  {/* <span className='numbers'>12</span>*/}
                                  <span className='nums_DIY'>{OverNumShow(article[1]?.startCount) }</span>
                                  <HeartOutlined />
                                </li>
                                <li>
                                  <span className='nums_DIY'>{OverNumShow(article[1]?.readnumber)}</span>
                                  <EyeOutlined />
                                </li>
                              </div>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: article[1].article_id ?? '',
                              type: 'articleModel',
                            })}>{article[1]?.title}</h2>
                          </div>
                        </div>
                      </article>
                    </section>
                    <section data-swiper-parallax="-50" className="currently-playing">

                      <article className="card horizontal">
                        <div className="card-inner">
                          <span className="card-pin simple"></span>
                          <div className="card-image">
                            <img src={article[2]?.postlink ?? ''} />
                          </div>
                          <div className="card-content">
                            <div className="card-meta">
                              <span className="card-meta-artist">{FormatTime(article[2]?.created_time ?? '')}</span>
                              <button className="card-meta-button" style={{opacity: 0}}>
                                <i className="ai-circle-triangle-right-fill"></i>
                              </button>
                            </div>
                            <h2 className="card-title textLine2" onClick={() => gotoDetail({
                              id: article[2].article_id ?? '',
                              type: 'articleModel',
                            })}>{article[2]?.title}
                              <span className="card-time">
                                <div className='icons_DIY_show'>
                              <li>
                                <span>{OverNumShow(article[2]?.startCount) }</span>
                                <HeartOutlined />
                              </li>
                              <li>
                                 <span>{OverNumShow(article[2]?.readnumber) }</span>
                                <EyeOutlined />
                              </li>
                            </div>
                              </span>
                            </h2>
                          </div>
                          <span className="card-pin simple"></span>
                        </div>
                      </article>
                    </section>
                  </>
              ) : null
            }
          </SwiperSlide>
        </Swiper>

      </div>
    </>)
}
