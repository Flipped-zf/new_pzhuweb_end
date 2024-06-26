import './style.less'
import 'braft-extensions/dist/emoticon.css'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/code-highlighter.css'

import BraftEditor from 'braft-editor'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter'
import Emoticon, { defaultEmoticons } from 'braft-extensions/dist/emoticon'
import React from 'react'


const emoticons = defaultEmoticons.map((item) => require(`braft-extensions/dist/assets/${item}`))
const entityExtension = {
    // 指定扩展类型
    type: 'entity',
    // 指定该扩展对哪些编辑器生效，不指定includeEditors则对所有编辑器生效
    includeEditors: ['demo-editor-with-entity-extension'],
    // 指定扩展的entity名称，推荐使用全部大写，内部也会将小写转换为大写
    name: 'KEYBOARD-ITEM',
    // 在编辑器工具栏中增加一个控制按钮，点击时会将所选文字转换为该entity
    control: {
        text: '按键',
    },
    // 指定entity的mutability属性，可选值为MUTABLE和IMMUTABLE，表明该entity是否可编辑，默认为MUTABLE
    mutability: 'IMMUTABLE',
    // 指定通过上面新增的按钮创建entity时的默认附加数据
    data: {
        foo: 'hello',
    },
    // 指定entity在编辑器中的渲染组件
    component: (props) => {
        // 通过entityKey获取entity实例，关于entity实例请参考https://github.com/facebook/draft-js/blob/master/src/model/entity/DraftEntityInstance.js
        const entity = props.contentState.getEntity(props.entityKey)
        // 通过entity.getData()获取该entity的附加数据
        const { foo } = entity.getData()
        return <span data-foo={foo} className="keyboard-item">{props.children}</span>
    },
    // 指定html转换为editorState时，何种规则的内容将会转换成该entity
    importer: (nodeName, node, source) => {
        // source属性表明输入来源，可能值为create、paste或undefined
        console.log(source)
        if (nodeName.toLowerCase() === 'span' && node.classList && node.classList.contains('keyboard-item')) {
            // 此处可以返回true或者一个包含mutability和data属性的对象
            return {
                mutability: 'IMMUTABLE',
                data: {
                    foo: node.dataset.foo,
                },
            }
        }
    },
    // 指定输出该entnty在输出的html中的呈现方式
    exporter: (entityObject, originalText) => {
        // 注意此处的entityObject并不是一个entity实例，而是一个包含type、mutability和data属性的对象
        const { foo } = entityObject.data
        return <span data-foo={foo} className="keyboard-item">{originalText}</span>
    },
}
const underdotExtension = {
    // 指定扩展类型
    type: 'inline-style',
    // 指定该扩展对哪些编辑器生效，不指定includeEditors则对所有编辑器生效
    includeEditors: ['demo-editor-with-entity-extension'],
    // 指定扩展样式名，推荐使用全大写
    name: 'UNDERDOT',
    // 在编辑器工具栏中增加一个样式控制按钮，text可以为一个react组件
    control: {
        text: '着重号',
    },
    // 指定该扩展样式的CSS规则，请注意，IE/EDGE浏览器暂时不支持textEmphasis
    style: {
        textEmphasis: 'circle',
        textEmphasisPosition: 'under',
        WebkitTextEmphasis: 'circle',
        WebkitTextEmphasisPosition: 'under',
    },
    importer: (nodeName, node) => {
        // 指定html转换为editorState时，何种规则的内容将会附加上该扩展样式
        // 如果编辑器在createEditorState时使用的是RAW数据，并且开启了stripPastedStyles，则可以不指定importer，因为不存在html转editorState的场景
        return nodeName === 'span' && [].find.call(node.style, (styleName) => styleName.indexOf('text-emphasis') !== -1)
    },
    exporter: () => {
        // 指定该样式在输出的html中如何呈现，对于inline-style类型的扩展可以不指定exporter，输出样式即为该扩展的style
        return (
            <span style={{
                textEmphasis: 'circle',
                textEmphasisPosition: 'under',
                WebkitTextEmphasis: 'circle',
                WebkitTextEmphasisPosition: 'under',
            }} />
        )
    },
}

BraftEditor.use(underdotExtension)

BraftEditor.use(entityExtension)
BraftEditor.use(Emoticon({
    includeEditors: ['demo-editor-with-entity-extension'],
    emoticons: emoticons,
}))

BraftEditor.use(CodeHighlighter({
    includeEditors: ['demo-editor-with-entity-extension'],
}))

