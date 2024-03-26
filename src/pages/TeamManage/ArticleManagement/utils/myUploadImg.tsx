import {PictureOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import {RcFile, UploadChangeParam, UploadFile, UploadProps} from 'antd/es/upload';
import {get} from 'lodash-es';

import {getLocalStorageItem} from '@/utils';
import {INTERNATION, LOCAL_STORAGE} from '@/utils/enums';
import {useIntl} from '@@/exports';

const maxSize = 5




const MyUpload = function({onloading,onScuess}) {
    const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
    const { formatMessage } = useIntl();

    const beforeUpload = (file: RcFile) => {

        // 图片大小限制
        const isLtSize = file.size / 1024 / 1024 < maxSize;

        if (!isLtSize) {
            message.error(formatMessage({ id: `${INTERNATION.UPLOADIMAGE}.maxSize` }, { size: maxSize }));
            return Upload.LIST_IGNORE
        }

        return isLtSize;
    }
    const onChangeUpload: UploadProps['onChange'] = ({ file, fileList }: UploadChangeParam<UploadFile>) => {
        // 移除图片清空值
        if (file.status === 'removed') {
        } else {
            // 上传中
            if (file.status === 'uploading') {
            }
            // 上传完成
            if (file.status === 'done') {
                // 获取当前上传图片路径
                const path: string = get(file, 'response.data.path')
                onScuess(path)
            }
        }
    };

    const props = {
        action: '/api/upload/single-file',
        // 请求头添加token
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        // 上传前校验
        beforeUpload,
        // 上传图片回调
        onChange: onChangeUpload,
    }
    return (
        <Upload
            accept="image/*"
            showUploadList={false}
            {...props}

        >
            <button type="button" className="control-item button upload-button" data-title="插入图片">
                <PictureOutlined />
            </button>
        </Upload>
    )
}


const uploadFun = (onloading,onScuess) => {
    return {
        key: 'antd-uploader',
        type: 'component',
        component: (
            <MyUpload onloading={onloading} onScuess={onScuess}></MyUpload>
        ),
    }
}

function buildPreviewHtml(value) {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${value}</div>
        </body>
      </html>
    `

}
const preview = (value) => {

    if (window.previewWindow) {
        window.previewWindow.close()
    }

    window.previewWindow = window.open()
    window.previewWindow.document.write(buildPreviewHtml(value))
    window.previewWindow.document.close()

}




const myveiw = (value) => {
    return {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: () => preview(value),
    }
}

export {uploadFun,myveiw}
