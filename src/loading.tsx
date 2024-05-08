import { Spin } from 'antd';
import { FC } from 'react';

const ComponentLoading: FC = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: 30, overflow: 'hidden' }}>
      <Spin />
    </div>
  );
};
export default ComponentLoading;
