import 'react-js-cron/dist/styles.css'

import {Input, Space} from 'antd';
import {FC} from 'react';
import { Cron } from 'react-js-cron'

type Props ={
    value?: string;
    onChange?: (url?: string) => void;
}

const CornItem : FC<Props> = ({ value,
                           onChange}) => {


    return (
       <div >
           <Space>
               <Input value={value}></Input>
               <Cron
                   value={value}
                   setValue={(newValue: string) => {
                       onChange?.(newValue);
                   }}
               />
           </Space>
       </div>
    )
}

export default CornItem
