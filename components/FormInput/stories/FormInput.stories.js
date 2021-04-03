import React from 'react';
import { storiesOf } from '@storybook/react';
import FormInput from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';

class FormInputDemo extends React.Component {
  state = {
    fields: [
      {
        id: 1,
        type: 0,
        name: '单行文本',
        isMust: true,
        desc: '单行文本的描述',
        default: '',
        max: 6,
      },
      {
        id: 2,
        type: 1,
        name: '多行文本',
        isMust: true,
        desc: '个人介绍的描述',
        default: '我叫 xxx',
        max: 20,
      },
      {
        id: 3,
        type: 2,
        name: '数字',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 4,
        type: 3,
        name: '日期',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 5,
        type: 4,
        name: '时间',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 6,
        type: 5,
        name: '单项选择',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 7,
        type: 6,
        name: '多项选择',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 8,
        type: 7,
        name: '图片',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 9,
        type: 8,
        name: '邮箱',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
    ],
  };
  render() {
    return <FormInput fields={fields} />;
  }
}

storiesOf('HeaderFooterFixedLayout 布局', module).add(
  'HeaderFooterFixedLayout 布局组件',
  () => <FormInputDemo />,
  {
    notes: {
      markdown: docs,
    },
    viewport: { defaultViewport: 'iphone5' },
  }
);
