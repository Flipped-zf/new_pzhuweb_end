import {notification} from 'antd';
import {useCallback, useEffect, useRef, useState} from 'react';
import {io} from 'socket.io-client';

import {BusinessEvents} from '@/models/constants/socket';
import {getLocalStorageItem} from '@/utils';
import {LOCAL_STORAGE} from '@/utils/enums';
import eventBus from '@/utils/eventBus';

export default function() {

  const [token,setToken] = useState(getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN))
  const ws = useRef<any | null>(null);
  useEffect(() => {
    if(token) {
      const socket = io(`${process.env.SOCKET_URL}/my?token=${token}`);
      ws.current = socket
      //
      // // client-side
      socket.on('connect', () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx

        socket.on(BusinessEvents.USER_KICK,(res) => {

          notification.info({
            message: '下线通知',
            description: `操作人, ${res?.operater}!`,
          })
          eventBus.emit(BusinessEvents.USER_KICK)
        })

        socket.on(BusinessEvents.COMMNT_MSG,(res) => {
          eventBus.emit(BusinessEvents.COMMNT_MSG, res)
          console.log('COMMNT_MSG', 123);

        })
        socket.on(BusinessEvents.DB_MSG,(res) => {
          eventBus.emit(BusinessEvents.COMMNT_MSG, res)
          console.log('DB_MSG', 123);

        })
        socket.on(BusinessEvents.AUTH_FAILED,(res) => console.log(res))
      });
      //
      socket.on('disconnect', () => {
        console.log(socket.id); // undefined
      });
    }else {
      ws.current?.close();
    }

    return () => {
      ws.current?.close();
    };
  },[token])

  const set_token = useCallback((r:string) => setToken(r), []);
  const remove_token = useCallback(() => setToken(''), []);


  return { set_token,remove_token };
};
