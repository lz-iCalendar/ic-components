import React from 'react';
import { storiesOf } from '@storybook/react';
import docs from './docs.md';
import TextArea from '../';
import '../style/index.less';
import './style.less';
import IcDecorator from '../../../IcDecorator';

class TextAreaDemo extends React.Component {
  state = {
    value: 'hello TextArea',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return <TextArea placeholder="请输入内容" value={value} onChange={this.handleChange} />;
  }
}

const stories = storiesOf('TextArea 文本域', module);

stories.add(
  '文本域',
  () => (
    <IcDecorator info="输入框">
      <TextAreaDemo />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
