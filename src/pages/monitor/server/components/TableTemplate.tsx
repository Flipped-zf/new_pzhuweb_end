import {ProCard} from '@ant-design/pro-components';
import {Descriptions, Progress, Table} from 'antd';
import {FC, useEffect, useState} from 'react';

import {getServer} from '@/services/monitor';

const TableTemplate:FC = () => {
  const [data,setData] = useState({})

  useEffect(() => {
    getServer().then((res) => {
      if(res?.code === 200) {
        setData(res.data)
      }
    })
  }, []);

  const columns = [
    {
      title: '盘符路径',
      dataIndex: 'dirName',
      key: 'dirName',
    },
    {
      title: '文件系统',
      dataIndex: 'sysTypeName',
      key: 'sysTypeName',
    },
    {
      title: '盘符类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '总大小',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '可用大小',
      dataIndex: 'free',
      key: 'free',
    },
    {
      title: '已用大小',
      dataIndex: 'used',
      key: 'used',
    },
    {
      title: '已用百分比',
      dataIndex: 'usage',
      key: 'usage',
      render:(_,record) => {
        return (
            <Progress percent={record?.usage} />
        )
      },
    },
  ]


  return (<>
    <ProCard style={{ marginBlockStart: 8 }} ghost gutter={{
      xs: 8,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 8,
      xxl: 8,
    }}>
      <ProCard title="CPU" layout="center" bordered colSpan={12}>
        <Descriptions
          size='default'

        >
          <Descriptions.Item label='核心数' span={1}>
            {data?.cpu?.cpuNum ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label='用户使用率' span={2}>
            {data?.cpu?.used ? <Progress percent={data?.cpu?.used} /> : '-'}

          </Descriptions.Item>
          <Descriptions.Item label='系统使用率' span={1}>
            {data?.cpu?.sys ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label='当前空闲率' span={2} labelStyle={{display: 'flex',alignItems: 'center'}}>
            {data?.cpu?.free ? <Progress type="circle" percent={data?.cpu?.free} size="small" /> : '-'}
          </Descriptions.Item>
        </Descriptions>
      </ProCard>
      <ProCard title="内存" layout="center" bordered colSpan={12}>
        <Descriptions
          size='default'
        >
          <Descriptions.Item label='总内存' span={1}>
            {data?.mem?.total ?? '-'}
          </Descriptions.Item>
          <Descriptions.Item label='已用内存' span={2}>
            {data?.mem?.used ? <Progress percent={data?.mem?.used} /> : '-'}

          </Descriptions.Item>
          <Descriptions.Item label='剩余内存' span={1}>
            {data?.mem?.free ?? '-'}

          </Descriptions.Item>
          <Descriptions.Item label='使用率' span={2}>
            {data?.mem?.usage ? <Progress percent={data?.mem?.usage} /> : '-'}

          </Descriptions.Item>
        </Descriptions>
      </ProCard>
    </ProCard>

    <ProCard layout="center" title="服务器信息" style={{ marginBlockStart: 8 }}>
      <Descriptions
        size='default'
      >
        <Descriptions.Item label='服务器名称' span={2}>
          {data?.sys?.computerName ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='操作系统' span={2}>
          {data?.sys?.osName ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='服务器IP' span={2}>
          {data?.sys?.computerIp ?? '-'}
        </Descriptions.Item>
        <Descriptions.Item label='系统架构' span={2}>
          {data?.sys?.osArch ?? '-'}
        </Descriptions.Item>
      </Descriptions>

    </ProCard>
    <ProCard layout="center" title="Java虚拟机信息" style={{ marginBlockStart: 8 }}>
      <Descriptions
        size='default'
      >
        <Descriptions.Item label='Java名称' span={2}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='Java版本' span={2}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='启动时间' span={2}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='运行时长' span={2}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='安装路径' span={3}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='项目路径' span={3}>
          -
        </Descriptions.Item>
        <Descriptions.Item label='运行参数' span={3}>
          -
        </Descriptions.Item>
      </Descriptions>
    </ProCard>
    <ProCard layout="center" title="磁盘状态" style={{ marginBlockStart: 8 }}>
      <Table pagination={false} columns={columns} dataSource={data?.sysFiles} style={{width: '100%'}}/>
    </ProCard>
  </>)
}

export default TableTemplate
