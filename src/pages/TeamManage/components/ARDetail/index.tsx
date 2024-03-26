
import {FC, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

import ARCAard from '@/pages/TeamManage/components/ARDetail/ARCAard';
import {getDetail} from '@/services/team/achievement';
import {getDetailResource} from '@/services/team/resource';

const ARDetail:FC = ({isOpen,closeModale,aid,rid}) => {

  const [content, setContent] = useState(new Date().toString())
  const [dialogVisible, setDialogVisible] = useState(false)

    const [container, setContainer] = useState(null);
  const [ADetail,setDetail] = useState({})
    useEffect(() => {
      if(aid) {
          getDetail(aid).then((res) => {
            if(res?.code === 200) {
              setDetail(res.data)
            }
          })
      }else if(rid) {
          getDetailResource(rid).then((res) => {
              if(res?.code === 200) {
                  setDetail(res.data)
              }
          })
      } else {
          setDetail({})
      }

    }, [aid,rid]);


    useEffect(() => {
        // 创建一个新的 div 元素
        const newContainer = document.createElement('div');
        // 将新的 div 元素添加到 body 节点上
        document.body.appendChild(newContainer);
        // 设置状态
        setContainer(newContainer);
        // 组件卸载时，从 body 节点上移除 div 元素
        return () => {
            document.body.removeChild(newContainer);
        };
    }, []);

    useEffect(() => {
        setContent(new Date().toString())
        setDialogVisible(isOpen)
        console.log(isOpen)
    }, [isOpen]);

  return (<>
    <div>
      {container && createPortal(
          <ARCAard
              visible={dialogVisible}
              content={content}
              close={() => {
                  closeModale()
              }}
              ADetail={ADetail}
          >
              {content}
          </ARCAard>,
          container ,
      )}

    </div>
  </>)
}

export default ARDetail
