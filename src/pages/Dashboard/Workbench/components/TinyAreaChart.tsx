import { TinyArea } from '@ant-design/charts';
import { FC } from 'react';

const TinyAreaChart: FC = () => {
  const data = [
    26, 41, 43, 88, 30, 39, 55, 57, 56, 43, 52, 59, 49, 46, 51, 54, 98, 34, 53, 24, 22, 19,
  ];
  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };
  return <TinyArea {...config} />;
};
export default TinyAreaChart;
