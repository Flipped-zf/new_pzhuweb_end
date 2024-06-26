import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

import styles from './index.module.less';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} tommy by http://39.99.145.229/aboutme/`}
      className={styles['global-footer']}
      links={[
        {
          key: 'team',
          title: 'WEB应用专业团队',
          href: 'http://www.pzhuweb.cn/#/home',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Flipped-zf',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
