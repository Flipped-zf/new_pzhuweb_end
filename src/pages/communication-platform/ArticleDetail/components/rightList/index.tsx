import {FireOutlined, HeartOutlined, LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {useRequest} from 'ahooks';
import { Avatar, List, Space } from 'antd';
import React, {useEffect, useState} from 'react';

import {getTopList} from '@/services/communication-platform/exchange';
import {formatResponse, ShowTagList, useDictCodeAsync} from '@/utils';

const data = Array.from({ length: 2 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const App: React.FC = () => {
    const [curType,setCurType] = useState('articleModel')


    const { loading,runAsync: fetchGetTopListt } = useRequest(
        async () => formatResponse(await getTopList()), {
            manual: true,
        })
    async function init() {
        const {ARTICLE_KILL_TYPE,ARTICLE_TYPE} = await useDictCodeAsync(['ARTICLE_KILL_TYPE','ARTICLE_TYPE'])
        fetchGetTopListt().then((res) => {
            if (res.success) {
                res.data?.forEach((item) => {
                    item.tagList = ShowTagList([ARTICLE_KILL_TYPE,ARTICLE_TYPE],[item?.technology_id,item?.menu_id],[item?.keywords]).join('、')
                })
                setCurType(res.data?.slice(0,2).map((item) => {
                  return {
                      href: 'https://ant.design',
                      title: item.title,
                      avatar: item?.userInfo?.avatar_url,
                      description:
                          item.tagList,
                      content:
                          item.describe,
                      startCount:item?.startCount,
                      readnumber: item?.readnumber,
                      commentCount: item?.commentCount,
                      postlink: item?.postlink,
                  }
                }))
            }
        })
    }

    useEffect(() => {
        init()
    }, []);

  return(
        <List
            itemLayout="vertical"
            size="small"
            pagination={false}
            dataSource={curType ?? []}
            grid={{
                column: 1,
            }}
            renderItem={(item) => (
                <List.Item
                    key={item.title}

                    actions={[
                        <IconText icon={HeartOutlined} text={item?.startCount} key="list-vertical-star-o" />,
                        <IconText icon={FireOutlined} text={item?.readnumber} key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text={item?.commentCount} key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item?.postlink}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    );
}

export default App;
