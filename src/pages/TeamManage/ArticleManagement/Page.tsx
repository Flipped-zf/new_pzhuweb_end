import 'braft-editor/dist/index.css'
import './utils/edit'

import {
    FooterToolbar,
    PageContainer,
    ProCard,
    ProForm, ProFormDigit,
    ProFormInstance, ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components'
import {dropByCacheKey,history,useLocation} from '@umijs/max';
import { Button, Col, Form, message, Row, Space, theme} from 'antd';
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import {get} from 'lodash';
import {FC, useEffect, useRef, useState} from 'react';

import UploadMyFile from '@/components/UploadFile';
import {createArticle, getArticleDetail, updateArticle} from '@/services/team/article';
import {isSuccess, useDictCode} from '@/utils';
import {ASTATUS, ATYPE, ROUTES} from '@/utils/enums';

import {myveiw, uploadFun} from './utils/myUploadImg'

const controls = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'separator',
    'clear',
]

const Page:FC = () => {
  const formRef = useRef<ProFormInstance>();
    const {ARTICLE_KILL_TYPE,ARTICLE_TYPE} = useDictCode(['ARTICLE_KILL_TYPE','ARTICLE_TYPE'])
    const {search} = useLocation()
    const searchParams = new URLSearchParams(search)
    const article_id = searchParams.get('id') ?? undefined
    const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
      if(article_id) {
          getArticleDetail(article_id).then((res) => {
              if(res && res.code === 200){
                  console.log(res)
              }
              formRef.current?.setFieldsValue({
                  ...res.data,
                  context: BraftEditor.createEditorState(res.data?.context, {
                      editorId: 'demo-editor-with-entity-extension',
                  }),
              })
          })
      } else {
          formRef.current?.setFieldsValue({
              context: BraftEditor.createEditorState('', {
                  editorId: 'demo-editor-with-entity-extension',
              }),
          })
      }

  },[])


    const addImg = (url:string) => {
        const res = formRef.current?.getFieldValue('context')
        formRef.current?.setFieldsValue({
            context: ContentUtils.insertMedias(res, [{
                type: 'IMAGE',
                url,
            }]),
        })
    }
const extendControls = [uploadFun(() => {},addImg),myveiw(formRef.current?.getFieldValue('context')?.toHTML())]


    const handlerSubmit = async (values: API.ARTICLEMANAGEMENT) => {
        // values.content.toRAW() // or values.content.toHTML()
        const old = values?.context
        values.context = old?.toHTML()
        values.raws = old?.toRAW()

        values.article_status = ASTATUS.CHECK // 待审核
        values.article_type = ATYPE.ARTICLE

        await (article_id ? updateArticle : createArticle)({ ...values, article_id }).then(({ code, msg }) => {
            if (isSuccess(code)) {
                message.success(msg);
                dropByCacheKey(ROUTES.ARTICLEMPAGREANAGEMENT)
                dropByCacheKey(ROUTES.ARTICLEMANAGEMENT)
                history.push(ROUTES.ARTICLEMANAGEMENT)
            }
        })
    }

    const saveHandle = async () => {
      const values: API.ARTICLEMANAGEMENT = await formRef.current?.validateFields()
        // values.content.toRAW() // or values.content.toHTML()
        const old = values?.context
        values.context = old?.toHTML()
        values.raws = old?.toRAW()

        values.article_status = ASTATUS.DRAFT // 草稿
        values.article_type = ATYPE.ARTICLE // 文章

        await (article_id ? updateArticle : createArticle)({ ...values, article_id }).then(({ code, msg }) => {
            if (isSuccess(code)) {
                message.success(msg);
                dropByCacheKey(ROUTES.ARTICLEMPAGREANAGEMENT)
                dropByCacheKey(ROUTES.ARTICLEMANAGEMENT)
                history.push(ROUTES.ARTICLEMANAGEMENT)
            }
        })
    }
    return (
      <PageContainer header={{ title: null }} >
        <ProForm
            title=""
            formRef={formRef}
            validateMessages={
                {
                  required: '此项为必填项',
                }
            }
            submitter={{
              resetButtonProps: false,
                render: (_, dom) => <></>,
            }}
            onFinish={handlerSubmit}

        >
<ProCard ghost gutter={20}>
    <ProCard >
        <ProFormText
            name="title"
            label="文章标题"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
            rules={[{required: true},{max: 24, message: '最长20个字符'}]}
        />
        <Form.Item
            name='context'
            rules={[{required: true,validator: (_, value, callback) => {
                    if (value.isEmpty()) {
                        callback('请输入正文内容')
                    } else {
                        callback()
                    }
                },validateTrigger: 'onBlur'}]}
        >
            <BraftEditor
                id="demo-editor-with-entity-extension"
                className="my-editor"
                controls={controls}
                placeholder="请输入正文内容"
                extendControls={extendControls}
            />
        </Form.Item>

    </ProCard>
    <ProCard colSpan={8}>
        <Form.Item
            name="postlink"
            label='文章封面'
            rules={[
                {
                    required: true,
                    message: '请上传封面',
                },
            ]}
        >
            <UploadMyFile
                fieldProps={{
                    listType: 'picture-card',
                    maxCount: 1,
                    accept:'image/*',
                }} />
        </Form.Item>

        <ProFormTextArea
            name="describe"
            label="文章描述"
            tooltip="最长为 200 位"
            rules={[{required: true},{max: 200, message: '最长200个字符'}]}
        />


        <ProFormSelect
            label="文章类型"
            showSearch
            name="menu_id"
            options={ARTICLE_TYPE}

            rules={[{ required: true }]}
        />
        <ProFormSelect
            label="相关技术"
            showSearch
            name="technology_id"
            options={ARTICLE_KILL_TYPE}

            rules={[{ required: true }]}
        />
        <ProFormText
            name="keywords"
            label="关键字"
            tooltip="最长为 24 位"
            placeholder="请输入keywords"
            rules={[{required: true},{max: 24, message: '最长20个字符'}]}
        />
        <Row>
            <Col span={8}>
                <ProFormSwitch name="pinned" initialValue={0} label="是否置顶" />
            </Col>
            <Col span={8}>
                <ProFormSwitch name="status" initialValue={1} label="是否展示" />
            </Col>
            <Col span={8}>
                <ProFormDigit
                    label="排序"
                    name="sort"
                    width="sm"
                    min={1}

                    rules={[{ required: true }]}
                />
            </Col>
        </Row>

        <Row justify='center' style={{marginTop: 30}}>
            <Space>
                <Button onClick={saveHandle}>
                    保存
                </Button>
                <Button type='primary' htmlType="submit">
                    提交
                </Button>
            </Space>
        </Row>
    </ProCard>

    </ProCard>

      </ProForm>

  </PageContainer>
  )
}
export default Page
