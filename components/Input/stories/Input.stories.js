import React from 'react';
import { storiesOf } from '@storybook/react';

import docs from './docs.md';

import Input from '../';
import '../style/index.less';
import './style.less';

class InputTest extends React.Component {
  state = {
    value: 'hello input',
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { value } = this.state;
    return <Input placeholder="输入框" value={value} onChange={this.handleChange} className="input__test" />;
  }
}

const stories = storiesOf('Input 输入框', module);

stories.add('输入框', () => <InputTest />, {
  notes: {
    markdown: docs,
  },
});
