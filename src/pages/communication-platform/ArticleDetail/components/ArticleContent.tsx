import {Divider} from 'antd';
import {FC} from 'react';

import styles from './ArticleContent.less'

type ArticleContentProps = {
    title: string,
    describe: string,
    context: string
}

const ArticleContent:FC<ArticleContentProps> = ({title,describe,context}) => {
  return (
    <>
      <div className={styles.ArticleContent}>
        <h1>{title}</h1>
          <p>
              {describe}
          </p>
          <Divider orientation="right" plain>
              正文
          </Divider>
          <div dangerouslySetInnerHTML={{
              __html: context,
          }} />
      </div>
    </>
  )
}
export default ArticleContent
