import { StatisticCard } from '@ant-design/pro-components';
import { Col, Divider, Row, Space } from 'antd';
import type { FC } from 'react';

import BulletChart from './BulletChart'; // 进度图
import TinyAreaChart from './TinyAreaChart'; // 迷你面积图
import TinyColumnChart from './TinyColumnChart'; // 迷你柱形图

const { Statistic } = StatisticCard;

const StatisticChart: FC = () => {
  return (
    <Row gutter={20}>
      <Col span={6}>
        <StatisticCard
          title="成员指标"
          tip="指标说明"
          style={{ height: 200 }}
          statistic={{
            value: 123,
            precision: 2,
            description: (
              <Space>
                <Statistic title="日同比" value="6.47%" trend="up" />
                <Statistic title="周同比" value="23.58%" trend="down" />
              </Space>
            ),
          }}
        >
          <Divider type="horizontal" />
          <Statistic value="88.98%" title="前年同期完成率" />
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="访问量"
          tip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: 156 }}
          chart={<TinyAreaChart />}
        >
          <Statistic value="56.12%" title="日访问量占比" />
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="文章发布数量"
          tip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: 23 }}
          chart={<TinyColumnChart />}
        >
          <Statistic value="78.82%" title="转化率" />
        </StatisticCard>
      </Col>
      <Col span={6}>
        <StatisticCard
          title="任务"
          tip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: 12, suffix: '%' }}
          chart={<BulletChart />}
        >
          <Space>
            <Statistic title="日同比" value="12.25%" trend="up" />
            <Statistic title="周同比" value="56.35%" trend="down" />
          </Space>
        </StatisticCard>
      </Col>
    </Row>
  );
};
export default StatisticChart;
