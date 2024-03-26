import {PlusOutlined} from '@ant-design/icons';
import {ProFormUploadButtonProps, ProFormUploadDragger, ProFormUploadDraggerProps} from '@ant-design/pro-components';
import {useBoolean} from 'ahooks';
import {App, Space, Spin, Typography, Upload} from 'antd';
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import ImgCrop, {ImgCropProps} from 'antd-img-crop';
import {get, last} from 'lodash-es';
import {FC, useEffect, useState} from 'react';

import {formatPerfix, getLocalStorageItem, isHttpLink} from '@/utils';
import {INTERNATION, LOCAL_STORAGE, ROUTES} from '@/utils/enums';
import {useIntl} from '@@/exports';
const { Text } = Typography;

type UploadImageProps = {
    value?: string;
    onChange?: (url?: string) => void;
    type?: 'upload' | 'dragger';
    maxSize?: number;
    imgCropProps?: ImgCropProps;
} & (ProFormUploadButtonProps | ProFormUploadDraggerProps)

const UploadMyFile: FC<UploadImageProps> = ({
                                              value,
                                              onChange,
                                              type = 'upload',
                                              maxSize = 5, // 图片大小，默认5m
                                              fieldProps,
                                              imgCropProps = {
                                                  rotationSlider: true,
                                                  cropShape: 'rect',
                                                  showGrid: true,
                                              },
                                              ...uploadProps
                                          }) => {

    const { formatMessage } = useIntl();
    // hooks 调用
    const { message } = App.useApp();

    const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)
    // 上传图片loading
    const [uploadLoading, { setTrue: setUploadLoadingTrue, setFalse: setUploadLoadingFalse }] = useBoolean(false)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const onChangeUpload: UploadProps['onChange'] = ({ file, fileList }: UploadChangeParam<UploadFile>) => {
        // 移除图片清空值
        if (file.status === 'removed') {
            onChange?.(undefined);
        } else {
            // 上传中
            if (file.status === 'uploading') {
                setUploadLoadingTrue()
            }
            // 上传完成
            if (file.status === 'done') {
                // 获取当前上传图片路径
                const path: string = get(file, 'response.data.path')
                setUploadLoadingFalse();
                onChange?.(path);
            }
        }
        setFileList(fileList)
    };
    const beforeUpload = (file: RcFile) => {

        // 图片大小限制
        const isLtSize = file.size / 1024 / 1024 < maxSize;

        if (!isLtSize) {
            message.error(formatMessage({ id: `${INTERNATION.UPLOADIMAGE}.maxSize` }, { size: maxSize }));
            return Upload.LIST_IGNORE
        }

        return isLtSize;
    }

    const commonProps = {
        ...uploadProps,

        fieldProps: {
            ...fieldProps,
            // 上传地址
            action: '/api/upload/single-file',
            // 请求头添加token
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            // 上传前校验
            beforeUpload,
            // 上传图片回调
            onChange: onChangeUpload,
            // 文件列表
            fileList,
        },
    }
    const renderUploadAvatar = () => (
        <Upload {...commonProps.fieldProps}>
            {
                !value && <Space direction="vertical">
                    {
                        uploadLoading ? <Spin /> : <>
                            <PlusOutlined />
                            <Text>上传封面</Text>
                        </>
                    }
                </Space>
            }
        </Upload>
    )
    useEffect(() => {
        if (value && isHttpLink(value)) {
            setFileList([{ url: value, uid: '-1', name: last(value?.split('/'),'') }])
        }
        if (!value) {
            setFileList([])
        }
    }, [value])
    return (<>
        {type === 'upload' ? (<ImgCrop {...imgCropProps}>
            {renderUploadAvatar()}
        </ImgCrop>) : <ProFormUploadDragger {...commonProps} />}
    </>)
}



export default UploadMyFile
