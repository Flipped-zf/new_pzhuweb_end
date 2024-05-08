import { TinyColumn } from '@ant-design/charts';
import { FC } from 'react';

const TinyColumnChart: FC = () => {
  const data = [2, 3, 8, 4, 6, 2, 2];
  const config = {
    height: 60,
    autoFit: false,
    data,
  };
  return <TinyColumn {...config} />;
};
export default TinyColumnChart;
