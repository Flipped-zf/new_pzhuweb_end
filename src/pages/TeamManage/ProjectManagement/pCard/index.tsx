import {
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Avatar, Badge, Button, Dropdown, MenuProps, message, Progress, Space, Tooltip} from 'antd';
import {get} from 'lodash-es';
import moment from 'moment';
// import gsap from 'gsap'
// import { Flip } from 'gsap/Flip';
import React, {FC, useEffect, useRef} from 'react';

import {deleteProject} from '@/services/team/project';
import {findKey, formatPathName} from '@/utils';
import {ROUTES} from '@/utils/enums';
import permissions from '@/utils/permission';
import {Access, useAccess} from '@@/exports';

import styles from './index.less'

const colorMap = [
  ['#dbf6fd','#096c86'], // 进行中
  ['#c8f7dc','#34c471'], // 完成
  ['#fee4cb','#ff942e'], // 延期
  ['#ffd3e2','#df3670'], // 已关闭
  ['#e9e7fd','#4f3ff0'], // 未开始
  ['#d5deff','#4067f9'],
]

type PCardProps = {
  layout: boolean,
  data: any,
  op: any[],
}

// gsap.registerPlugin(Flip);

const PCard:FC<PCardProps> = ({layout,data,op = [],refrash,editData,doingProject,showDoList}) => {
  const domRef = useRef(null)
  const domState = useRef({})
  const colos = colorMap[data?.status]
  const access = useAccess();
  const formatPerfix = formatPathName(ROUTES.PROJECTMANAGEMENT)

  useEffect(() => {
    // domState.current = Flip.getState(domRef.current)
  }, []);


  useEffect(() => {
    // Flip.from(domState.current, {
    //   duration: 1,
    //   ease: 'power1.inOut',
    //   absolute: true,
    //   scale: true,
    // });
  }, [layout]);

    return (
        <>
          <div ref={domRef} className={ `${styles.PCard} ${layout ? styles.PCard2 : ''}`} style={{backgroundColor: colos[0]}}>

            <div className={styles.action}>
              <Space>
                <Access
                  accessible={access.operationPermission(get(permissions,formatPerfix + '.delete', ''))}
                  fallback={null}>
                  <DeleteOutlined onClick={() => {
                    deleteProject(data?.project_id).then((res) => {
                      if (res && res.code === 200) {
                        message.success('删除成功')
                        refrash()
                      }
                    })
                  }}/>
                </Access>
                <Access
                  accessible={access.operationPermission(get(permissions,formatPerfix + '.delete', ''))}
                  fallback={null}>
                  <EditOutlined onClick={() => {
                    editData(data)
                  }}/>
                </Access>
              </Space>
            </div>
            <div className={ `${styles.left} ${layout ? styles.left2 : ''}`}>
              <div>
                <Tooltip placement="top" title={data?.name} >
                  <p className={styles.header} onClick={() => {
                    doingProject(data)
                  }}>
                    {data?.name}
                    </p>
                  <p className={styles.subHeader}> <Space><Badge status={op?.find((i) => i.value === data?.status)?.show_status?.toLowerCase()} /><span>{
                    findKey(op,data?.status)
                  }</span></Space></p>
                </Tooltip>
              </div>
              <span>{
                moment(data?.created_time).format('YYYY MMMM Do h:mm')
              }</span>
            </div>
            <div className={styles.center} onClick={() => {
              showDoList(data)
            }}>
              <span>Progress</span>
              <Progress percent={data?.plan} strokeColor={colos[1]}/>
            </div>
            <div className={`${styles.right} ${layout ? styles.right2 : ''}`}>
              <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {
                  data?.users?.length ? (
                      data?.users?.map((item) => {
                        return (
                            <Avatar src={item.avatar_url} />
                        )
                      })
                  ) : (
                      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  )
                }
                {/* <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />*/}
                {/* <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>*/}
                {/* <Tooltip title="Ant User" placement="top">*/}
                {/*  <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />*/}
                {/* </Tooltip>*/}
                {/* <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />*/}
              </Avatar.Group>
              <div className={styles.lastTime} style={{color: colos[1]}}>
                {
                  data?.status === '4' ? moment().to(data?.start_date,true) + '开始' : moment().to(data?.end_date) + '结束'
                }
              </div>
            </div>
          </div>
        </>
    )
}

export default PCard
