import React from 'react';
import { storiesOf } from '@storybook/react';
import docs from './docs.md';
import InputNumber from '../';
import '../style/index.less';
import './style.less';
import IcDecorator from '../../../IcDecorator';

import Icon from '../../Icon';

class InputNumberDemo extends React.Component {
  state = {
    value: 1,
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return <InputNumber value={value}></InputNumber>
  }
}

const stories = storiesOf('InputNumber 输入框', module);

stories.add(
  '数字输入框',
  () => (
    <IcDecorator info="数字输入框">
      <InputNumberDemo />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
