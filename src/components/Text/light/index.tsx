
import {FC} from 'react';

import styles from './index.less'


type TextProps = {
  text: string,
  size?: boolean
}

export const LightText:FC<TextProps> = ({text,size = false}) => {
  return (<>
    <hgroup className={styles['text-magic']} data-word={text} style={{fontSize: size ? 20 : ''}}>
      {text}
      <div className={styles['white']}></div>
    </hgroup>
  </>)
}
