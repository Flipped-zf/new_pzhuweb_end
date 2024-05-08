import {FC} from 'react';

import styles from './index.less'

type TextProps = {
  text: string
}

export const TextMalfunction:FC<TextProps> = ({text = 'CSSTextMagic'}) => {
  return (<>

    <div className={styles.textMagic} data-word={text}>
      <div className={styles.white}></div>
    </div>
  </>)
}
