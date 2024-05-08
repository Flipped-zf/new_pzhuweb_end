import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { useFullscreen } from 'ahooks';
import { Tooltip } from 'antd';
import type { FC } from 'react';

import { INTERNATION } from '@/utils/enums';

const FullScreen: FC = () => {
  // 多语言函数
  const { formatMessage } = useIntl();
  const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(() => document.body);
  return (
    <>
      {isFullscreen ? (
        <Tooltip title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.ExitFullScreen` })}>
          <FullscreenExitOutlined onClick={exitFullscreen} />
        </Tooltip>
      ) : (
        <Tooltip title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.FullScreen` })}>
          <FullscreenOutlined onClick={enterFullscreen} />
        </Tooltip>
      )}
    </>
  );
};

export default FullScreen;
