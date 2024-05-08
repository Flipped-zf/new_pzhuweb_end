import {message} from 'antd';

import {ROUTES} from '@/utils/enums';
import {dropByCacheKey, history} from '@@/exports';

export type gotoDetailProps = {
  id: string;
  type: string
}

export function gotoDetail({id,type}: gotoDetailProps) {
  // dropByCacheKey(ROUTES.PLATFORMDETAIL)
  history.push(`${ROUTES.PLATFORMDETAIL}?id=${id}&type=${type}`)
}

export function copyCurrentURL() {
  // 创建一个临时的textarea元素
  const tempTextarea = document.createElement('textarea');
  // 设置textarea的value为当前网址
  tempTextarea.value = window.location.href;

  // 将textarea添加到DOM中
  document.body.appendChild(tempTextarea);

  // 选中textarea中的文本
  tempTextarea.select();

  // 复制选中的文本
  document.execCommand('copy');

  // 移除临时的textarea元素
  document.body.removeChild(tempTextarea);

  // 提示用户复制成功
  message.success('链接复制成功')
}
