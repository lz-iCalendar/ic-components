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
        type: {
          value: 0,
        },
        name: '单行文本',
        isMust: true,
        desc: '单行文本的描述',
        default: '',
        max: 6,
      },
      {
        id: 2,
        type: { value: 1 },
        name: '多行文本',
        isMust: true,
        desc: '个人介绍的描述',
        default: '我叫 xxx',
        max: 20,
      },
      {
        id: 3,
        type: { value: 2 },
        name: '数字',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 4,
        type: { value: 3 },
        name: '日期',
        isMust: true,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 5,
        type: { value: 4 },
        name: '时间',
        isMust: false,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 6,
        type: {
          value: 5,
          options: [
            { label: '选项1', value: '选项1' },
            { label: '选项2', value: '选项2' },
          ],
        },
        name: '单项选择',
        isMust: false,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 7,
        type: {
          value: 6,
          options: [
            { label: '选项1', value: '选项1' },
            { label: '选项2', value: '选项2' },
          ],
        },
        name: '多项选择',
        isMust: false,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 8,
        type: { value: 7 },
        name: '图片',
        isMust: false,
        desc: '',
        default: '',
        max: 20,
      },
      {
        id: 9,
        type: { value: 8 },
        name: '邮箱',
        isMust: false,
        desc: '',
        default: '',
        max: 20,
      },
    ],
  };

  handleSave = values => {
    console.log({ values });
  };
  render() {
    const { fields } = this.state;
    return <FormInput fields={fields} onSave={this.handleSave} />;
  }
}

storiesOf('FormInput 表单输入', module).add(
  'FormInput 表单输入',
  () => <FormInputDemo />,
  {
    notes: {
      markdown: docs,
    },
    viewport: { defaultViewport: 'iphone5' },
  }
);
